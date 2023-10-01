from alembic.config import Config
from alembic import command


def run_migrations() -> None:
    alembic_cfg = Config()
    alembic_cfg.set_main_option("script_location", "migrations")
    alembic_cfg.set_main_option(
        "sqlalchemy.url", "postgresql://postgres:postgres@0.0.0.0:5432/postgres"
    )
    command.upgrade(alembic_cfg, "head")
