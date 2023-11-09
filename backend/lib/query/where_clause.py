from .expression import Expression
from .operator import Operator
from .query import Query

from typing import List, Any
from pydantic import BaseModel


class WhereClause(BaseModel):
    col: Expression
    op: Operator
    value: str | int | float | bool | List[Any] | Query

    def render(self, t):
        _value = self.value

        col_expr = getattr(self.col.render(t), self.op.value)
        if self.op == Operator.between:
            return col_expr(*self.value)

        if isinstance(self.value, Query):
            _value = self.value.render(t)

        return col_expr(_value)
