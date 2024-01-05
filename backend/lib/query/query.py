from typing import List, Union

import sqlalchemy as sa
from pydantic import BaseModel, Field

from .expression import Expression
from .query_helper import QueryHelper
from .where_clause import WhereClause, WhereGroup


class InnerJoin(BaseModel):
    table_name: str
    where_clause: "WhereClause"


class Query(BaseModel):
    selections: List[Expression] = Field(default=None)
    conditions: Union["WhereGroup", "WhereClause"] = Field(default=None)
    inner_joins: List[InnerJoin] = Field(default=None)
    group_by: Expression = Field(default=None)

    def render(self, t, return_query: bool = False):
        if self.selections:
            select_list = [s.render(t) for s in self.selections]
        else:
            select_list = [sa.text("*")]

        q = sa.select(*select_list).select_from(t)

        if self.conditions:
            q = q.where(self.conditions.render(t))

        if self.group_by:
            q = q.group_by(self.group_by.render(t))

        if self.inner_joins:
            for join in self.inner_joins:
                inner_join_table = sa.Table(join.table_name, t.metadata)
                q = q.join(inner_join_table, join.where_clause.render(t))

        if return_query:
            return QueryHelper.compile_query(q)

        return q
