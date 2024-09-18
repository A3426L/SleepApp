
from flask import Flask , jsonify , request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text , or_ , Table, Column, Integer, String, MetaData
from flask_cors import CORS

from datetime import datetime as dt, timedelta

app = Flask(__name__)
CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
app.config['SQLALCHEMY_BINDS'] = {
    'user_db': 'mysql+pymysql://mysql:mysql@db:3306/User_db',
    'matching_db': 'mysql+pymysql://mysql:mysql@db:3306/Matching_db',
    'oldroom_db': 'mysql+pymysql://mysql:mysql@db:3306/OldRoom_db',
    'room_db': 'mysql+pymysql://mysql:mysql@db:3306/Room_db',
    'message_db': 'mysql+pymysql://mysql:mysql@db:3306/Message_db',
    'post_db': 'mysql+pymysql://mysql:mysql@db:3306/Post_db',
    'randomtheme_db': 'mysql+pymysql://mysql:mysql@db:3306/RandomTheme_db'
}
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
metadata = MetaData()

user_idL = 10
user_nameL = 10
timeL = 30
themeL = 20

# ユーザー情報
class User(db.Model):
    __bind_key__ = 'user_db'
    __tablename__ = 'user'  # 明示的にテーブル名を指定
    user_id = db.Column(db.String(user_idL), primary_key=True)  # ID
    user_name = db.Column(db.String(user_nameL), nullable=False)  # 名前
    password = db.Column(db.String(20), nullable=False)  # パスワード

# マッチング待機中に開かれているルーム情報を記録する。
class Matching_info(db.Model):
    __bind_key__ = 'matching_db'
    room_name = db.Column(db.String(timeL), primary_key=True)  # 時間を文字列として保存する。Roomのテーブル名になる。
    number = db.Column(db.Integer, nullable=False, default=0)

# 各ルームモデル、チャットルームのメンバ情報、ルームナンバを保持する。
class Room(db.Model):
    __bind_key__ = 'room_db'
    room_name = db.Column(db.String(timeL), primary_key=True) 
    user_id0 = db.Column(db.String(user_idL), nullable=False)  # 1番目はルームマスターとして扱う
    user_id1 = db.Column(db.String(user_idL), nullable=True)
    user_id2 = db.Column(db.String(user_idL), nullable=True)
    user_id3 = db.Column(db.String(user_idL), nullable=True)
    user_id4 = db.Column(db.String(user_idL), nullable=True)
    theme = db.Column(db.String(themeL), nullable=True)
    start_time = db.Column(db.String(timeL), nullable=True)  # 5人全員集まった際にその時間を記録する（文字列）
    end_time = db.Column(db.String(timeL), nullable=True)  # チャット終了予定時刻を記録する。（文字列）

# メッセージモデル
class Message(db.Model):  
    __bind_key__ = 'message_db'
    id = db.Column(db.Integer, primary_key=True)  # メッセージの順番に使用する。
    user_id = db.Column(db.String(user_idL), nullable=False)  # 誰がそのメッセージを話したかを判別する
    message = db.Column(db.String(140), nullable=False)  # メッセージデータ

class OldRoom(db.Model):  # Roomの過去情報を記録する。
    __bind_key__ = 'oldroom_db'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    room_name = db.Column(db.String(timeL), nullable=False) 
    user_id0 = db.Column(db.String(user_idL),nullable=False)  # 1番目はルームマスターとして扱う
    user_id1 = db.Column(db.String(user_idL),nullable=True)
    user_id2 = db.Column(db.String(user_idL),nullable=True)
    user_id3 = db.Column(db.String(user_idL),nullable=True)
    user_id4 = db.Column(db.String(user_idL),nullable=True)
    theme = db.Column(db.String(timeL), nullable=True)
    end_time = db.Column(db.String(timeL), nullable=True)  # チャット終了予定時刻を記録する。（文字列）

