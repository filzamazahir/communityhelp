"""
    Location Model File
"""
from system.core.model import Model

class Location(Model):
    def __init__(self):
        super(Location, self).__init__()

    # Insert locations into database
    def insert_into_db(self,data_info):
    	lat=data_info['lat']
     	lng=data_info['lng']
     	select_query = "SELECT * FROM locations WHERE (2 * 6731*0.621371* ATAN(SQRT(SIN(RADIANS(lat-'%s')/2) * SIN(RADIANS(lat-'%s')/2) + COS(RADIANS('%s')) * COS(RADIANS(lat)) * SIN(RADIANS('%s'-lng)/2) * SIN(RADIANS('%s'-lng)/2)),SQRT(1 - SIN(RADIANS(lat-'%s')/2) * SIN(RADIANS(lat-'%s')/2) + COS(RADIANS('%s')) * COS(RADIANS(lat)) * SIN(RADIANS('%s'-lng)/2) * SIN(RADIANS('%s'-lng)/2)) ) ) < 0.25"
     	data= [lat,lat,lat,lng,lng,lat,lat,lat,lng,lng]
     	existing_locations=self.db.query_db(select_query, data)
     	if len(existing_locations) == 0:
	        query="INSERT INTO locations(lat,lng,address,comment,created_at,updated_at)VALUES(%s,%s,%s,%s,NOW(),NOW())"
	        data=[data_info['lat'],data_info['lng'],data_info['address'],data_info['comments']]
	       	self.db.query_db(query,data)
       		return True
       	else:
       		return False


    # Get locations within 5 miles, based on the Haversine formula
    def get_nearby_locations(self, given_location):
        lat = given_location['lat']
        lng = given_location['lng']
        select_query = "SELECT *, (2 * 6731*0.621371* ATAN(SQRT(SIN(RADIANS(lat-'%s')/2) * SIN(RADIANS(lat-'%s')/2) + COS(RADIANS('%s')) * COS(RADIANS(lat)) * SIN(RADIANS('%s'-lng)/2) * SIN(RADIANS('%s'-lng)/2)),SQRT(1 - SIN(RADIANS(lat-'%s')/2) * SIN(RADIANS(lat-'%s')/2) + COS(RADIANS('%s')) * COS(RADIANS(lat)) * SIN(RADIANS('%s'-lng)/2) * SIN(RADIANS('%s'-lng)/2)) ) ) AS distance FROM locations HAVING distance < 5 ORDER BY distance"
        data = [lat,lat,lat,lng,lng,lat,lat,lat,lng,lng]
        nearby_locations =  self.db.query_db(select_query, data)

        return nearby_locations
