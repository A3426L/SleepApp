# from flask import Flask , jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from sqlalchemy import text 
# from flask_cors import CORS


# app = Flask(__name__)
# CORS(app) 
# #test
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), nullable=False)

# class User2(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), nullable=False)

# @app.route('/')
# def hello():
#      return "Hello World!"

# @app.route('/createdb')
# def create_db():
#     """Create the database tables."""
#     with app.app_context():
#         db.create_all()
#         return "Database tables created."

# @app.route('/add-user-test', methods=['GET'])
# def add_user_test():
#     id = "2"
#     name = "ううう"
#     new_user = User(id=id, name=name)
#     with app.app_context():
#         db.session.add(new_user)
#         db.session.commit()
#     return "Add data succusess."



# @app.route('/check-db')
# def check_db():
#     try:
#         result = db.session.execute(text('SELECT 1')).scalar()
#         if result == 1:
#             return "Database connection successful!", 200
#         else:
#             return "Database connection failed!", 500
#     except Exception as e:
#         return str(e), 500
    
# @app.route('/api/data', methods=['GET'])
# def get_data():
#     return jsonify({"message": "Hello from Flask!", "user_id": 1})

# if __name__ == "__main__":
     
#      app.run(debug=True)
#      #create_db()
     
from flask import Flask , jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text 
from flask_cors import CORS


app = Flask(__name__)
CORS(app) 


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
app.config['SQLALCHEMY_BINDS'] = {
    'user_db': 'mysql+pymysql://mysql:mysql@db:3306/Userdate_db',
    'info_db': 'mysql+pymysql://mysql:mysql@db:3306/Info_db',
    'oldroom_db': 'mysql+pymysql://mysql:mysql@db:3306/OldRoom_db',
    'room_db': 'mysql+pymysql://mysql:mysql@db:3306/Room_db',
    'message_db': 'mysql+pymysql://mysql:mysql@db:3306/Message_db'
}
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ユーザー情報
class User(db.Model):
    __bind_key__ = 'user_db'
    __tablename__ = 'user'  # 明示的にテーブル名を指定
    user_id = db.Column(db.String(10), primary_key=True)  # ID
    user_name = db.Column(db.String(10), nullable=False)  # 名前
    user_pass = db.Column(db.String(20), nullable=False)  # パスワード

# マッチング待機中に開かれているルーム情報を記録する。
class Matching_info(db.Model):
    __bind_key__ = 'info_db'
    room_name = db.Column(db.String(6), primary_key=True)  # 時間を文字列として保存する。Roomのテーブル名になる。
    number = db.Column(db.Integer, nullable=False, default=0)

# 各ルームモデル、チャットルームのメンバ情報、ルームナンバを保持する。
class Room(db.Model):
    __bind_key__ = 'room_db'
    room_name = db.Column(db.String(6), primary_key=True) 
    user_id0 = db.Column(db.String(10), db.ForeignKey('user.user_id'), nullable=False)  # 1番目はルームマスターとして扱う
    user_id1 = db.Column(db.String(10), db.ForeignKey('user.user_id'), nullable=True)
    user_id2 = db.Column(db.String(10), db.ForeignKey('user.user_id'), nullable=True)
    user_id3 = db.Column(db.String(10), db.ForeignKey('user.user_id'), nullable=True)
    user_id4 = db.Column(db.String(10), db.ForeignKey('user.user_id'), nullable=True)
    room_theme = db.Column(db.String(10), nullable=True)
    start_chat_time = db.Column(db.String(6), nullable=False)  # 5人全員集まった際にその時間を記録する（文字列）
    end_chat_time = db.Column(db.String(6), nullable=False)  # チャット終了予定時刻を記録する。（文字列）

# メッセージモデル
class Message(db.Model):  # メッセージ情報を記録する。各ユーザーはinfo.dbのcreate_timeを基にテーブルにアクセスする
    __bind_key__ = 'message_db'
    id = db.Column(db.Integer, primary_key=True)  # メッセージの順番に使用する。
    user_id = db.Column(db.String(15), nullable=False)  # 誰がそのメッセージを話したかを判別する
    message = db.Column(db.String(100), nullable=False)  # メッセージデータ

class OldRoom(db.Model):  # Roomの過去情報を記録する。
    __bind_key__ = 'oldroom_db'
    room_name = db.Column(db.String(6), primary_key=True) 
    user_id0 = db.Column(db.String(10), db.ForeignKey('user.user_id'), nullable=False)  # 1番目はルームマスターとして扱う
    user_id1 = db.Column(db.String(10), db.ForeignKey('user.user_id'), nullable=True)
    user_id2 = db.Column(db.String(10), db.ForeignKey('user.user_id'), nullable=True)
    user_id3 = db.Column(db.String(10), db.ForeignKey('user.user_id'), nullable=True)
    user_id4 = db.Column(db.String(10), db.ForeignKey('user.user_id'), nullable=True)
    room_theme = db.Column(db.String(10), nullable=True)
    start_chat_time = db.Column(db.String(6), nullable=False)  # 5人全員集まった際にその時間を記録する（文字列）
    end_chat_time = db.Column(db.String(6), nullable=False)  # チャット終了予定時刻を記録する。（文字列）

#############各データベース データ追加用関数だよ######################