class Post(db.Model):
    __bind_key__ = 'post_db'
    id = db.Column(db.Integer, primary_key=True)
    room_name = db.Column(db.String(timeL), nullable=False) 
    user_id0 = db.Column(db.String(user_idL), nullable=False)
    theme = db.Column(db.String(themeL), nullable=False)
    post_txt = db.Column(db.String(140),nullable=False)

class Randomtheme(db.Model):
    __bind_key__ = 'randomtheme_db'
    id = db.Column(db.Integer, primary_key=True)
    theme = db.Column(db.String(timeL), nullable=False)

# --- ユーティリティ関数 ---

def format_datetime_to_string(dt_obj):
    return dt_obj.strftime('%Y%m%d%H%M%S')

def get_current_datetime(offset):
    datetime = dt.now() + timedelta(minutes=offset)
    strdatetime = format_datetime_to_string(datetime)
    return strdatetime

def copy_record(room_name):#roomのroom_nameを起点としてその内容をroom_oldへ記録する．
    with app.app_context():
        addrecord = Room.query.filter_by(room_name=room_name).first()
        if addrecord:
            add_old_room(addrecord.room_name,addrecord.user_id0,addrecord.user_id1,addrecord.user_id2,addrecord.user_id3,addrecord.user_id4,addrecord.theme,addrecord.end_time)
            return "room copy comp!"
        else:
            return "room copy faild"

def add_old_room(room_name, user_id0, user_id1=None, user_id2=None, user_id3=None, user_id4=None, theme=None, end_time=None):
    new_old_room = OldRoom(room_name=room_name, user_id0=user_id0, user_id1=user_id1, user_id2=user_id2, user_id3=user_id3, user_id4=user_id4, theme=theme, end_time=end_time)
    with app.app_context():
        db.session.add(new_old_room)
        db.session.commit()
    return "Old room added successfully."

def create_table(bind_key, table_name):#message専用
    try:
        engine = db.get_engine(app, bind=bind_key)
        metadata.bind = engine

        new_table = Table(
            table_name, 
            metadata,
            Column('id', Integer, primary_key=True),
            Column('name', String(50)),
            Column('email', String(100))
        )

        metadata.create_all(engine)
        return jsonify({"message": f"Table {table_name} created successfully in {bind_key}."}), 200

    except Exception as e:
        return jsonify({"message": f"Failed to create table: {str(e)}"}), 500

def get_rooms_with_number_leq_4():
    rooms = Matching_info.query.filter(Matching_info.number <= 4).first()
    if rooms:
        return rooms.room_name, rooms.number
    return None, None

def increment_room_number(room_name):
    room = Matching_info.query.filter_by(room_name=room_name).first()
    if room:
        room.number += 1
        db.session.commit()
    else:
        print(f"Room with name {room_name} not found.")

def add_matching(room_name, number):
    new_info = Matching_info(room_name=room_name, number=number)
    with app.app_context():
        db.session.add(new_info)
        db.session.commit()
    return "Matching info added successfully."

def add_room(room_name, user_id0,user_id1=None, user_id2=None, user_id3=None, user_id4=None,theme=None, start_time=None, end_time=None):
    new_room = Room(room_name=room_name, user_id0=user_id0, user_id1=user_id1, user_id2=user_id2, user_id3=user_id3, user_id4=user_id4, theme=theme, start_time=start_time, end_time=end_time)
    with app.app_context():
        db.session.add(new_room)
        db.session.commit()
    return "Room added successfully."

def eddit_room(user_id, room_name, number):
    room = Room.query.filter_by(room_name=room_name).first()
    if room:
        if number == 1:
            room.user_id1 = user_id
        elif number == 2:
            room.user_id2 = user_id
        elif number == 3:
            room.user_id3 = user_id
        elif number == 4:
            room.user_id4 = user_id
        db.session.commit()

def is_matching_db_empty():
    # Matching_info テーブルのデータが存在するかを確認
    if db.session.query(Matching_info).first() is None:
        return True
    else:
        return False


# --- ルート定義 ---

@app.route('/')
def hello():
     return "Hello World!"
 
