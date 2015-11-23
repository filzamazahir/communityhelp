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
        result=self.models['Location'].get_all_locations();
        return self.load_view('index.html',res=result)


    #Insert new record into database
    def insert_record(self):
    	data={
        'lat':request.form['lat'],
        'lng':request.form['lng'],
        'comments':request.form['comments'],
        'address':request.form['address'],
        # 'zip_code':request.form['zip_code']
        }
        print "inserting"
        self.models['Location'].insert_into_db(data)
        return redirect('/')


    #Get nearby locations from database
    def get_locations(self):
        # current_location = {
        #     'lat':request.form['lat'],
        #     'lng':request.form['lng']
        # }

        #For zipcode or city, change user input to lat and long, then use the same formula

        #For testing purposes:
        current_location = {
            'lat': 37.401714,
            'lng': -121.955815
        }
        nearby_locations = self.models['Location'].get_nearby_locations(current_location)
        print nearby_locations
        return redirect ('/')

