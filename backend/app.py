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
    
  
  
@app.route('/checkuser', methods=["GET", "POST"])
def get_user():
    email = request.json['emailAddress']
    user = User.query.filter_by(email_address=email).first()
    if user:
        response = {'isReturningUser': True, 'first_name': user.first_name, 'last_name': user.last_name}
    else:
        response = {'isReturningUser': False}
    return jsonify(response)

    

@app.route('/updateuser', methods=['PUT', 'POST'])
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

# @app.route('/deleteuser', methods=["GET", "POST", "DELETE"])
# def delete_user():
#     email = request.json['emailAddress']
#     user = User.query.filter_by(email_address=email).first()
#     if user:
#         db.session.delete(user)
#         response = "User has been deleted"
#     else:
#         response = "Delete unsuccessful, user doesn't exist."
#     return jsonify(response)



if __name__ == '__main__':
    app.run(debug=True)
