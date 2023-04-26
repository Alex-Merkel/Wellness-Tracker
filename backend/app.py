from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# import psycopg2
import uuid

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://oieqoshs:Wpv2tC_JhfqNXcJwPL3algLp0XEyE8e6@raja.db.elephantsql.com/oieqoshs'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)


class User(db.Model):
    __tablename__ = 'app_user'
    
    user_id = db.Column(db.String(100), unique=True, nullable=False, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email_address = db.Column(db.String(150), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.email_address}>'
    
class UserData(db.Model):
    __tablename__ = 'user_data'
    
    email_address = db.Column(db.String(150), unique=True, nullable=False, primary_key=True)
    food_list = db.Column(db.JSON, nullable=False)
    water_amount = db.Column(db.Integer, nullable=False)
    
  
# Server calls for user info(firstName, lastName, and emailAddress(from Auth0)):  
@app.route('/checkuser', methods=["GET", "POST"])
def get_user():
    email = request.json['emailAddress']
    user = User.query.filter_by(email_address=email).first()
    if user:
        response = {'isReturningUser': True, 'first_name': user.first_name, 'last_name': user.last_name}
    else:
        response = {'isReturningUser': False}
    return jsonify(response)

@app.route('/updateuser', methods=['PUT'])
def update_user():
    user_data = request.json

    email_address = user_data['emailAddress']
    
    user = User.query.filter_by(email_address=email_address).first()

    if user is None:
        return jsonify({'success': False, 'error': 'User not found'})

    if 'firstName' in user_data:
        user.first_name = user_data['firstName']
    if 'lastName' in user_data:
        user.last_name = user_data['lastName']

    try:
        db.session.commit()
        return jsonify({'success': True})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)})

@app.route('/adduser', methods=['POST'])
def add_user():
    user_data = request.json
    first_name = user_data['firstName']
    last_name = user_data['lastName']
    email_address = user_data['emailAddress']

    user = User(
        user_id=str(uuid.uuid4()),
        first_name=first_name,
        last_name=last_name,
        email_address=email_address
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User added successfully'})

@app.route('/deleteuser', methods=["DELETE"])
def delete_user():
    email_address = request.json['email_address']
    user = User.query.filter_by(email_address=email_address).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        response = "User has been deleted"
    else:
        response = "Delete unsuccessful, user doesn't exist."
    return jsonify(response)


# Data server calls (foodList & waterAmount for Food.tsx page):
@app.route('/getdata', methods=["GET", "POST"])
def get_data():
    email = request.json['emailAddress']
    user = UserData.query.filter_by(email_address=email).first()
    if user:
        response = {'foodList': user.food_list, 'waterAmount': user.water_amount}
    else:
        response = "User and/or data not found"
    return jsonify(response)

@app.route('/savedata', methods=['GET', 'POST' ,'PUT'])
def save_data():
    user_data = request.json

    email_address = user_data['email_address']
    food_list = user_data.get('food_list', [])
    water_amount = user_data.get('water_amount', 0)

    user_data = UserData.query.filter_by(email_address=email_address).first()

    if user_data is None:
        user_data = UserData(
            email_address=email_address,
            food_list=food_list,
            water_amount=water_amount,
        )
        db.session.add(user_data)
    else:
        user_data.food_list = food_list
        user_data.water_amount = water_amount

    db.session.commit()

    return jsonify({'message': 'User data saved successfully'})


if __name__ == '__main__':
    app.run(debug=True)
