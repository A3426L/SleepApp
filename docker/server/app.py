
from flask import Flask , jsonify , request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text , or_ , and_ , Table, Column, Integer, String, MetaData ,desc
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

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

class Room(db.Model):
    __bind_key__ = 'room_db'
    room_name = db.Column(db.String(timeL), primary_key=True) 
    user_id0 = db.Column(db.String(user_idL), nullable=False)  # 1番目はルームマスターとして扱う
    user_id1 = db.Column(db.String(user_idL), nullable=True)
    user_id2 = db.Column(db.String(user_idL), nullable=True)
    user_id3 = db.Column(db.String(user_idL), nullable=True)
    user_id4 = db.Column(db.String(user_idL), nullable=True)
    theme = db.Column(db.String(themeL), nullable=True)
    start_time = db.Column(db.DateTime, nullable=True)  # 5人全員集まった際にその時間を記録する（datetime型）
    end_time = db.Column(db.DateTime, nullable=True)  # チャット終了予定時刻を記録する。（datetime型）db.Column(db.String(timeL), nullable=True)  # チャット終了予定時刻を記録する。（文字列）

# メッセージモデル
class Message(db.Model):  
    __bind_key__ = 'message_db'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)  # メッセージの順番に使用する。
    user_id = db.Column(db.String(user_idL), nullable=False)  # 誰がそのメッセージを話したかを判別する
    message = db.Column(db.String(140), nullable=False)  # メッセージデータ

class OldRoom(db.Model):
    __bind_key__ = 'oldroom_db'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    room_name = db.Column(db.String(timeL), nullable=False) 
    user_id0 = db.Column(db.String(user_idL), nullable=False)  # 1番目はルームマスターとして扱う
    user_id1 = db.Column(db.String(user_idL), nullable=True)
    user_id2 = db.Column(db.String(user_idL), nullable=True)
    user_id3 = db.Column(db.String(user_idL), nullable=True)
    user_id4 = db.Column(db.String(user_idL), nullable=True)
    theme = db.Column(db.String(timeL), nullable=True)
    start_time = db.Column(db.DateTime, nullable=True) 
    end_time = db.Column(db.DateTime, nullable=True)  # チャット終了予定時刻を記録する。（datetime型）
    
class Post(db.Model):
    __bind_key__ = 'post_db'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    room_name = db.Column(db.String(timeL), nullable=False) 
    user_id0 = db.Column(db.String(user_idL), nullable=False)
    theme = db.Column(db.String(themeL), nullable=False)
    post_txt = db.Column(db.String(140),nullable=False)

class Randomtheme(db.Model):
    __bind_key__ = 'randomtheme_db'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    theme = db.Column(db.String(timeL), nullable=False)

# --- ユーティリティ関数 ---

def format_datetime_to_string(dt_obj):
    return dt_obj.strftime('%Y%m%d%H%M%S')

def copy_record(room_name):
    with app.app_context():
        addrecord = Room.query.filter_by(room_name=room_name).first()
        if addrecord:
            add_old_room(
                room_name=addrecord.room_name,
                user_id0=addrecord.user_id0,
                user_id1=addrecord.user_id1,
                user_id2=addrecord.user_id2,
                user_id3=addrecord.user_id3,
                user_id4=addrecord.user_id4,
                theme=addrecord.theme,
                start_time=addrecord.start_time,
                end_time=addrecord.end_time
            )
            return "room copy complete!"
        else:
            return "room copy failed"

def add_old_room(room_name, user_id0, user_id1=None, user_id2=None, user_id3=None, user_id4=None, theme=None, start_time=None,end_time=None):
    new_old_room = OldRoom(room_name=room_name, user_id0=user_id0, user_id1=user_id1, user_id2=user_id2, user_id3=user_id3, user_id4=user_id4, theme=theme, start_time=start_time,end_time=end_time)
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
    rooms = Matching_info.query.filter(Matching_info.number <= 4).all()
    return rooms

def create_new_room(user_id):
    datetime = dt.now()
    strdatetime = format_datetime_to_string(datetime)
    add_matching(strdatetime, 1)  # 作成者は1固定
    add_room(strdatetime, user_id, None, None, None, None, None, None, None)
    bind_key = request.args.get('bind_key', 'message_db')
    create_table(bind_key, strdatetime)
    return jsonify({"flag": "true"})


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

def edit_room(user_id, room_name, number):
    room = Room.query.filter_by(room_name=room_name).first()
    if room:
        if room.user_id0 is None:
            room.user_id0 = user_id
        elif room.user_id1 is None:
            room.user_id1 = user_id
        elif room.user_id2 is None:
            room.user_id2 = user_id
        elif room.user_id3 is None:
            room.user_id3 = user_id
        elif room.user_id4 is None:
            room.user_id4 = user_id
        db.session.commit()

