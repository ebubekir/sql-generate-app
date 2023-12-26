from typing import Optional, Union
from pydantic import BaseModel, Field

import sqlalchemy as sa
from sqlalchemy.sql.schema import Table
from sqlalchemy.sql import functions as F


class Expression(BaseModel):
    """
    A class representing an Expression, which defines the structure of a column in SQL statement.

    This class can be used to define simple column reference, or more complex expressions
    such as distinct columns. It supports optional column operations and aliasing.

    Attributes:
        col: Union[str, "Expression"]
            The column name or a nested Expression object defining the column.
        col_operator: Optional[str]
            An optional SQL operator to apply to the column (e.g., 'distinct', 'count').
        label: Optional[str]
            An optional alias for the column, to be used in the resulting SQL query.

    Methods:
        render(self, t: Table) -> Any:
            Renders the SQL expression into a SQLAlchemy object, applying the column operator
            and label if provided.
    """

    col: Union[str, "Expression"]
    col_operator: Optional[str] = Field(default=None)
    label: Optional[str] = Field(default=None)

    def render(self, t: Table):
        if not isinstance(self.col, str):
            col = self.col.render(t)
        else:
            col = sa.literal_column(self.col)

        if self.col_operator:
            q = getattr(F.func, self.col_operator)(col)
        else:
            q = col

        if self.label:
            q = q.label(self.label)

        return q
