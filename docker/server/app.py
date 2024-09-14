from flask import Flask , jsonify , session , render_template , redirect , url_for , request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text 
from flask_cors import CORS
from flask_socketio import SocketIO , emit , join_room
import eventlet



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
     username = db.Column(db.String(50),nullable=False)     #名前
#ルームモデル
class Room(db.Model):
     id = db.Column(db.Integer,primary_key=True)
     people_inthe_room = db.Column(db.Integer,nullable=False)       #ルーム人数
     room_number = db.Column(db.Integer,nullable=False)         #ルームナンバー
#メッセージモデル
class Message(db.Model):
     id = db.Column(db.Integer,primary_key=True)
     user_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)  
     message = db.Column(db.String(100),nullable=False)          #メッセージ

#データベース初期化
db.create_all()

def index():
     return render_template('chat.html')

#ログイン
@app.route('/login',methods=['POST'])
def login():
     username = request.form.get('username')
     if username:
        user = Userdate.query.filter_by(username=username).first()
        if not user:
            user = Userdate(username=username)
            db.session.add(user)
            db.session.commit()
        session['username'] = username
        session['user_id'] = user.id
        #ユーザをリダイレクト,動的URL生成
        return redirect(url_for('index'))
     return redirect(url_for('index'))

@app.route('/join_room',nmethods=['POST'])
def join_room(data):
     #送信データからルーム名を取得
     room = request.form.get('room')

     if 'username' not in session:      #ログインしてない場合
          return redirect(url_for('login'))
     
     session['room'] = room

     join_room(room)

     emit('status',{'msg':session['username']+'has entered the room'}, to=room)

#ユーザーがメッセージを送信した時の処理
@app.route('/send_message',methods=['POST'])
def send_message():
     if 'user_id' in session:
          message_content = request.form.get('message')
          room = request.form.get('room')

          #メッセージを保存
          message = Message(room=room, user_id=session['user_id'],message=message_content)
          db.session.add(message)
          db.session.commit()

          #部屋にメッセージを送信
          emit('receive_message',{'msg':session['username'] + ':' + message_content},to=room)

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
     

