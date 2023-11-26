from typing import List, Union

import sqlalchemy as sa
from pydantic import BaseModel, Field

from .expression import Expression
from .query_helper import QueryHelper


class Query(BaseModel):
    selections: List[Expression]
    conditions: Union["WhereGroup", "WhereClause"] = Field(default=None)

    def render(self, t, return_query: bool = False):
        select_list = [s.render(t) for s in self.selections]

        q = sa.select(*select_list).select_from(t)

        if self.conditions:
            q = q.where(self.conditions.render(t))

        if return_query:
            return QueryHelper.compile_query(q)

        return q
