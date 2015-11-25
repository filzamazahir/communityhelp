"""
    Locations Controller File
"""
from system.core.controller import *
from ..models.Quote import Quote

class Locations(Controller):
    def __init__(self, action):
        super(Locations, self).__init__(action)
        self.load_model('Location')


    #Load the index page - with San Jose as default location
    def index(self):
        return self.load_view('index.html')

    #Insert new record into database
    def insert_record(self):
    	status=""
    	data={
        'lat':float(request.form['lat']),
        'lng':float(request.form['lng']),
        'comments':request.form['comments'],
        'address':request.form['address']
        }
        success=self.models['Location'].insert_into_db(data)
        if success:
        	status=True
        else:
        	status=False
        return jsonify(status=status)


    #Get nearby locations from database
    def get_locations(self, lat, lng):
        given_location = {
            'lat': float(lat),
            'lng': float(lng)
        }
        nearby_locations = self.models['Location'].get_nearby_locations(given_location)
        return jsonify(nearby_locations = nearby_locations)


    def get_random_quote(self):
        quote = Quote()
        try:
            random_quote = quote.get_random_quote()
        except Exception as e:
            random_quote = {'content': "Error: table quote does not exist." , 'quoted_by': 'None'}

        return jsonify(random_quote=random_quote)
