from flask import Flask , jsonify , session , render_template , redirect , url_for , request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text 
from flask_cors import CORS
from flask_socketio import SocketIO , emit , join_room
import eventlet
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
     user_id = db.Column(db.Integer,db.ForeignKey('userdate.user_id'),nullable=False)  
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
db.create_all()

def index():
     return render_template('home.html')

#ログイン画面表示
@app.route("/login")
def login_get():
     return render_template("login.html")

#ログイン(後で編集する)
@app.route('/login',methods=['POST'])
def login():
     userid = request.form.get('user_id')
     password = request.form.get('userpass')

     user = Userdate.query.filter_by(user_id=userid).first()
     #ユーザidとパスを確認
     if user and check_password_hash(Userdate.userpass,password):
        session['user_id'] = userid
        return redirect(url_for('login.html'))
        
     else:
          return render_template('login.html', error="入力したIDかパスワードが間違っています")
       

#アカウントの新規作成
@app.route("/regist",methods=['POST'])
def regist():
     name = request.form.get("name"),
     password = request.form.get("password"),
     user_id = request.form.get("id")

     #パスワードをハッシュ化
     hash_password = generate_password_hash(password,method='pbkdf2:sha256',salt_length=16)
     new_user = Userdate(username=name,userid=user_id,userpass=hash_password)
     db.session.add(new_user)
     db.session.commit()

     return redirect("/login")

#チャットメッセージ
@app.route('/chat/<int:user_id>',methods=['GET'])
def chat(user_id):
     #送信データからルーム名を取得
     user_id = session['user_id']
     messages = Message.query.filter_by(chat_id=user_id).all()

     chat_info = [{'user': Userdate.query.get(msg.user_id).username, 'message': msg.message} for msg in messages]
     return render_template('chat.html', messages=chat_info, user_id = user_id)

#ユーザーがメッセージを送信した時の処理
@app.route('/send_message',methods=['POST'])
def send_message():
          message_content = request.form.get('message')
          user_id = request.form.get('message',type = int)

          #メッセージを保存
          message = Message(user_id=user_id,message=message_content)
          db.session.add(message)
          db.session.commit()

          #部屋にメッセージを送信
          #emit('receive_message',{'msg':session['username'] + ':' + message_content},to=room)


@app.route('/chat')
def chat():         #チャットに名前を表示
     name = session.get('name','')
     return render_template('chat.html',name=name)

#入室した通知がいるか聞く
@app.route('notification',namespace='/chat')        #入室を通知する
def notification(message):
     room = session.get('room')
     emit('status',{'msg':f"{session.get('name')}が入室しました"},to=room)
     
#退出した通知
@app.route('/leave_room',methods=['POST'])
def leave_room():
     room = session.get('room')
     username = session.get('username')

     if not room or not username:
          return redirect(url_for('login'))
     
     #ユーザーを部屋から退出させる
     session.pop('room',None)

     #他のクライアントに退出を退出
     emit('status',{'mag':f'{username} が退出しました'},to=room)

     leave_room(room)


#投稿機能

