import enum
from .base import Base
from sqlalchemy import ForeignKey, JSON, String, Enum
from sqlalchemy.orm import Mapped, mapped_column


class ReportType(enum.Enum):
    table = "TABLE"
    line = "LINE"
    pie = "PIE"
    bar = "BAR"


class Report(Base):
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)
    created_by_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    data_source_id: Mapped[int] = mapped_column(ForeignKey("datasource.id"))
    type: Mapped[ReportType] = mapped_column(Enum(ReportType))
    config: Mapped[dict] = mapped_column(JSON, nullable=False)
