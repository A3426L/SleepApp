from flask import Flask , jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text 
from flask_cors import CORS


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
    
@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({
        "messages": [
            {
                "text": "Final message",
                "id": "4"
            },
            {
                "text": "Another message",
                "id": "3"
            },
            {
                "text": "Yet another message",
                "id": "1"
            },
            {
                "text": "Hello from Flask!",
                "id": "2"
            }
        ],
    })

@app.route('/api/data/post', methods=['POST'])
def post_data():
     # POSTリクエストのボディからJSONデータを取得
    data = request.json
    # 取得したデータをそのまま返す
    return jsonify(data)

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