def is_matching_db_empty():
    # Matching_info テーブルのデータが存在するかを確認
    if db.session.query(Matching_info).first() is None:
        return True
    else:
        return False


# --- ルート定義 ---
### test #####
@app.route('/')
def hello():
     return "Hello World!"
 
# @app.route('/create_table/<table_name>', methods=['POST'])
# def create_table_endpoint(table_name):
#     bind_key = request.args.get('bind_key', 'message_db')  # デフォルトで'message_db'を使用
#     return create_table(bind_key, table_name)

@app.route('/testpost', methods=['POST'])
def testpost():
    data = request.get_json() 
    if 'user_id' in data:
        return jsonify({"received_user_id": data['user_id']}) 
    else:
        return jsonify({"error": "user_id not provided"}), 400

@app.route('/debug_createdb')
def create_db():
    """Create the database tables."""
    with app.app_context():
        db.create_all()
        return "Database tables created."
     
# @app.route('/copy_record/<room_name>')
# def copy_record_route(room_name):
#     return copy_record(room_name)

###########

@app.route('/matching_start', methods=['POST'])
def matching_start():
    data = request.get_json()
    if not data or 'user_id' not in data:
        return jsonify({"flag": "false"})
    
    user_id = data['user_id']
    
    # existing_room = Room.query.filter_by(user_id0=user_id).first()
    # if existing_room:
    #     room_name_to_delete = existing_room.room_name
    #     Room.query.filter_by(room_name=room_name_to_delete).delete()
    #     db.session.commit()
    
    if is_matching_db_empty():
        return create_new_room(user_id)
    
    rooms = get_rooms_with_number_leq_4()
    if not rooms:
        return create_new_room(user_id)
    
    # 4以下のnumberを持つroomが存在する場合
    room = rooms[0]  # 最初の適切なroomを選択
    increment_room_number(room.room_name)
    edit_room(user_id, room.room_name, room.number)
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
    
    # # マッチングがまだ完了していない場合
    return jsonify({"flag": "false"})

@app.route('/chat_start', methods=['POST'])
def chat_start():
    data = request.get_json()
    if not data or 'user_id' not in data:
        return jsonify({"flag": "false"})

    user_id = str(data['user_id'])  # user_idを確実に文字列に

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
        if room.start_time is None or room.end_time is None:
            # roomのstart_timeとend_timeが存在しなかったとき
            current_time = dt.now()
            end_time = current_time + timedelta(minutes=5)
            room.start_time = current_time
            room.end_time = end_time
            db.session.commit()
        else:
            # roomのstart_timeとend_timeが存在したとき
            current_time = room.start_time
            end_time = room.end_time
        
        copy_record(room.room_name)
        db.session.delete(room)
        db.session.commit()
        
        return jsonify({
            "flag": "true",
            "user_id0": str(room.user_id0),
            "start_time": str(format_datetime_to_string(current_time)),
            "end_time": str(format_datetime_to_string(end_time)),
            "room_name": str(room.room_name)
        })
    else:
        # 降順で検索するように変更
        old_room = OldRoom.query.filter(
            or_(
                OldRoom.user_id0 == user_id,
                OldRoom.user_id1 == user_id,
                OldRoom.user_id2 == user_id,
                OldRoom.user_id3 == user_id,
                OldRoom.user_id4 == user_id
            )
        ).order_by(desc(OldRoom.id)).first()

        if old_room:
            return jsonify({
                "flag": "true",
                "user_id0": str(old_room.user_id0),
                "start_time": str(format_datetime_to_string(old_room.start_time)),
                "end_time": str(format_datetime_to_string(old_room.end_time)),
                "room_name": str(old_room.room_name)
            })
    
    return jsonify({"flag": "false", "error": "No room found"})
### Post機能

@app.route('/postView_group',methods=['POST'])
def postView_group():
    data = request.get_json()
    user_id = data['user_id']
    old_results = OldRoom.query.filter(
        or_(
            OldRoom.user_id0 == user_id,
            OldRoom.user_id1 == user_id,
            OldRoom.user_id2 == user_id,
            OldRoom.user_id3 == user_id,
            OldRoom.user_id4 == user_id
        )
     ).order_by(OldRoom.end_time.desc()).all()
    if old_results:
        latest_old = old_results[0]
        latest_room_name = latest_old.room_name
    else:
        old_list = {}
    posts = Post.query.order_by(Post.id.desc()).filter_by(room_name=latest_room_name).limit(20).all()
    post_list = [
        {
            "id": post.id,
            "user_name": post.user_id0,
            "theme": post.theme,
            "post_txt": post.post_txt
        }
        for post in posts
    ]
    return jsonify(post_list)

