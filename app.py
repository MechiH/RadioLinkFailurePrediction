import os
from flask import Flask, json, request, render_template, make_response
from utilities.DataPrep import DataPrep
from utilities.OutputPrep import outpuData
from flask_restful import Api, Resource
from model.Train import trainModel
import copy
import pandas as pd
import joblib


app = Flask(__name__)
api = Api(app)

if not os.path.isfile('RLF.model'):
    trainModel()
    print("here")
model = joblib.load('RLF.model')


class index(Resource):
    @staticmethod
    def get():
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('index.html'), 200, headers)


class MakePrediction(Resource):
    @staticmethod
    def post():
        file = request.files['uploadFile']
        file.save(os.getcwd()+'\\Datasets\\uploaded.xlsx')
        headers = {'Content-Type': 'text/html'}
        path=os.getcwd()+'\\Datasets\\uploaded.xlsx'
        (x, y,z,temp) = DataPrep(path)
        prediction = model.predict(x)

        output= pd.concat([z['site_id'],pd.DataFrame(prediction,columns=['prediction'])],axis=1)
        payload =outpuData(x,prediction,z,temp)
        ans=json.dumps(payload)
        print(ans)
        return make_response(render_template('dashboard.html',data=ans), 200, headers)


api.add_resource(index, '/')
api.add_resource(MakePrediction, '/predict')


if __name__ == '__main__':
    app.run(debug=True, port=8000)
