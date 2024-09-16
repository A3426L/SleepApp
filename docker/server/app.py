from flask import Flask , jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text 
from flask_cors import CORS


app = Flask(__name__)
CORS(app) 
#test
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

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
     
