from app import *

app = Flask(__name__)
CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#ログイン
@app.route('/login',methods=['POST'])
def login():
     login_data = request.get_json()
     get_user_id = login_data['user_id']
     password = login_data['user_pass']

     user = user.query.filter(user_id==get_user_id).first()
     #ユーザidとパスを確認
     if user and check_password_hash(user.password,password):
        
        return jsonify({'flag':'true'})
        
     else:
          return jsonify({'flag':'false'})
       

#アカウントの新規作成
@app.route("/signup",methods=['POST'])
def signup():
     name = request.form.get('user_name')
     user_id1 = request.form.get('user_id')
     password1 = request.form.get('password')

     catch_user_id = user.query.filter(user_id == user_id1)
     catch_password = user.query.filter(password == password1)
     if user.query(catch_user_id.exists()).scalar() and user.query(catch_password.exists()).scalar():

          return jsonify({'flag':'false'})
     else:
          #パスワードをハッシュ化
          hash_password = generate_password_hash(password1,method='pbkdf2:sha256',salt_length=16)
          new_user = user(user_name=name,user_id=user_id1,password=hash_password)
          db.session.add(new_user)
          db.session.commit()

          return jsonify({'flag':'true'})


@app.route("/get_userName",methods=['POST'])
def get_userName():
     id = request.form.get('user_id')

     name = user.query.filter(user.user_id==id).all()

     return jsonify({'user_name':name.user_id})
