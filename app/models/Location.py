""" 
    Location Model File
"""
from system.core.model import Model

class Location(Model):
    def __init__(self):
        super(Location, self).__init__()

    def get_all_locations(self):
        return self.db.query_db("SELECT * FROM locations")


    def insert_into_db(self,data_info):
        query="INSERT INTO locations(lat,lng,comments,address,created_at,updated_at)VALUES(%s,%s,%s,%s,NOW(),NOW())"
        data=[data_info['lat'],data_info['lng'],data_info['comments'],data_info['address']];
        return self.db.query_db(query,data)
    
