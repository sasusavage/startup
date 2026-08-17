from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import Enquiry, Product
from ..schemas import (
    EnquiryOut,
    LoginIn,
    ProductAdminOut,
    ProductIn,
    TokenOut,
)
from ..lockout import attempts_left, check_not_locked, record_failure, record_success
from ..security import create_token, require_admin, verify_admin

router = APIRouter(prefix="/admin", tags=["admin"])


def _to_out(row: Product) -> ProductAdminOut:
    return ProductAdminOut(
        id=row.id,
        name=row.name,
        domain=row.domain,
        href=row.href,
        body=row.body,
        status=row.status,
        tags=row.tag_list,
        published=row.published,
        sort_order=row.sort_order,
        created_at=row.created_at,
        updated_at=row.updated_at,
    )


@router.post("/login", response_model=TokenOut)
def login(payload: LoginIn, request: Request) -> TokenOut:
    # Checked before the password is compared, so a locked-out caller learns
    # nothing about whether their guess was right.
    check_not_locked(request)

    if not verify_admin(payload.email, payload.password):
        record_failure(request)
        remaining = attempts_left(request)
        detail = "Invalid credentials."
        if remaining:
            detail += f" {remaining} attempt{'' if remaining == 1 else 's'} left before lockout."
        else:
            detail = "Invalid credentials. This address is now locked out."
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=detail)

    record_success(request)
    return TokenOut(access_token=create_token(payload.email))


@router.get("/products", response_model=list[ProductAdminOut])
def all_products(
    db: Session = Depends(get_db), _: str = Depends(require_admin)
) -> list[ProductAdminOut]:
    """Includes unpublished ones, unlike the public endpoint."""
    rows = db.scalars(select(Product).order_by(Product.sort_order, Product.id)).all()
    return [_to_out(row) for row in rows]


@router.post("/products", response_model=ProductAdminOut, status_code=status.HTTP_201_CREATED)
def create_product(
    payload: ProductIn, db: Session = Depends(get_db), _: str = Depends(require_admin)
) -> ProductAdminOut:
    if db.scalar(select(Product).where(Product.domain == payload.domain)):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail=f"{payload.domain} already exists"
        )

    row = Product(**{**payload.model_dump(), "tags": ",".join(payload.tags)})
    db.add(row)
    db.commit()
    return _to_out(row)


@router.put("/products/{product_id}", response_model=ProductAdminOut)
def update_product(
    product_id: int,
    payload: ProductIn,
    db: Session = Depends(get_db),
    _: str = Depends(require_admin),
) -> ProductAdminOut:
    row = db.get(Product, product_id)
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    for field, value in payload.model_dump().items():
        setattr(row, field, ",".join(value) if field == "tags" else value)

    db.commit()
    return _to_out(row)


@router.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: int, db: Session = Depends(get_db), _: str = Depends(require_admin)
) -> None:
    row = db.get(Product, product_id)
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    db.delete(row)
    db.commit()


@router.get("/enquiries", response_model=list[EnquiryOut])
def list_enquiries(
    limit: int = 100, db: Session = Depends(get_db), _: str = Depends(require_admin)
) -> list[EnquiryOut]:
    rows = db.scalars(
        select(Enquiry).order_by(Enquiry.created_at.desc()).limit(min(limit, 500))
    ).all()
    return [EnquiryOut.model_validate(row) for row in rows]
