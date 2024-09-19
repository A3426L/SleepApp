from flask import Flask , jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text 
from flask_cors import CORS
from datetime import datetime, timedelta


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route('/')
def hello():
     return "Hello World!"

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
    
@app.route('/testpost', methods=['POST'])
def testpost():
    data = request.get_json()
    if 'user_id' in data:
        return jsonify({"postView_group":[
    {
        "id" : "1",
        "user_name": "sample",
        "theme":   "sample",
        "post_txt": "sample"
    },
    {
        "id" : "2",
        "user_name": "sample2",
        "theme":   "sample2",
        "post_txt": "sample2"
    }
]}) 
    else:
        return jsonify({"error": "user_id not provided"}), 400
    
@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({
        "messages": [
          {
               "text": "Hello from Flask!",
               "msg_id": "1",
               "user_id": "3"
          },
          {
               "text": "Another message",
               "msg_id": "2",
               "user_id": "1"
          },
          {
               "text": "Yet another message",
               "msg_id": "3",
               "user_id": "2"
          },
          {
               "text": "Final message",
               "msg_id": "4",
               "user_id": "4"
          },
        ],
    })

@app.route('/api/data/post', methods=['POST'])
def post_data():
     # POSTリクエストのボディからJSONデータを取得
    data = request.json
    # 取得したデータをそのまま返す
    return jsonify(data)

@app.route('/chat_start', methods=['GET'])
def get_endtime():
    # 固定された開始時刻と終了時刻を設定（JSTのISOフォーマット）
    fixed_start_time = "2024-09-19T13:00:00+09:00"  # 固定された開始時刻
    fixed_end_time = "2024-09-19T14:08:00+09:00"    # 固定された終了時刻
    
    # 開始時刻と終了時刻をJSONで返す
    return jsonify({'user_id0': "1",'startTime': fixed_start_time, 'endTime': fixed_end_time})

# リーダーかどうかを判断
@app.route('/api/leader', methods=['POST'])
def post_leader():
    # POSTリクエストからJSONデータを取得
    data = request.json

    # 'value'キーがリクエストボディに存在するか確認
    if 'value' in data:
        # 'value'の値が1の場合は1を返す
        if data['value'] == 1:
            return jsonify({'result': 1})
        else:
            return jsonify({'result': 0})
    else:
        # 'value'キーが存在しない場合はエラーメッセージを返す
        return jsonify({'error': 'Missing "value" in request'}), 400

#タイトル受け取る
@app.route('/api/title', methods=['POST'])
def post_and_return():
    # POSTリクエストからJSONデータを取得
    data = request.json

    # 受け取ったデータをそのまま返す
    return jsonify(data)

#タイトル受け取る
@app.route('/api/title_test', methods=['POST'])
def post_title_test():
    # POSTリクエストからJSONデータを取得
    data = request.json

    # 受け取ったデータをそのまま返す
    return jsonify({'title': "画面遷移だよん!"})

#タイトル受け取る
@app.route('/api/test_post', methods=['POST'])
def teat_post():
    # POSTリクエストからJSONデータを取得
    data = request.json

    # 受け取ったデータをそのまま返す
    return jsonify(data)

@app.route('/matching', methods=['POST'])
def matching():
     # POSTリクエストのボディからJSONデータを取得
    data = request.json
    # 取得したデータをそのまま返す
    return jsonify({'flag': "true"})

@app.route('/matching_start', methods=['POST'])
def matching_start():
     # POSTリクエストのボディからJSONデータを取得
    data = request.json
    # 取得したデータをそのまま返す
    return jsonify({'flag': "true"})



if __name__ == "__main__":
     app.run(debug=True)
     
#      from flask import Flask
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)

# # データベース URI を直接設定
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), nullable=False)

# def create_db():
#     """Create the database tables."""
#     with app.app_context():
#         db.create_all()
#         print("Database tables created.")

# if __name__ == '__main__':
#     create_db()
#     app.run(debug=True)