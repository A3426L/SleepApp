from flask import Flask , jsonify , session , render_template , redirect , url_for , request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text 
from flask_cors import CORS
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash #パスワードのハッシュ化



app = Flask(__name__)
CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = 'segment_Five'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

#ユーザーモデル
class Userdate(db.Model):
     id = db.Column(db.Integer,primary_key=True)
     username = db.Column(db.String(10),nullable=False)     #名前
     userpass = db.Column(db.String(20),nullable=False)     #パスワード
     user_id = db.Column(db.String(15),nullable=False)      

#データベース見るよう
class info(db.Model):
     id = db.Column(db.Integer,primary_key=True)
     create_time = db.Column(db.DateTime,nullable=False,default=datetime.now)
     number = db.Column(db.Integer,nullable=False)

#各ルームモデル
class Room(db.Model):
     id = db.Column(db.Integer,primary_key=True)
     user_id1 = db.Column(db.String(10),db.ForeignKey('userdate.user_id'),nullable=False)     #名前
     user_id2 = db.Column(db.String(10),db.ForeignKey('userdate.user_id'),nullable=False)
     user_id3 = db.Column(db.String(10),db.ForeignKey('userdate.user_id'),nullable=False)
     user_id4 = db.Column(db.String(10),db.ForeignKey('userdate.user_id'),nullable=False)
     user_id5 = db.Column(db.String(10),db.ForeignKey('userdate.user_id'),nullable=False)
     chat_time = db.Column(db.DateTime,nullable=False)
     theme = db.Column(db.String(20),nullable=False)         #リーダかそれ以外か

#メッセージモデル
class Message(db.Model):
     id = db.Column(db.Integer,primary_key=True)
     user_id = db.Column(db.String(15),nullable=False)  
     message = db.Column(db.String(100),nullable=False)          #メッセージ

class oldRoom(db.Model):
     id = db.Column(db.Integer,primary_key=True)
     time = db.Column(db.DateTime,db.ForeignKey('info.create_time'),nullable=False)
     theme = db.Column(db.String(20),nullable=False)
     user_id1 = db.Column(db.String(10),db.ForeignKey('Room.user_id1'),nullable=False)     #名前
     user_id2 = db.Column(db.String(10),db.ForeignKey('Room.user_id2'),nullable=False)
     user_id3 = db.Column(db.String(10),db.ForeignKey('Room.user_id3'),nullable=False)
     user_id4 = db.Column(db.String(10),db.ForeignKey('Room.user_id4'),nullable=False)
     user_id5 = db.Column(db.String(10),db.ForeignKey('Room.user_id5'),nullable=False)


#データベース初期化
with app.app_context():
     db.create_all()

with app.app_context():
     user1 = Userdate(username="松田",userpass="gyasg",user_id="1")
     user2 = Userdate(username="田島",userpass="gyasq",user_id="2")
     user3 = Userdate(username="山本",userpass="gyasr",user_id="3")
     massage1 = Message(user_id="1",message="おはよう")
     massage2 = Message(user_id="2",message="おはよう")
     massage3 = Message(user_id="3",message="おはよう")
     massage4 = Message(user_id="1",message="今日も仕事です")
     massage5 = Message(user_id="2",message="仕事は嫌です")

     db.session.add(user1)
     db.session.add(user2)
     db.session.add(user3)
     db.session.add(massage1)
     db.session.add(massage2)
     db.session.add(massage3)
     db.session.add(massage4)
     db.session.add(massage5)
     db.session.commit()

def index():
     return app.send_static_file('home.html')

#ログイン画面表示
@app.route("/login")
def login_get():
     return app.send_static_file('login.html')

#ログイン(後で編集する)
@app.route('/login',methods=['POST'])
def login():
     userid = request.form.get('user_id')
     password = request.form.get('userpass')


     user = Userdate.query.filter_by(user_id=userid).first()
     #ユーザidとパスを確認
     if user and check_password_hash(Userdate.userpass,password):
        userid = session['user_id']
        return app.send_static_file('login.html')
        
     else:
          return jsonify({'status': 'error', 'message': '入力したIDかパスワードが間違っています'})
       

#アカウントの新規作成
@app.route("/regist",methods=['POST'])
def regist():
     name = request.form.get('name')
     password = request.form.get('password')
     user_id = request.form.get('id')

     #パスワードをハッシュ化
     hash_password = generate_password_hash(password,method='pbkdf2:sha256',salt_length=16)
     new_user = Userdate(username=name,userid=user_id,userpass=hash_password)
     db.session.add(new_user)
     db.session.commit()

     return app.send_static_file('/login')

#チャットメッセージ
@app.route('/chat/<int:user_id>',methods=['GET'])
def chat(user_id):
     #送信データからルーム名を取得
     current_user_id = session['user_id']
     current_messages = Message.query.filter_by(user_id=user_id).all()

     chat_info = [{'user_id': msg.user_id, 'messages': msg.message} for msg in current_messages]
     return jsonify({'messages':chat_info.message, 'user_id':current_user_id})

#ユーザーがメッセージを送信した時の処理
@app.route('/send_message',methods=['POST'])
def send_message():
          message_content = request.form.get('messages')
          current_user_id = request.form.get('user_id')
          #メッセージを保存
          message = Message(user_id=current_user_id,message=message_content)
          db.session.add(message)
          db.session.commit()

         

#チャットに名前を表示
@app.route('/chat_name',methods=['GET'])
def chat_name():        
     username = session.get('name')
     return jsonify({'chat_name':username})

#入室した通知
@app.route('/room_in',methods=['GET'])        
def room_in():
     name = session.get('name')
     return jsonify({'in_message':f'{name}が入室しました'})

#退室した通知
@app.route('/room_out',methods=['GET'])        
def room_out():
     name = session.get('name')
     return jsonify({'out_message':f'{name}が退室しました'})     
     
#退出
@app.route('/leave_room',methods=['GET'])
def leave_room():
     room = session.get('room')
     username = session.get('username')

     if not room or not username:
          return redirect(url_for('login'))
     
     #ユーザーを部屋から退出させる
     session.pop('room',None)

     leave_room(room)


if __name__ == "__main__":
     
     app.run(debug=True)
#投稿機能

