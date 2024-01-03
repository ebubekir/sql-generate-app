from typing import Generic, TypeVar, Union, List

from contextlib import contextmanager
import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker, Session as SASession
from .engine import engine
from models import Base

Session = sessionmaker(bind=engine)


@contextmanager
def get_session() -> Session:
    session = Session()
    try:
        yield session
        session.commit()
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()


T = TypeVar("T", bound=Base)


class ORMBase(Generic[T]):
    __table__ = T

    @staticmethod
    def get(*criteria, model: Base):
        with get_session() as session:
            stmt = sa.select(model).filter(*criteria)
            obj = session.scalars(stmt).one_or_none()
            if not obj:
                return None
            return type("tmp" + model.__name__, (object,), obj.__dict__)

    @staticmethod
    def get_all(*criteria, model: Base):
        with get_session() as session:
            stmt = sa.select(model).filter(*criteria)
            rows = session.scalars(stmt).all()
            if not rows:
                return []
            return [type("tmp" + model.__name__, (object,), r.__dict__) for r in rows]

    @staticmethod
    def create(row: T):
        with get_session() as session:
            return session.add(row)

    @staticmethod
    def delete(*criteria, model: Base):
        with get_session() as session:
            stmt = sa.delete(model).where(*criteria)
            return session.execute(stmt)

    @staticmethod
    def update(obj: T, *criteria):
        with get_session() as session:
            stmt = sa.update(T).where(*criteria).values(obj)
            return session.execute(stmt)

    @staticmethod
    def update_all(*criteria, set_list: List, model: Base):
        with get_session() as session:
            stmt = sa.update(model).where(*criteria)
            session.execute(stmt, set_list)
