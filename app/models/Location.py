""" 
    Location Model File
"""
from system.core.model import Model

class Location(Model):
    def __init__(self):
        super(Location, self).__init__()

    def get_all_locations(self):
        print self.db.query_db("SELECT * FROM locations")
    """

    def get_all_users(self):
        print self.db.query_db("SELECT * FROM users")
    """
    
