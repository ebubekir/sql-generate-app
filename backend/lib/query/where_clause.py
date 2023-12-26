from .expression import Expression
from .operator import Operator, LogicalOperator
from .query import Query

import enum
import sqlalchemy as sa
from typing import List, Any
from pydantic import BaseModel


class WhereClause(BaseModel):
    """
    A class to represent a single condition in a SQL WHERE clause.

    This class encapsulates a condition typically formatted as '<column> <operator> <value>',
    which is part of the filtering mechanism in a SQL query. It holds an expression for
    the column, an operator, and the value to compare against, which can be a simple
    data type or a subquery.

    Attributes:
        col: Expression
            The column expression to which the operator is applied.
        op: Operator
            The comparison operator from the Operator enum (e.g., eq, ne, gt).
        value: str | int | float | bool | List[Any] | "Query"
            The value to compare the column expression against, which can also be a subquery.

    Methods:
        render(self, t: Table) -> Any:
            Renders the WhereClause into a SQLAlchemy object, applying the operator and value
            to the column expression within the context of a given table.
    """

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
    """
    A class that groups multiple WhereClause instances using a logical operator.

    This class represents a collection of conditions (WhereClauses) that can be combined
    logically (e.g., using AND, OR) to form a composite condition in a SQL WHERE clause.

    Attributes:
        clause: List[WhereClause]
            A list of WhereClause instances to be combined.
        op: LogicalOperator
            The logical operator to apply between the conditions (e.g., and_, or_).

    Methods:
        render(self, t: Table) -> Any:
            Renders the combined conditions of the WhereGroup into a SQLAlchemy object,
            applying the logical operator to the rendered conditions within the context
            of a given table.
    """

    clause: List[WhereClause]
    op: LogicalOperator

    def render(self, t):
        conditions = [c.render(t) for c in self.clause]

        return getattr(sa, self.op.value)(*conditions)
