from flask import Flask , jsonify , request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text , or_
from flask_cors import CORS

from datetime import datetime as dt


app = Flask(__name__)
CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


##############-test-########################

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class User2(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

@app.route('/')
def hello():
     return "Hello World!"

@app.route('/createdb')
def create_db():
    """Create the database tables."""
    with app.app_context():
        db.create_all()
        return "Database tables created."

@app.route('/add-user-test', methods=['GET'])
def add_user_test():
    id = "2"
    name = "ううう"
    new_user = User(id=id, name=name)
    with app.app_context():
        db.session.add(new_user)
        db.session.commit()
    return "Add data succusess."


@app.route('/testpost', methods=['POST'])
def testpost():
    data = request.get_json() 
    if 'user_id' in data:
        return jsonify({"received_user_id": data['user_id']}) 
    else:
        return jsonify({"error": "user_id not provided"}), 400
    

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

######################################################

class Old(db.Model):
    __tablename__ = 'old' 

    room_name = db.Column(db.String(50), primary_key=True)
    user_id0 = db.Column(db.String(50), nullable=True)
    user_id1 = db.Column(db.String(50), nullable=True)
    user_id2 = db.Column(db.String(50), nullable=True)
    user_id3 = db.Column(db.String(50), nullable=True)
    user_id4 = db.Column(db.String(50), nullable=True)
    end_time = db.Column(db.DateTime, nullable=True)
    theme = db.Column(db.String(50))

class Post(db.Model):
    __tablename__ = 'post'

    id = db.Column(db.Integer, primary_key=True)
    room_name = db.Column(db.String(50))
    user_id = db.Column(db.String(50), nullable=False)
    theme = db.Column(db.String(50), nullable=True)
    post_txt = db.Column(db.Text, nullable=True)



def format_datetime_to_string(dt_obj):
    return dt_obj.strftime('%Y%m%d%H%M%S%f')


@app.route('/date')
def get_current_datetime():
    datetime = dt.now()
    strdatatime = format_datetime_to_string(datetime)
    return strdatatime


@app.route('/postView_group',methods=['POST'])
def postView_group():
    data = request.get_json()
    user_id = data['user_id']
    old_results = Old.query.filter(
        or_(
            Old.user_id0 == user_id,
            Old.user_id1 == user_id,
            Old.user_id2 == user_id,
            Old.user_id3 == user_id,
            Old.user_id4 == user_id
        )
    ).order_by(Old.end_time.desc()).all()
    if old_results:
        latest_old = old_results[0]
        latest_room_name = latest_old.room_name,
        # old_list = {
        #         "room_name": latest_old.room_name,
        #         "user_id0": latest_old.user_id0,
        #         "user_id1": latest_old.user_id1,
        #         "user_id2": latest_old.user_id2,
        #         "user_id3": latest_old.user_id3,
        #         "user_id4": latest_old.user_id4,
        #         "end_time": latest_old.end_time
        #     } 
    else:
        old_list = {}
    posts = Post.query.filter_by(room_name=latest_room_name).all()
    post_list = [
        {
            "id": post.id,
            "user_name": post.user_id,
            "theme": post.theme,
            "post_txt": post.post_txt
        }
        for post in posts
    ]
    return jsonify(post_list)


@app.route('/postView_all')
def postView_all():
    posts = Post.query.limit(20).all()
    post_list = [
        {
            "id": post.id,
            "user_name": post.user_id,
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
    old_results = Old.query.filter(
        or_(
            Old.user_id0 == user_id,
            Old.user_id1 == user_id,
            Old.user_id2 == user_id,
            Old.user_id3 == user_id,
            Old.user_id4 == user_id
        )
    ).order_by(Old.end_time.desc()).all()
    if old_results:
        latest_old = old_results[0]
        latest_room_name = latest_old.theme
    else:
        old_list = {}

    return latest_room_name

@app.route('/post',methods=['POST'])
def post():
    try:
        data = request.get_json()
        user_id = data['user_id']
        post_txt = data['post_txt']

        #db書き込み
        new_post = Post(user_id=user_id, post_txt=post_txt)
        db.session.add(new_post)
        db.session.commit()

        return jsonify({"flag":"true"})
    
    except Exception:
        # エラーが発生した場合
        return jsonify({"flag":"false"}), 500




if __name__ == "__main__":
     
     app.run(debug=True)
     #create_db()




     
