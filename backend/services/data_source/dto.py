from pydantic import BaseModel
from models.data_source import DataSourceType


class AddDataSourceRequestDto(BaseModel):
    name: str
    credentials: dict
    type: DataSourceType
