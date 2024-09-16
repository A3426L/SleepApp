from flask import Flask, jsonify, session, render_template, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text
from flask_cors import CORS
#from flask_socketio import SocketIO, emit, join_room, leave_room
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash  # パスワードのハッシュ化
from flask_migrate import Migrate


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
app.config['SQLALCHEMY_BINDS'] = {
    'userdate_db': 'mysql+pymysql://mysql:mysql@db:3306/Userdate_db',
    'info_db': 'mysql+pymysql://mysql:mysql@db:3306/Info_db',
    'oldroom_db': 'mysql+pymysql://mysql:mysql@db:3306/OldRoom_db',
    'room_db': 'mysql+pymysql://mysql:mysql@db:3306/Room_db',
    'message_db': 'mysql+pymysql://mysql:mysql@db:3306/Message_db'
}
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



app.secret_key = 'segment_Five'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# ユーザー情報
class Userdate(db.Model):
    __bind_key__ = 'userdate_db'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(10), nullable=False)  # 名前
    userpass = db.Column(db.String(20), nullable=False)  # パスワード
    user_id = db.Column(db.String(10), nullable=False)  # ID

#マッチング待機中に開かれているルーム情報を記録する。
class Info(db.Model):
    __bind_key__ = 'info_db'
    id = db.Column(db.Integer, primary_key=True)
    create_time = db.Column(db.String(6), nullable=False)  # 時間を文字列として保存する。Roomのテーブル名になる。
    number = db.Column(db.Integer, nullable=False, default=0)

# 各ルームモデル、基本的なルーム情報を保持する。
class Room(db.Model):
    __bind_key__ = 'room_db'
    id = db.Column(db.Integer, primary_key=True)
    user_id1 = db.Column(db.String(10), db.ForeignKey('userdate.user_id'), nullable=False)  #1番目はルームマスターとして扱う
    user_id2 = db.Column(db.String(10), db.ForeignKey('userdate.user_id'), nullable=True)
    user_id3 = db.Column(db.String(10), db.ForeignKey('userdate.user_id'), nullable=True)
    user_id4 = db.Column(db.String(10), db.ForeignKey('userdate.user_id'), nullable=True)
    user_id5 = db.Column(db.String(10), db.ForeignKey('userdate.user_id'), nullable=True)
    chat_time = db.Column(db.DateTime, nullable=False, default=datetime.now)#5人全員集まった際にチャット終了時間を記録する。現在時間から+5分
    theme = db.Column(db.String(20), nullable=False)  #このカラムは必要ない この文は修正するべき項目

# メッセージモデル
class Message(db.Model):#メッセージ情報を記録する。各ユーザーはinfo.dbのcreate_timeを基にテーブルにアクセスする
    __bind_key__ = 'message_db'
    id = db.Column(db.Integer, primary_key=True)#メッセージの順番に使用する。
    user_id = db.Column(db.String(15), nullable=False)#誰がそのメッセージを話したかを判別する
    message = db.Column(db.String(100), nullable=False)  # メッセージデータ

class OldRoom(db.Model):#Roomの過去情報を記録する。
    __bind_key__ = 'oldroom_db'
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime, db.ForeignKey('info.create_time'), nullable=False)
    theme = db.Column(db.String(20), nullable=False)
    user_id1 = db.Column(db.String(10), db.ForeignKey('Room.user_id1'), nullable=False)  # 名前
    user_id2 = db.Column(db.String(10), db.ForeignKey('Room.user_id2'), nullable=False)
    user_id3 = db.Column(db.String(10), db.ForeignKey('Room.user_id3'), nullable=False)
    user_id4 = db.Column(db.String(10), db.ForeignKey('Room.user_id4'), nullable=False)
    user_id5 = db.Column(db.String(10), db.ForeignKey('Room.user_id5'), nullable=False)

# データベース初期化
with app.app_context():
    db.create_all()


def index():
    return render_template('home.html')

# ログイン画面表示
@app.route("/login")
def login_get():
    return render_template("login.html")

