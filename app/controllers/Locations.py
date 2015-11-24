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
    	data={
        'lat':request.form['lat'],
        'lng':request.form['lng'],
        'comments':request.form['comments'],
        'address':request.form['address'],
        }
        # existing_locations=self.models['Location'].check_for_existing_location(data)
        # if existing_locations:
        # 	print "location already exists"
        # else:
        self.models['Location'].insert_into_db(data)
        return redirect('/')


    #Get nearby locations from database
    def get_locations(self, lat, lng):
        given_location = {
            'lat': float(lat),
            'lng': float(lng)
        }
        nearby_locations = self.models['Location'].get_nearby_locations(given_location)
        return jsonify(nearby_locations = nearby_locations)
       

