"""Add sql enum type to ReporType

Revision ID: b261f7e70473
Revises: 0d12e5fe0cc6
Create Date: 2024-01-02 22:51:55.998915

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "b261f7e70473"
down_revision: Union[str, None] = "0d12e5fe0cc6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("ALTER TYPE public.reporttype ADD VALUE IF NOT EXISTS 'sql'")


def downgrade() -> None:
    op.execute("ALTER TYPE public.reporttype DROP VALUE IF EXISTS 'sql'")
