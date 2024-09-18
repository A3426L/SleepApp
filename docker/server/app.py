
from flask import Flask , jsonify , request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text , or_ , Table, Column, Integer, String, MetaData
from flask_cors import CORS

from datetime import datetime as dt

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
timeL = 14
themeL = 10


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
    message = db.Column(db.String(100), nullable=False)  # メッセージデータ

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
    post_txt = db.Column(db.String(150),nullable=False)

class Randomtheme(db.Model):
    __bind_key__ = 'randomtheme_db'
    id = db.Column(db.Integer, primary_key=True)
    theme = db.Column(db.String(timeL), nullable=False)
        
############デバッグ用だよ####################
#サービス 開始チェック 
@app.route('/')
def hello():
     return "Hello World!"

@app.route('/debug_createdb')
def create_db():
    """Create the database tables."""
    with app.app_context():
        db.create_all()
        return "Database tables created."

if __name__ == "__main__":
     
     app.run(debug=True)
     #create_db()

##################################################開発area#########################################

#その他の関数
def format_datetime_to_string(dt_obj):
    return dt_obj.strftime('%Y%m%d%H%M%S%f')

@app.route('/date')
def get_current_datetime():
    datetime = dt.now()
    strdatatime = format_datetime_to_string(datetime)
    return strdatatime

############ COPY FUNC#################

#roomのroom_nameを起点としてその内容をroom_oldへ記録する．
def copy_record(room_name):
    with app.app_context():
        addrecord = Room.query.filter_by(room_name=room_name).first()
        if addrecord:
            add_old_room(addrecord.room_name,addrecord.user_id0,addrecord.user_id1,addrecord.user_id2,addrecord.user_id3,addrecord.user_id4,addrecord.theme,addrecord.endt_ime)
            return "room copy comp!"
        else:
            return "room copy faild"

@app.route('/copy_record/<room_name>')
def copy_record_route(room_name):
    return copy_record(room_name)

def is_matching_db_empty():
    # Matching_info テーブルのデータが存在するかを確認
    if db.session.query(Matching_info).first() is None:
        return True
    else:
        return False
    
@app.route('/check_db_empty')
def check_db_empty():
    return is_matching_db_empty()
################    messageデータベースに新たなテーブルを作成する関数     #################

def create_table(bind_key, table_name):
    try:
        # 指定されたデータベースに接続
        engine = db.get_engine(app, bind=bind_key)
        metadata.bind = engine

        # 動的にテーブルを作成
        new_table = Table(
            table_name, 
            metadata,
            Column('id', Integer, primary_key=True),
            Column('name', String(50)),
            Column('email', String(100))
        )

        # テーブル作成
        metadata.create_all(engine)

        return jsonify({"message": f"Table {table_name} created successfully in {bind_key}."}), 200

    except Exception as e:
        return jsonify({"message": f"Failed to create table: {str(e)}"}), 500

@app.route('/create_table/<table_name>', methods=['POST'])
def create_table_endpoint(table_name):
    bind_key = request.args.get('bind_key', 'message_db')  # デフォルトで'message_db'を使用
    return create_table(bind_key, table_name)

###############     ルート解決 matching 開始時############


# 1. matching_dbにあるすべてのレコードを取得し、そのなかのnumberが4以下のroom_nameを戻り値とする関数
def get_rooms_with_number_leq_4():
    rooms = Matching_info.query.filter(Matching_info.number <= 4).first()
    return [room.room_name for room in rooms]

# 2. room_nameを引数にmatchingのnumberを+1する関数
def increment_room_number(room_name):
    room = Matching_info.query.filter_by(room_name=room_name).first()
    if room:
        room.number += 1
        db.session.commit()
    else:
        print(f"Room with name {room_name} not found.")



@app.route('matching_start',methods=['POST'])
def matching_start():

    data = request.get_json()
    if data:
        user_id = data['user_id']
    else:
        return "Send it properly, you stupid fxxk you!"
    
    result = is_matching_db_empty()

    if(result):
        datetime = dt.now()
        strdatatime = format_datetime_to_string(datetime)
        add_matching(strdatatime, 1)
        add_room(strdatatime, user_id,"0", None, None, None,None, None, None)
        bind_key = request.args.get('bind_key', 'message_db')
        create_table(bind_key,strdatatime)
    else:
        room_name = get_rooms_with_number_leq_4()
        increment_room_number(room_name)

