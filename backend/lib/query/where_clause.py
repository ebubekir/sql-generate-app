from .expression import Expression
from .operator import Operator, LogicalOperator
from .query import Query

import enum
import sqlalchemy as sa
from typing import List, Any
from pydantic import BaseModel


class WhereClause(BaseModel):
    col: Expression
    op: Operator
    value: str | int | float | bool | List[Any] | "Query"

    def render(self, t):
        _value = self.value

        col_expr = getattr(self.col.render(t), self.op.value)
        if self.op == Operator.between:
            return col_expr(*self.value)

        if isinstance(self.value, Query):
            _value = self.value.render(t)

        return col_expr(_value)


class WhereGroup(BaseModel):
    clause: List[WhereClause]
    op: LogicalOperator

    def render(self, t):
        conditions = [c.render(t) for c in self.clause]

        return getattr(sa, self.op.value)(*conditions)
