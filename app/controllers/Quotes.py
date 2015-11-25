"""
    Quotes Controller File
"""
from system.core.controller import *
from ..models.Quote import Quote

class Quotes(Controller):
    def __init__(self, action):
        super(Quotes, self).__init__(action)
        self.load_model('Location')


    def get_random_quote(self):
        quote = Quote()
        try:
            random_quote = quote.get_random_quote()
        except Exception as e:
            random_quote = {'content': "Error: table quote does not exist." , 'quoted_by': 'None'}

        return jsonify(random_quote=random_quote)
