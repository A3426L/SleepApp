from app import *

app = Flask(__name__)
CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


@app.route('/chat',methods=['POST'])
def chat():
     get_chat = request.get_json()
     get_id = get_chat['id']
     get_user_id = get_chat['user_id']

     if get_id and get_user_id:
       #メッセージ
       current_message = message.query.filter(
                     and_(
                         message.id > get_id,
                         message.user_id==get_user_id
                     )
       ).all()
       current_name = user.query(user.user_name)
    
       return jsonify({'id':current_message.id,'messages':current_message.user_id,'user_id':current_message.message,'name':current_name})

     else:
           return jsonify({'flag':'false'})
     
#ユーザーがメッセージを送信した時の処理
@app.route('/message',methods=['POST'])
def message():
          send_message = request.get_json()
          content_user_id = send_message['user_id']
          content_message = send_message['messages']         

          #メッセージを保存
          Message = message(user_id=content_user_id,message=content_message)
          db.session.add(Message)
          db.session.commit()
          
          return jsonify({'flag':'true'})

@app.route('/theme_first',methods=['POST'])
def theme_first():
       get_theme = request.get_json()
       theme0 = get_theme('theme')

       Theme = Room(theme=theme0)
       db.session.add(Theme)
       db.session.commit()

       return jsonify({'flag':'true'})

@app.route('/theme',methods=['POST'])
def theme():
       post_theme = request.get_json()
       user_id0 = post_theme('user_id')

       room = Room.query.filter(user_id=user_id0).all()
       
       return jsonify({'theme':room.theme})

if __name__ == "__main__":
     
     app.run(debug=True)