class QueryHelper:
    @staticmethod
    def compile_query(q):
        return q.compile(compile_kwargs={"literal_binds": True}).__str__()
