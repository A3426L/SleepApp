from app import *

app = Flask(__name__)
CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


@app.route('/chat',methods=['POST'])
def chat():
     get_id = request.form.get('id')
     get_user_id = request.form.get('user_id')

     
     #メッセージ
     current_message = message.query.filter_by(message.id > get_id,message.user_id==get_user_id).all()
     current_name = user.query(user.user_name)

    
     return jsonify({'id':current_message.id,'messages':current_message.user_id,'user_id':current_message.message,'name':current_name})

#ユーザーがメッセージを送信した時の処理
@app.route('/send_message',methods=['POST'])
def send_message():
          user_id_content = request.form.get('user_id')
          message_content = request.form.get('messages')         

          #メッセージを保存
          message = message(user_id=user_id_content,message=message_content)
          db.session.add(message)
          db.session.commit()
          
          return jsonify({'flag':'true'})

@app.route('/theme_first',methods=['POST'])
def theme_first():
       theme0 = request.form.get('theme')

       theme = Room(theme=theme0)
       db.session.add(theme)
       db.session.commit()

       return jsonify({'flag':'true'})

@app.route('/theme',methods=['POST'])
def theme():
       user_id = request.form('user_id')

       room = Room(user_id=user_id)
       
       return jsonify({'thme':Room.theme})

if __name__ == "__main__":
     
     app.run(debug=True)