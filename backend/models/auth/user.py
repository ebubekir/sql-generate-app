from enum import Enum
from typing import List
from models.base import Base

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


class User(Base):
    email: Mapped[str] = mapped_column(nullable=False, unique=True)
    password: Mapped[str] = mapped_column(nullable=False)
    full_name: Mapped[str] = mapped_column(nullable=False)
    tokens: Mapped[List["UserToken"]] = relationship(back_populates="user")


class TokenStatus(Enum):
    created = "CREATED"
    deleted = "DELETED"
    in_use = "IN_USE"


class UserToken(Base):
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="tokens")
    jwt_token: Mapped[str] = mapped_column(nullable=False)
    status: Mapped[TokenStatus] = mapped_column(default=TokenStatus.created)
