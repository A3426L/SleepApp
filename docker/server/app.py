from flask import Flask , jsonify , request , session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text 
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class User2(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class user(db.Model):
    user_name = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(20), nullable=False)
    #メッセージモデル
class message(db.Model):
     id = db.Column(db.Integer,primary_key=True)
     user_id = db.Column(db.String(15),nullable=False)  
     message = db.Column(db.String(100),nullable=False)

#各ルームモデル
class Room(db.Model):
     id = db.Column(db.Integer,primary_key=True)
     user_id1 = db.Column(db.String(10),nullable=True)     #名前
     user_id2 = db.Column(db.String(10),nullable=True)
     user_id3 = db.Column(db.String(10),nullable=True)
     user_id4 = db.Column(db.String(10),nullable=True)
     user_id5 = db.Column(db.String(10),nullable=True)
     time = db.Column(db.DateTime,nullabl=False)
     finishtime = db.Column(db.DateTime,nullabl=False)
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
    new_user = User(id=id, name=name)
    with app.app_context():
        db.session.add(new_user)
        db.session.commit()
    return "Add data succusess."

# @app.route('/add-chat-test', methods=['GET'])
# def add_chat_test():
#     user_id = "abc123"
#     message = "Hello"
#     new_chat= Message( user_id=user_id, message = message)
#     with app.app_context():
#         db.session.add(new_chat)
#         db.session.commit()
#     return "Add data succusess."

@app.route('/add-room-test',methods=['GET'])
def add_room_test():
     user_id = "abc123"
     chat_time = datetime.strftime("%H:%M:%S",datetime.now())
     finish_time = chat_time + timedelta(minutes=10)
     new_room = Room(user_id1=user_id,time=chat_time,finishtime=finish_time)
     with app.app_context():
         db.session.add(new_room)
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

#チャットメッセージ
@app.route('/chat',methods=['POST'])
def chat():
     #送信データからルームを取得
     current_user_id = 
     current_messages = 
    
     return jsonify({'messages':current_messages, 'user_id':current_user_id})

#ユーザーがメッセージを送信した時の処理
@app.route('/send_message',methods=['POST'])
def send_message():
          message_content = request.form.get('messages')
          user_id_content = request.form.get('user_id')

          #メッセージを保存
          message = Message(user_id=user_id_content,message=message_content)
          db.session.add(message)
          db.session.commit()


if __name__ == "__main__":
     
     app.run(debug=True)
     #create_db()
     
