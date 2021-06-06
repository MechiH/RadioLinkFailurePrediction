import os
from flask import Flask, json, request, render_template, make_response
from utilities.DataPrep import DataPrep
from utilities.OutputPrep import outpuData
from flask_restful import Api, Resource
from model.Train import trainModel
from flask_mail import Mail, Message
import joblib


app = Flask(__name__)
api = Api(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'houssemmch21@gmail.com'
app.config['MAIL_PASSWORD'] = 'jxqnyyzglzxfdnro'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

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
        print(path)
        (x, y,z,temp) = DataPrep(path)
        prediction = model.predict(x)

        payload =outpuData(x,prediction,z,temp)
        ans=json.dumps(payload)
        return make_response(render_template('dashboard.html',data=ans), 200, headers)

class SendMail(Resource):
    @staticmethod
    def post():
         msg = Message(request.form['name'], sender = request.form['email'], recipients = ['houssem.mechi@supcom.tn','oumayma.teyeb@supcom.tn'])
         msg.body = 'Sender Email : '+request.form['email']+'\n' +'Content' +request.form['message']
         mail.send(msg)
         headers = {'Content-Type': 'text/html'}
         return make_response(render_template('index.html'), 200, headers)

api.add_resource(index, '/')
api.add_resource(MakePrediction, '/predict')
api.add_resource(SendMail, '/send')


if __name__ == '__main__':
    app.run(debug=True, port=8000)