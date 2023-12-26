from pydantic import BaseModel
from lib.query import Query


class GenerateQueryDto(BaseModel):
    tableName: str
    query: Query
