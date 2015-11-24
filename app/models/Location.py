""" 
    Location Model File
"""
from system.core.model import Model

class Location(Model):
    def __init__(self):
        super(Location, self).__init__()


    # Insert locations into database
    def insert_into_db(self,data_info):
        query="INSERT INTO locations(lat,lng,address,comment,created_at,updated_at)VALUES(%s,%s,%s,%s,NOW(),NOW())"
        data=[data_info['lat'],data_info['lng'],data_info['address'],data_info['comments']];
       	self.db.query_db(query,data)
       	return 
    

    # Get locations within 5 miles, based on the Haversine formula


    