# ログイン(後で編集する)
@app.route('/login', methods=['POST'])
def login():
    userid = request.form.get('user_id')
    password = request.form.get('userpass')

    user = Userdate.query.filter_by(user_id=userid).first()
    # ユーザidとパスを確認
    if user and check_password_hash(user.userpass, password):
        session['user_id'] = userid
        return redirect(url_for('login_get'))
    else:
        return render_template('login.html', error="入力したIDかパスワードが間違っています")

# アカウントの新規作成
@app.route("/regist", methods=['POST'])
def regist():
    name = request.form.get("name")
    password = request.form.get("password")
    user_id = request.form.get("id")

    # パスワードをハッシュ化
    hash_password = generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)
    new_user = Userdate(username=name, user_id=user_id, userpass=hash_password)
    db.session.add(new_user)
    db.session.commit()

    return redirect("/login")

# マッチング開始
@app.route('/start_matching', methods=['POST'])
def start_matching():
    current_time = datetime.now().strftime("%H%M%S")
    existing_room = Info.query.filter(Info.number < 5).first()

    if existing_room:#ルームが存在していた場合？
        existing_room.number += 1
        db.session.commit()
        room_table_name = existing_room.create_time
        room = db.Table(room_table_name, db.metadata, autoload_with=db.engine, extend_existing=True)
        if existing_room.number == 2:
            room.update().where(room.c.user_id2 == None).values(user_id2=session['user_id']).execute()
        elif existing_room.number == 3:
            room.update().where(room.c.user_id3 == None).values(user_id3=session['user_id']).execute()
        elif existing_room.number == 4:
            room.update().where(room.c.user_id4 == None).values(user_id4=session['user_id']).execute()
        elif existing_room.number == 5:
            room.update().where(room.c.user_id5 == None).values(user_id5=session['user_id']).execute()
            # 5人集まったらチャットルームに移行
            # db.session.delete(existing_room)
            # db.session.commit()
    else:#新しいルームを作成する
        new_room = Info(create_time=current_time, number=1)#
        db.session.add(new_room)
        db.session.commit()
        room_table_name = current_time
        room = db.Table(room_table_name, db.metadata,
                        db.Column('id', db.Integer, primary_key=True),
                        db.Column('user_id1', db.String(10), db.ForeignKey('userdate.user_id'), nullable=False),
                        db.Column('user_id2', db.String(10), db.ForeignKey('userdate.user_id'), nullable=True),
                        db.Column('user_id3', db.String(10), db.ForeignKey('userdate.user_id'), nullable=True),
                        db.Column('user_id4', db.String(10), db.ForeignKey('userdate.user_id'), nullable=True),
                        db.Column('user_id5', db.String(10), db.ForeignKey('userdate.user_id'), nullable=True),
                        db.Column('chat_time', db.DateTime, nullable=False, default=datetime.now),
                        db.Column('theme', db.String(20), nullable=False),
                        bind_key='room_db')
        db.metadata.create_all(db.engine)
        room.insert().values(user_id1=session['user_id']).execute()

    return jsonify({"message": "マッチングルームに参加しました"}), 200

# チャットメッセージ
@app.route('/chat/<int:user_id>', methods=['GET'])
def chat(user_id):
    # 送信データからルーム名を取得
    current_user_id = session['user_id']
    messages = Message.query.filter_by(user_id=user_id).all()

    chat_info = [{'user': Userdate.query.get(msg.user_id).username, 'message': msg.message} for msg in messages]
    return render_template('chat.html', messages=chat_info, user_id=current_user_id)

# ユーザーがメッセージを送信した時の処理
@app.route('/send_message', methods=['POST'])
def send_message():
    message_content = request.form.get('message')
    user_id = request.form.get('user_id', type=int)

    # メッセージを保存
    message = Message(user_id=user_id, message=message_content)
    db.session.add(message)
    db.session.commit()

    # 部屋にメッセージを送信
    # emit('receive_message', {'msg': session['username'] + ':' + message_content}, to=user_id)

@app.route('/chat')
def chat():  # チャットに名前を表示
    name = session.get('name', '')
    return render_template('chat.html', name=name)

# 入室した通知がいる