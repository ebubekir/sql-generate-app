"""add is_default column to datasource table.

Revision ID: 0d12e5fe0cc6
Revises: 
Create Date: 2023-11-28 20:06:01.449103

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from models.data_source import DataSource


# revision identifiers, used by Alembic.
revision: str = "0d12e5fe0cc6"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def get_columns():
    columns = (
        op.get_bind()
        .execute(sa.text(f"SELECT * FROM {DataSource.__tablename__} LIMIT 0"))
        .keys()
    )
    return columns


def upgrade() -> None:
    columns = get_columns()

    if "is_default" not in columns:
        op.add_column(
            DataSource.__tablename__,
            sa.Column(
                "is_default",
                sa.types.Boolean,
                default=False,
            ),
        )


def downgrade() -> None:
    columns = get_columns()

    if "is_default" in columns:
        op.drop_column(DataSource.__tablename__, "is_default")
