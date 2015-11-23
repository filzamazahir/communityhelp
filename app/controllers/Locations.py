"""
    Locations Controller File
"""
from system.core.controller import *

class Locations(Controller):
    def __init__(self, action):
        super(Locations, self).__init__(action)
        self.load_model('Location')


    def index(self):
        result=self.models['Location'].get_all_locations();
        return self.load_view('index.html',res=result)

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

