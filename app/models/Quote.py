"""
    Quote Model File
"""
from system.core.model import Model
from random import randint

class Quote(Model):
    def __init__(self):
        super(Quote, self).__init__()


    def get_random_quote(self):
        query = "SELECT quotes.content, quotes.quoted_by FROM quotes ORDER BY RAND() LIMIT 1"
        res = self.db.query_db(query)
        return res[0]
