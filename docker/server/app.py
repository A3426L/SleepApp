from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import text 

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

@app.route('/')
def hello():
	return "Hello World!"

@app.route('/check-db')
def check_db():
    try:
        # テキスト形式でSQLを実行
        result = db.session.execute(text('SELECT 1')).scalar()
        if result == 1:
            return "Database connection successful!", 200
        else:
            return "Database connection failed!", 500
    except Exception as e:
        return str(e), 500

if __name__ == "__main__":
	app.run(debug=True)
