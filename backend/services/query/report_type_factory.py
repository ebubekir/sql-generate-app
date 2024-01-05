import pandas as pd
from abc import abstractmethod, ABC
from models.report import ReportType
from lib.query import Expression


class ReportBuilderIsNotRegisteredException(Exception):
    pass


class ReportBuilder(ABC):
    __REPORT_TYPES = {}

    def __init__(self, query, table, connection, config: dict = None):
        self.query = query
        self.config = config
        self.table = table
        self.connection = connection

    def __init_subclass__(cls, **kwargs):
        if kwargs.get("type", None):
            if kwargs["type"] in cls.__REPORT_TYPES.keys():
                raise ReportBuilderIsNotRegisteredException(
                    f"This type already registered. {kwargs['type']}"
                )
            cls.__REPORT_TYPES[kwargs["type"]] = cls
        else:
            raise ReportBuilderIsNotRegisteredException("Type not defined.")

    @classmethod
    def get_builder(cls, type: str, **kwargs) -> "ReportBuilder":
        if type not in cls.__REPORT_TYPES.keys():
            raise ReportBuilderIsNotRegisteredException
        return cls.__REPORT_TYPES[type](**kwargs)

    @abstractmethod
    def build(self, **kwargs):
        pass

    def read_query(self):
        df = pd.read_sql(self.query.render(t=self.table), self.connection.get_engine())
        return df


class SQLReportBuilder(ReportBuilder, type=ReportType.sql.value):
    def __init__(self, query, table, connection, config: dict = None):
        super().__init__(query, table, connection, config)

    def build(self, **kwargs):
        return self.query.render(t=self.table, return_query=True)


class TableReportBuilder(ReportBuilder, type=ReportType.table.value):
    def __init__(self, query, table, connection, config: dict = None):
        super().__init__(query, table, connection, config)

    def build(self, **kwargs):
        df = self.read_query()
        return df.to_dict("records")


class BarReportBuilder(ReportBuilder, type=ReportType.bar.value):
    def __init__(self, query, table, connection, config: dict = None):
        super().__init__(query, table, connection, config)

    def build(self, **kwargs):
        group_by_column = Expression(col=self.config["countLabel"])
        self.query.group_by = group_by_column
        self.query.selections = [
            Expression(col="*", col_operator="count"),
            group_by_column,
        ]
        df = self.read_query()
        return df.to_dict("records")


class PieReportBuilder(ReportBuilder, type=ReportType.pie.value):
    def __init__(self, query, table, connection, config: dict = None):
        super().__init__(query, table, connection, config)

    def build(self, **kwargs):
        group_by_column = Expression(col=self.config["countLabel"])
        self.query.group_by = group_by_column
        self.query.selections = [
            Expression(col="*", col_operator="count"),
            group_by_column,
        ]
        df = self.read_query()
        return df.to_dict("records")


class LineReportBuilder(ReportBuilder, type=ReportType.line.value):
    def __init__(self, query, table, connection, config: dict = None):
        super().__init__(query, table, connection, config)

    def build(self, **kwargs):
        x_axis_column = Expression(col=self.config["xAxis"], label=self.config["xAxis"])
        y_axis_column = Expression(
            col=self.config["yAxis"], col_operator="sum", label=self.config["yAxis"]
        )
        self.query.group_by = x_axis_column
        self.query.selections = [
            y_axis_column,
            x_axis_column,
        ]
        df = self.read_query()
        df = df.sort_values(by=self.config["xAxis"])
        return {
            "xAxis": df[self.config["xAxis"]].values.tolist(),
            "series": [
                {"data": df[self.config["yAxis"]].values.tolist(), "type": "line"}
            ],
        }
