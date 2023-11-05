from typing import Optional
from pydantic import BaseModel

import sqlalchemy as sa
from sqlalchemy.sql.schema import Table
from sqlalchemy.sql import functions as F


class Expression(BaseModel):
    col: str | "Expression"
    col_operator: Optional[str]

    def render(self, t: Table):
        if not isinstance(self.col, str):
            col = self.col.render(t)
        else:
            col = sa.literal_column(self.col)

        if self.col_operator:
            q = getattr(F.func, self.col_operator)(col)
        else:
            q = col

        return q
