from typing import Optional, Union
from pydantic import BaseModel, Field

import sqlalchemy as sa
from sqlalchemy.sql.schema import Table
from sqlalchemy.sql import functions as F


class Expression(BaseModel):
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