# @app.route('/create_table/<table_name>', methods=['POST'])
# def create_table_endpoint(table_name):
#     bind_key = request.args.get('bind_key', 'message_db')  # デフォルトで'message_db'を使用
#     return create_table(bind_key, table_name)

@app.route('/debug_createdb')
def create_db():
    """Create the database tables."""
    with app.app_context():
        db.create_all()
        return "Database tables created."
     
# @app.route('/copy_record/<room_name>')
# def copy_record_route(room_name):
#     return copy_record(room_name)



@app.route('/matching_start',methods=['POST'])
def matching_start():

    data = request.get_json()
    if data:
        user_id = data['user_id']
    else:
        #return "Send it properly, you stupid fxxk you!"
        return jsonify({"flag": "false"})
    
    #room の すべてのレコードの中を検索し送信されてきたuser_idと同じuser_id0が見つかったとき
    #そのレコードのroom_nameを取得しroom_nameを使用してそのレコードを削除する。
    existing_room = Room.query.filter_by(user_id0=user_id).first()
    if existing_room:
        room_name_to_delete = existing_room.room_name
        Room.query.filter_by(room_name=room_name_to_delete).delete()
        db.session.commit()
    
    result = is_matching_db_empty()

    if result:
        datetime = dt.now()
        strdatatime = format_datetime_to_string(datetime)
        add_matching(strdatatime, 1)  # 作成者は1固定
        add_room(strdatatime, user_id, None, None, None, None, None, None, None)
        bind_key = request.args.get('bind_key', 'message_db')
        create_table(bind_key, strdatatime)
        return jsonify({"flag": "true"})
    else:
        room_name, number = get_rooms_with_number_leq_4()
        increment_room_number(room_name)
        eddit_room(user_id, room_name, number)
        return jsonify({"flag": "true"})


@app.route('/matching', methods=['POST'])
def matching():
    data = request.get_json()
    if data:
        user_id = data['user_id']
    else:
        return jsonify({"flag": "false"})

    # user_idに一致するRoomのレコードを検索
    room = Room.query.filter(
        or_(
            Room.user_id0 == user_id,
            Room.user_id1 == user_id,
            Room.user_id2 == user_id,
            Room.user_id3 == user_id,
            Room.user_id4 == user_id
        )
    ).first()

    if room:
        # ルームが見つかった場合、room_nameに一致するMatching_infoレコードを取得
        matching_info = Matching_info.query.filter_by(room_name=room.room_name).first()
        if matching_info:
            number = matching_info.number
            # ルームの人数が5人の場合、マッチング完了
            if number == 5:
                return jsonify({"flag": "true"})
    
    # マッチングがまだ完了していない場合
    return jsonify({"flag": "false"})





@app.route('/chat_start', methods=['POST'])
def chat_start():
    data = request.get_json()
    if data:
        user_id = data['user_id']
    else:
        return jsonify({"flag": "false"})

    # user_idに基づいてRoomレコードを検索
    room = Room.query.filter(
        or_(
            Room.user_id0 == user_id,
            Room.user_id1 == user_id,
            Room.user_id2 == user_id,
            Room.user_id3 == user_id,
            Room.user_id4 == user_id
        )
    ).first()

    if room:
        user_id0 = room.user_id0  # ルームマスターのID
        room_name = room.room_name
        start_time = get_current_datetime(offset=0)  # 現在の時刻を取得
        end_time = get_current_datetime(offset=5)  # 5分後の時刻を終了時刻として設定
        
        
        #chat_startではMatching_infoを削除できない。Matching_infoを参照して開始されるのでラグがあった場合とんでもねぇことになる。
        #送信されてきたuser_idとuser_id0が同じとき(実行するのはルームマスターのみ)room->old_roomへコピー
        if user_id == user_id0:
            copy_record(room_name)
        
        return jsonify({
            "flag": "true",
            "user_id0": user_id0,
            "start_time": start_time,
            "end_time": end_time,
            "room_name": room_name
        })
    
    return jsonify({"flag": "false"})

if __name__ == "__main__":
    app.run(debug=True)