from flask import Flask , jsonify , request 
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text , and_ , Table, Column, Integer, String, MetaData
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
     get_id = get_chat['id']
     get_user_id = get_chat['user_id']

     if get_id and get_user_id:
       #メッセージ
       current_message = message.query.filter(
                     and_(
                         message.id > get_id,
                         message.user_id==get_user_id
                     )
       ).all()
       current_name = user.query(user.user_name)
    
       return jsonify({
                 'id':current_message.id,
                 'messages':current_message.user_id,
                 'user_id':current_message.message,
                 'name':current_name
              })

     else:
           return jsonify({'flag':'false'})
     
#ユーザーがメッセージを送信した時の処理
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

@app.route('/api/change_theme',methods=['POST'])
def change_theme():
       get_theme = request.get_json()
       theme0 = get_theme('theme')

       Theme = Room(theme=theme0)
       db.session.add(Theme)
       db.session.commit()

       return jsonify({'flag':'true'})
@app.route('/api/post_theme',methods=['POST'])
def post_theme():
       post_theme = request.get_json()
       user_id0 = post_theme('user_id')

       room = Room.query.filter(user_id=user_id0).all()
       
       return jsonify({'theme':room.theme})


if __name__ == "__main__":
     
     app.run(debug=True)
     #create_db()
     
