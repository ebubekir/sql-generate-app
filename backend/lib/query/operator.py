import enum


class Operator(enum.Enum):
    """
    Enumeration for SQL comparison operators.
    This enum defines a set of operators used for comparison in SQL queries.
    These operators are typically used in WHERE clauses to filter results based on column values.

    Members:
        eq: Equals operator.
        ne: Not equals operator.
        gt: Greater than operator.
        lt: Less than operator.
        ge: Greater than or equal to operator.
        le: Less than or equal to operator.
        in_: IN operator, checks if a value is within a set of values.
        between: BETWEEN operator, checks if a value is between two other values.
        contains: CONTAINS operator, checks if a value includes a certain substring.
        like: LIKE operator, checks if a value matches a specified pattern.
    """

    eq = "__eq__"
    ne = "__ne__"
    gt = "__gt__"
    lt = "__lt__"
    ge = "__ge__"
    le = "__le__"
    in_ = "in_"
    between = "between"
    contains = "contains"
    like = "like"


class LogicalOperator(enum.Enum):
    """
    Enumeration for SQL logical operators.

    This enum defines a set of logical operators that can be used to combine or negate the conditions
    in SQL queries, typically within WHERE clauses.

    Members:
        and_: AND operator, used to combine two conditions where both must be true.
        or_: OR operator, used to combine two conditions where at least one must be true.
    """

    and_ = "and_"
    or_ = "or_"
