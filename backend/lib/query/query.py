from typing import List, Union

import sqlalchemy as sa
from pydantic import BaseModel, Field

from .expression import Expression
from .query_helper import QueryHelper


class Query(BaseModel):
    selections: List[Expression] = Field(default=None)
    conditions: Union["WhereGroup", "WhereClause"] = Field(default=None)

    def render(self, t, return_query: bool = False):
        if self.selections:
            select_list = [s.render(t) for s in self.selections]
        else:
            select_list = [sa.text("*")]

        q = sa.select(*select_list).select_from(t)

        if self.conditions:
            q = q.where(self.conditions.render(t))

        if return_query:
            return QueryHelper.compile_query(q)

        return q
