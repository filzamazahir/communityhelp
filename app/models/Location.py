""" 
    Location Model File
"""
from system.core.model import Model

class Location(Model):
    def __init__(self):
        super(Location, self).__init__()


    # Insert locations into database
    def insert_into_db(self,data_info):
        query="INSERT INTO locations(lat,lng,comments,address,created_at,updated_at)VALUES(%s,%s,%s,%s,NOW(),NOW())"
        data=[data_info['lat'],data_info['lng'],data_info['comments'],data_info['address']];
        return self.db.query_db(query,data)
    

    # Get locations within 5 miles, based on the Haversine formula
    def get_nearby_locations(self, current_location):
        lat = current_location['lat']
        lng = current_location['lng']
        select_query = "SELECT * FROM locations WHERE (2 * 6731*0.621371* ATAN(SQRT(SIN(RADIANS(lat-'%s')/2) * SIN(RADIANS(lat-'%s')/2) + COS(RADIANS('%s')) * COS(RADIANS(lat)) * SIN(RADIANS('%s'-lng)/2) * SIN(RADIANS('%s'-lng)/2)),SQRT(1 - SIN(RADIANS(lat-'%s')/2) * SIN(RADIANS(lat-'%s')/2) + COS(RADIANS('%s')) * COS(RADIANS(lat)) * SIN(RADIANS('%s'-lng)/2) * SIN(RADIANS('%s'-lng)/2)) ) ) < 5"
        data = [lat,lat,lat,lng,lng,lat,lat,lat,lng,lng]
        nearby_locations =  self.db.query_db(select_query, data)
        
        return nearby_locations

    