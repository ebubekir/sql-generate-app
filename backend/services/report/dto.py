import enum
from typing import Optional
from models.report import ReportType

from pydantic import BaseModel


class SaveReportDto(BaseModel):
    name: str
    description: Optional[str] = None
    request_schema: dict
    report_type: ReportType = ReportType.sql
    data_source_id: Optional[int] = None
