from flask import Flask , jsonify , request 
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text , and_ , Table, Column, Integer, String, MetaData,desc
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime as dt

# -*- coding: utf-8 -*-

app = Flask(__name__)
CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User1(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class User2(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class user(db.Model):
    user_id = db.Column(db.String(20), primary_key=True)
    user_name = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(20), nullable=False)
#     #メッセージモデル
class message(db.Model):
     id = db.Column(db.Integer,primary_key=True)
     user_id = db.Column(db.String(15),nullable=False)  
     message = db.Column(db.String(100),nullable=False)

# #各ルームモデル
class Room(db.Model):
     id = db.Column(db.Integer,primary_key=True)
     user_id1 = db.Column(db.String(10),nullable=True)     #名前
     user_id2 = db.Column(db.String(10),nullable=True)
     user_id3 = db.Column(db.String(10),nullable=True)
     user_id4 = db.Column(db.String(10),nullable=True)
     user_id5 = db.Column(db.String(10),nullable=True)
    #  time = db.Column(db.DateTime,nullabl=False)
    #  finishtime = db.Column(db.DateTime,nullabl=False)
     theme = db.Column(db.String(20),nullable=False)         

@app.route('/')
def hello():
     return "Hello World!"

@app.route('/createdb')
def create_db():
    """Create the database tables."""
    with app.app_context():
        db.create_all()
        return "Database tables created."

@app.route('/check-db')
def check_db():
    try:
        result = db.session.execute(text('SELECT 1')).scalar()
        if result == 1:
            return "Database connection successful!", 200
        else:
            return "Database connection failed!", 500
    except Exception as e:
        return str(e), 500
    
@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!", "user_id": 1})


@app.route('/api/chat', methods=['POST'])
def chat():
    get_chat = request.get_json()
    get_id = get_chat['id']

    # Get the latest message id from the database
    latest_message = message.query.order_by(desc(message.id)).first()
    message_db_id = str(latest_message.id) if latest_message else '0'

    if message_db_id > get_id:  # 文字列比較
        # Fetch the message with the latest id
        latest_message = message.query.get(int(message_db_id))
        message_db_user_id = latest_message.user_id
        message_db_message = latest_message.message

        # Fetch the user name from the user table
        user_db = user.query.get(message_db_user_id)
        user_db_user_name = user_db.user_name if user_db else None

        return jsonify({
            'id': message_db_id,
            'messages': message_db_message,
            'user_id': message_db_user_id,
            'name': user_db_user_name
        })
    else:
        return jsonify({'id': 'NUll',
                        'messages':'Null',
                        'user_id':'Null',
                        'name':'Null'})
     
#ユーザーがメッセージを送信した時の処理Clear
@app.route('/api/get_message',methods=['POST'])
def get_message():
    send_message = request.get_json()
    content_user_id = send_message['user_id']
    content_message = send_message['messages_txt']         

    #メッセージを保存
    Message = message(user_id=content_user_id,message=content_message)
    db.session.add(Message)
    db.session.commit()
          
    return jsonify({'flag':'true'})
    
    
#Clear
@app.route('/api/change_theme',methods=['POST'])
def change_theme():
    try:
       get_theme = request.get_json()
       theme0 = get_theme['theme_txt']
       theme_id = get_theme['user_id']

       room = Room.query.filter_by(user_id0=theme_id).first()
       
       room.theme = theme0
       db.session.commit()

       return jsonify({'flag':'true'})
    
    except Exception:
        return jsonify({'flag':'false'}),500
#Clear
@app.route('/api/post_theme',methods=['POST'])
def post_theme():
    try:
       post_theme = request.get_json()
       user_id_0 = post_theme['user_id']

       room = Room.query.filter_by(user_id0=user_id_0).first()
       
       return jsonify({'theme':room.theme})
    except Exception:
        return jsonify({'flag':'false'}),500

#ログインClear
@app.route('/login',methods=['POST'])
def login():
    
    login_data = request.get_json()
    if login_data:
        get_userid = login_data['user_id']
        get_password = login_data['pass']

    users = user.query.filter_by(user_id=get_userid).all()
    #  ユーザidとパスを確認
    if users and check_password_hash(users.password==get_password):
    
        return jsonify({'flag':'true'})
    
    else:
        return jsonify({'flag':'false'})     

@app.route("/signup", methods=['POST'])
def signup():
    signup_data = request.get_json()
    
    # Check if signup_data exists and contains the necessary fields
    if not signup_data or 'name' not in signup_data or 'user_id' not in signup_data or 'pass' not in signup_data:
        return jsonify({'flag': 'false'})

    signup_name = signup_data['name']
    signup_user_id = signup_data['user_id']
    signup_password = signup_data['pass']

    # Check if the user_id already exists in the database
    existing_user = user.query.filter_by(user_id=signup_user_id).first()

    if existing_user is None:
        # If no user with the same user_id exists, create a new user
        new_user = user(user_id=signup_user_id, user_name=signup_name, password=signup_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'flag': 'true'})
    else:
        # If a user with the same user_id exists, return false
        return jsonify({'flag': 'false'})

    
#Clear
@app.route("/get_userName",methods=['POST'])
def get_userName():
    try:
        get_user = request.get_json()
        id = get_user['user_id']

        name = user.query.filter_by(user_id=id).first()

        return jsonify({'user_name':name.user_name})
    
    except Exception:
        return jsonify({'flag':'false'}),500


if __name__ == "__main__":
     
     app.run(debug=True)
     #create_db()
     