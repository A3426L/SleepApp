from flask import Flask , jsonify , request 
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text , and_ , Table, Column, Integer, String, MetaData
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
    user_name = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(20), nullable=False)
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
#お試し用
@app.route('/add-user-test', methods=['GET'])
def add_user_test():
    id = "4"
    name = "ううう"
    new_user = User1(id=id, name=name)
    with app.app_context():
        db.session.add(new_user)
        db.session.commit()
    return "Add data succusess."

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


@app.route('/api/chat',methods=['POST'])
def chat():
    get_chat = request.get_json()
    if not get_chat:
            return jsonify({'flag': 'false', 'error': 'No JSON data found'})

    get_id = get_chat['id']
    get_user_id = get_chat['user_id']

    #メッセージ
    current_message = message.query.filter_by(
        and_(
            message.id > get_id,
            message.user_id==get_user_id
        )
    ).all()
    current_name = user.query(user.user_name)

    return jsonify({
        'id':current_message,
        'messages':current_message,
        'user_id':current_message,
        'name':current_name
    })
    # else:  
    #     return jsonify({'flag':'false'})

     
#ユーザーがメッセージを送信した時の処理Clear
@app.route('/api/get_message',methods=['POST'])
def get_message():
    send_message = request.get_json()
    content_user_id = send_message['user_id']
    content_message = send_message['messages']         

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
       theme0 = get_theme['theme']

       Theme = Room(theme=theme0)
       db.session.add(Theme)
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
        get_password = login_data['user_pass']

    users = user.query.filter_by(user_id=get_userid).all()
    #  ユーザidとパスを確認
    if users and check_password_hash(users.password==get_password):
    
        return jsonify({'flag':'true'})
    
    else:
        return jsonify({'flag':'false'})     

#アカウントの新規作成
@app.route("/signup",methods=['POST'])
def signup():
    signup_data = request.get_json()
    signup_name = signup_data['user_name']
    signup_user_id = signup_data['user_id']
    signup_password = signup_data['password']

    catch_user_id = user.query.filter_by(user_id = signup_user_id).first()
    catch_password = user.query.filter_by(password = signup_password).first()

    if user.query(catch_user_id.exists()).scalar() and user.query(catch_password.exists()).scalar():

        return jsonify({'flag':'false'})
    else:
        new_user = user(user_name=signup_name,user_id=signup_user_id,password=signup_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'flag':'true'})

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
     