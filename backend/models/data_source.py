import enum

from .base import Base

from sqlalchemy import ForeignKey, JSON, String, Integer, Enum
from sqlalchemy.orm import Mapped, mapped_column


class DataSourceType(enum.Enum):
    postgresql = "POSTGRESQL"
    mysql = "MYSQL"


class DataSource(Base):
    name: Mapped[str] = mapped_column(String, nullable=False)
    created_by_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    credentials: Mapped[dict] = mapped_column(JSON, nullable=False)
    type: Mapped[DataSourceType] = mapped_column(Enum(DataSourceType))
