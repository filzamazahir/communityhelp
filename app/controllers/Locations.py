"""
    Locations Controller File
"""
from system.core.controller import *

class Locations(Controller):
    def __init__(self, action):
        super(Locations, self).__init__(action)
        self.load_model('Location')


    #Load the index page - with San Jose as default location
    def index(self):
        return self.load_view('index.html')

    #Insert new record into database
    def insert_record(self):
        status = {}
    	data={
        'lat':float(request.form['lat']),
        'lng':float(request.form['lng']),
        'comments':request.form['comments'],
        'address':request.form['address'],
        'lastLat':float(request.form['lastLat']),
        'lastLng':float(request.form['lastLng'])
        }
        insert_status=self.models['Location'].insert_into_db(data)
        if insert_status['status']:
            status = {
                'status':True,
                'distance': insert_status['distance'],
                'newLocation':data
                }
            print "New Location needs to be added"
        else:
        	status = {'status':False, 'distance':None}

        return jsonify(status=status)


    #Get nearby locations from database
    def get_locations(self, lat, lng):
        given_location = {
            'lat': float(lat),
            'lng': float(lng)
        }
        nearby_locations = self.models['Location'].get_nearby_locations(given_location)
        return jsonify(nearby_locations = nearby_locations)
       

