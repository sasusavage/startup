from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import Product
from ..schemas import ProductOut

router = APIRouter(tags=["products"])


@router.get("/products", response_model=list[ProductOut])
def list_products(db: Session = Depends(get_db)) -> list[ProductOut]:
    """Public. Drives the subdomain cards on the landing page."""
    rows = db.scalars(
        select(Product).where(Product.published.is_(True)).order_by(Product.sort_order, Product.id)
    ).all()

    return [
        ProductOut(
            name=row.name,
            domain=row.domain,
            href=row.href,
            body=row.body,
            status=row.status,
            tags=row.tag_list,
        )
        for row in rows
    ]
