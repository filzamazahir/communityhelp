"""
    Locations Controller File
"""
from system.core.controller import *

class Locations(Controller):
    def __init__(self, action):
        super(Locations, self).__init__(action)
        self.load_model('Location')


    def index(self):

        """ 
        self.models['WelcomeModel'].get_all_users()
        """
        return self.load_view('index.html')