@app.route('/postView_all')
def postView_all():
    posts = Post.query.order_by(Post.id.desc()).limit(20).all()
    post_list = [
        {
            "id": post.id,
            "user_name": post.user_id0,
            "theme": post.theme,
            "post_txt": post.post_txt
        }
        for post in posts
    ]
    return jsonify(post_list)

@app.route('/movePost',methods=['POST'])
def movePost():
    data = request.get_json()
    user_id = data['user_id']
    old_results = OldRoom.query.filter(
        or_(
            OldRoom.user_id0 == user_id,
            OldRoom.user_id1 == user_id,
            OldRoom.user_id2 == user_id,
            OldRoom.user_id3 == user_id,
            OldRoom.user_id4 == user_id
        )
    ).order_by(OldRoom.end_time.desc()).all()
    if old_results:
        latest_old = old_results[0]
        latest_theme_name = latest_old.theme
    else:
        old_list = {}

    return latest_theme_name

@app.route('/post',methods=['POST'])
def post():
    try:
        data = request.get_json()
        user_id = data['user_id']
        post_txt = data['post_txt']

        old_results = OldRoom.query.filter(
            or_(
                OldRoom.user_id0 == user_id,
                OldRoom.user_id1 == user_id,
                OldRoom.user_id2 == user_id,
                OldRoom.user_id3 == user_id,
                OldRoom.user_id4 == user_id
            )
        ).order_by(OldRoom.end_time.desc()).all()
        
        if old_results:
            latest_old = old_results[0]
            latest_room_name = latest_old.room_name
            latest_room_theme = latest_old.theme
        else:
            old_list = {}

        new_post = Post(room_name = latest_room_name,user_id0 = user_id,theme = latest_room_theme, post_txt = post_txt)
        db.session.add(new_post)
        db.session.commit()

        return jsonify({"flag":"true"})
    
    except Exception:
        return jsonify({"flag":"false"}), 500
    
###


### Chat機能　
@app.route('/api/chat', methods=['POST'])
def chat():
    get_chat = request.get_json()
    get_user_id = get_chat['user_id']
    get_id = get_chat['id']

    # Get the latest message id from the database
    latest_message = Message.query.order_by(desc(Message.id)).first()
    message_db_id = latest_message.id if latest_message else 0


    if message_db_id > get_id:  # 文字列比較
        # Fetch the message with the latest id
        latest_message = Message.query.get(message_db_id)
        message_db_user_id = latest_message.user_id
        message_db_message = latest_message.message

        # Fetch the user name from the user table
        user_db = User.query.get(message_db_user_id)
        user_db_user_name = user_db.user_name if user_db else None

        return jsonify({
            'id': message_db_id,
            'messages': message_db_message,
            'user_id': message_db_user_id,
            'name': user_db_user_name
        })
    else:
        return jsonify({'flag': 'false'})
    

@app.route('/api/get_message',methods=['POST'])
def get_message():
    try:
        send_message = request.get_json()
        content_user_id = send_message['user_id']
        content_message = send_message['message_txt']         

        #メッセージを保存
        message = Message(user_id=content_user_id,message=content_message)
        db.session.add(message)
        db.session.commit()
          
        return jsonify({'flag':'true'})
    
    except Exception:
        return jsonify({'flag':'false'}),500
    
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
    
@app.route('/api/post_theme',methods=['POST'])
def post_theme():
    try:
       post_theme = request.get_json()
       user_id0 = post_theme['user_id']

       room = Room.query.filter(user_id=user_id0).all()
       
       return jsonify({'theme':room.theme})
    except Exception:
        return jsonify({'flag':'false'}),500
    

### login機能
@app.route('/login',methods=['POST'])
def login():
    
    login_data = request.get_json()
    if login_data:
        get_userid = login_data['user_id']
        get_password = login_data['pass']

    users = User.query.filter_by(user_id=get_userid).first()
    #  ユーザidとパスを確認
    if users.query.filter_by(user_id=get_userid,password=get_password):
    
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
    existing_user = User.query.filter_by(user_id=signup_user_id).first()

    if existing_user is None:
        # If no user with the same user_id exists, create a new user
        new_user = User(user_id=signup_user_id, user_name=signup_name, password=signup_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'flag': 'true'})
    else:
        # If a user with the same user_id exists, return false
        return jsonify({'flag': 'false'})


@app.route("/get_userName",methods=['POST'])
def get_userName():
    try:
        get_user = request.get_json()
        id = get_user['user_id']

        name = User.query.filter(User.user_id==id).first()

        return jsonify({'user_name':name.user_name})
    
    except Exception:
        return jsonify({'flag':'false'}),500



if __name__ == "__main__":
    app.run(debug=True)