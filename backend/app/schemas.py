from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ContactIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(default="", max_length=60)
    subject: str = Field(default="", max_length=200)
    message: str = Field(min_length=1, max_length=5000)
    # Honeypot: real people leave it empty, bots fill everything in.
    website: str = Field(default="", max_length=200)


class ContactOut(BaseModel):
    ok: bool
    delivered: bool


class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    domain: str
    href: str
    body: str
    status: str
    tags: list[str]


class ProductIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    domain: str = Field(min_length=1, max_length=255)
    href: str = Field(min_length=1, max_length=500)
    body: str = ""
    status: str = "soon"
    tags: list[str] = []
    published: bool = True
    sort_order: int = 0


class ProductAdminOut(ProductIn):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


class EnquiryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    phone: str
    subject: str
    message: str
    delivered_to_telegram: bool
    delivery_error: str
    created_at: datetime


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
