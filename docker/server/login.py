from app import *

app = Flask(__name__)
CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#ログイン(後で編集する)
@app.route('/login',methods=['POST'])
def login():
     user_id = request.form.get('user_id')
     password = request.form.get('userpass')

     user = user.query.filter(user.user_id==user_id).first()
     #ユーザidとパスを確認
     if user and check_password_hash(user.userpass,password):
        
        return jsonify({'flag':'true'})
        
     else:
          return jsonify({'flag':'false'})
       

#アカウントの新規作成
@app.route("/signup",methods=['POST'])
def signup():
     name = request.form.get('user_name')
     user_id = request.form.get('user_id')
     password = request.form.get('password')

     #パスワードをハッシュ化
     hash_password = generate_password_hash(password,method='pbkdf2:sha256',salt_length=16)
     new_user = user(user_name=name,user_id=user_id,password=hash_password)
     db.session.add(new_user)
     db.session.commit()

     return jsonify({'flag':'true'})


@app.route("/get_userName",methods=['POST'])
def get_userName():
     id = request.form.get('user_id')

     name = user.query.filter(user.user_id==id)

     return jsonify({'user_name':name.user_id})
