from typing import Optional

from pydantic import BaseModel
from lib.query import Query
from models.report import ReportType


class GenerateQueryDto(BaseModel):
    tableName: str
    query: Query
    reportType: ReportType = ReportType.sql
    reportConfig: Optional[dict] = None
