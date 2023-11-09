import enum


class Operator(enum.Enum):
    eq = "__eq__"
    ne = "__ne__"
    gt = "__gt__"
    lt = "__lt__"
    ge = "__ge__"
    le = "__le__"
    in_ = "in_"
    between = "between"
