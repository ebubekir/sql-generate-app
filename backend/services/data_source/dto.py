from pydantic import BaseModel
from models.data_source import DataSourceType

from lib.data_sources.base import CredentialsSchema


class CheckCredentialsDto(BaseModel):
    credentials: CredentialsSchema
    type: DataSourceType


class AddDataSourceRequestDto(CheckCredentialsDto):
    name: str
