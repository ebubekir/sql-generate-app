from typing import List

import sqlalchemy as sa
from pydantic import BaseModel

from .expression import Expression
from .query_helper import QueryHelper


class Query(BaseModel):
    selections: List[Expression]

    def render(self, t, return_query: bool = False):
        select_list = [s.render(t) for s in self.selections]

        q = sa.select(*select_list).select_from(t)

        if return_query:
            return QueryHelper.compile_query(q)

        return q