def add_user(user_id, user_name, user_pass):
    new_user = User(user_id=user_id, user_name=user_name, user_pass=user_pass)
    with app.app_context():
        db.session.add(new_user)
        db.session.commit()
    return "User added successfully."

def add_matching_info(room_name, number):
    new_info = Matching_info(room_name=room_name, number=number)
    with app.app_context():
        db.session.add(new_info)
        db.session.commit()
    return "Matching info added successfully."

def add_room(room_name, user_id0, user_id1=None, user_id2=None, user_id3=None, user_id4=None, room_theme=None, start_chat_time=None, end_chat_time=None):
    new_room = Room(room_name=room_name, user_id0=user_id0, user_id1=user_id1, user_id2=user_id2, user_id3=user_id3, user_id4=user_id4, room_theme=room_theme, start_chat_time=start_chat_time, end_chat_time=end_chat_time)
    with app.app_context():
        db.session.add(new_room)
        db.session.commit()
    return "Room added successfully."

def add_message(user_id, message):
    new_message = Message(user_id=user_id, message=message)
    with app.app_context():
        db.session.add(new_message)
        db.session.commit()
    return "Message added successfully."

def add_old_room(room_name, user_id0, user_id1=None, user_id2=None, user_id3=None, user_id4=None, room_theme=None, start_chat_time=None, end_chat_time=None):
    new_old_room = OldRoom(room_name=room_name, user_id0=user_id0, user_id1=user_id1, user_id2=user_id2, user_id3=user_id3, user_id4=user_id4, room_theme=room_theme, start_chat_time=start_chat_time, end_chat_time=end_chat_time)
    with app.app_context():
        db.session.add(new_old_room)
        db.session.commit()
    return "Old room added successfully."

#############各データベース データ削除用関数だよ######################

def delete_user(user_id):
    with app.app_context():
        user_to_delete = User.query.filter_by(user_id=user_id).first()
        if user_to_delete:
            db.session.delete(user_to_delete)
            db.session.commit()
            return "User deleted successfully."
        else:
            return "User not found."

def delete_matching_info(room_name):
    with app.app_context():
        info_to_delete = Matching_info.query.filter_by(room_name=room_name).first()
        if info_to_delete:
            db.session.delete(info_to_delete)
            db.session.commit()
            return "Matching info deleted successfully."
        else:
            return "Matching info not found."

def delete_room(room_name):
    with app.app_context():
        room_to_delete = Room.query.filter_by(room_name=room_name).first()
        if room_to_delete:
            db.session.delete(room_to_delete)
            db.session.commit()
            return "Room deleted successfully."
        else:
            return "Room not found."

def delete_message(message_id):
    with app.app_context():
        message_to_delete = Message.query.filter_by(id=message_id).first()
        if message_to_delete:
            db.session.delete(message_to_delete)
            db.session.commit()
            return "Message deleted successfully."
        else:
            return "Message not found."
        
        
def delete_old_room(room_name):
    with app.app_context():
        old_room_to_delete = OldRoom.query.filter_by(room_name=room_name).first()
        if old_room_to_delete:
            db.session.delete(old_room_to_delete)
            db.session.commit()
            return "Old room deleted successfully."
        else:
            return "Old room not found."


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

@app.route('/debug_createUser/<user_id>/<user_name>/<user_pass>')
def add_User_route(user_id,user_name,user_pass):
    return add_user(user_id,user_name,user_pass)

@app.route('/debug_deleteUser/<user_id>')
def deleteUser_route(user_id):
    return delete_user(user_id)

@app.route('/debug_addMatchingInfo/<room_name>/<int:number>')
def add_matching_info_route(room_name, number):
    return add_matching_info(room_name, number)
    
@app.route('/debug_deleteMatchingInfo/<room_name>')
def delete_matching_info_route(room_name):
    return delete_matching_info(room_name)

@app.route('/debug_addRoom/<room_name>/<user_id0>')
def add_room_route(room_name, user_id0):
    return add_room(room_name, user_id0)

@app.route('/debug_deleteRoom/<room_name>')
def delete_room_route(room_name):
    return delete_room(room_name)

@app.route('/debug_addMessage/<user_id>/<message>')
def add_message_route(user_id, message):
    return add_message(user_id, message)

@app.route('/debug_deleteMessage/<int:message_id>')
def delete_message_route(message_id):
    return delete_message(message_id)

@app.route('/debug_addOldRoom/<room_name>/<user_id0>')
def add_old_room_route(room_name, user_id0):
    return add_old_room(room_name, user_id0)

@app.route('/debug_deleteOldRoom/<room_name>')
def delete_old_room_route(room_name):
    return delete_old_room(room_name)
###########################必要な関数をメモするよ

#ROOMデータベースのroom_nameを引数として、そのroom_nameのすべての内容をoldRoomへ情報をコピーする関数。
#引数 room_name(おそらく)

#Infoデータベースが空かどうかを判別する関数。
#引数Infoデータベース

#Roomデータベースに新たな



#メッセージ テーブルに変更が加わったかどうかを判断する関数(データベースではなく指定のテーブル)
#引数 messageデータベースのテーブル名



###########################デバッグ用じゃないよ######################################

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

if __name__ == "__main__":
     
     app.run(debug=True)
     #create_db()
     
