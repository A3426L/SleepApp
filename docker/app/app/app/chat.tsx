//ip変更場所6個

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, ImageBackground, Animated, TouchableOpacity, Alert } from 'react-native';
import { GiftedChat, IMessage, Send, InputToolbar, Bubble, Time } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Link, usePathname, useRouter, useFocusEffect } from 'expo-router';
import axios from 'axios';
import { useGlobalContext } from './GlobalContext';
import ChangeDate from '../components/ChangeDate';

const home_image = require("@/assets/images/chat_image.png");

export const App: React.FC = () => {
  const router = useRouter();
  const { userIdglobal, setUserIdglobal } = useGlobalContext();
  const [msg, setMsg] = useState<IMessage[]>([]);
  const topInputRef = useRef<TextInput>(null);
  const bottomInputRef = useRef<TextInput>(null);
  const [result, setResult] = useState(null); //リーダーかどうかを0,1で格納
  const leaderRun = useRef(false);
  const [title, setTitle] = useState(''); //titleを格納
  const [isEditable, setIsEditable] = useState(false); // 編集可能かどうかの状態
  const previousMessagesRef = useRef<IMessage[]>([]); // 型を明示的に指定
  const [newMsgId, setNewMsgId] = useState<Number>(0);

  useEffect(() => {
    // メッセージを取得する関数
    const fetchMessages = async () => {
      try {
        const response = await axios.post('http://172.16.42.21/api/chat', {
            user_id: userIdglobal,
            id: newMsgId
        });

        if (response.data.flag === 'false') {
          console.log('No new messages');
          return;
        }

        // メッセージを逆順に並び替える
        const reversedMessages = response.data.messages.reverse();
        const fetchedMessages = reversedMessages.map((msg: any) => {
            const isUserMessage = userIdglobal === msg.user_id;

            return {
                text: msg.messages,
                _id: msg.id,
                createdAt: new Date(),
                user: {
                    _id: isUserMessage ? 1 : msg.user_id,
                    name: 'developer',
                    avatar: 'https://png.pngtree.com/png-clipart/20191122/original/pngtree-user-icon-isolated-on-abstract-background-png-image_5192004.jpg',
                },
            };
        });

        const previousMessages = previousMessagesRef.current;
        const newMessages = fetchedMessages.filter((message: IMessage) => 
            !previousMessages.some((prev) => prev._id === message._id)
        );

        if (newMessages.length > 0) {
            setMsg((previousMessages) => [...previousMessages, ...newMessages]);

            const lastNewMessage = newMessages[newMessages.length - 1];
            setNewMsgId(lastNewMessage._id);
        }

        previousMessagesRef.current = [...previousMessagesRef.current, ...newMessages];
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // 1秒ごとにfetchMessagesを実行
    const intervalId = setInterval(fetchMessages, 1000);

    // コンポーネントがアンマウントされたときにインターバルをクリア
    return () => clearInterval(intervalId);
}, []);

  // useEffect(() => {
  //   console.log('Messages:', msg); // msgの中身を表示
  // }, [msg]); // msgが変更されたら実行

    // コンポーネントがマウントされた際にPOSTリクエストを送信
  // const checkLeader = async () => {
  //   try {
  //     const response = await axios.post('http://172.16.42.21/api/leader', {
  //       value: 1  // ここでPOSTするデータを指定（例: valueが1の場合）
  //     });
  //     // レスポンスデータを確認して編集可能状態を設定
  //     if (response.data.result === 1) {
  //       setIsEditable(true); // リーダーの場合
  //     } else {
  //       setIsEditable(false); // リーダーでない場合
  //     }
  //     // レスポンスデータを結果として保存
  //     setResult(response.data.result);
  //     console.log(response.data.result);
  //   } catch (err) {
  //     // エラーが発生した場合はエラーメッセージを保存
  //     console.error('Error fetching messages:', err);
  //   }
  // };

  const onSend = (messages: IMessage[] = []) => {
    // メッセージをGiftedChatの状態に追加
    setMsg((previousMessages) => GiftedChat.append(previousMessages, messages));

    // 送信したメッセージの内容を取り出す（最初のメッセージを対象）
    const messageText = messages[0].text;
  
    if(messages.length > 0){
      // メッセージをPOSTリクエストでサーバーに送信
      const messageData = messages[0];
      console.log('送信するメッセージデータ:', messageData);
    
      axios.post('http://172.16.42.21/api/get_message', 
        { 
          message_txt:  messageData.text,
          user_id: userIdglobal
        },  // メッセージデータをサーバーに送信
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  };

  //下部のテキストボックスのフォーカスを解除するためのコンポーネント
  const handleTopInputFocus = () => {
    if (bottomInputRef.current) {
      bottomInputRef.current.blur(); // 下部のテキストボックスのフォーカスを解除
    }
  };

  //メッセージの吹き出しの色を変更するためのコンポーネント
  const renderBubble = (props: any) => {
    const { currentMessage } = props;

    return (
      <View>
        {/* ユーザーIDを表示する部分 */}
        <Text style={styles.userId}>{currentMessage.user._id}</Text>
        {/* Bubble コンポーネント */}
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#4b58c8', // 相手の吹き出しの色
            },
            right: {
              backgroundColor: '#e1e1e1', // 自分の吹き出しの色
            },
          }}
          textStyle={{
            left: {
              color: '#ffffff', // 相手のテキストの色
            },
            right: {
              color: '#000000', // 自分のテキストの色
            },
          }}
        />
      </View>
    );
  };

  //チャットの時刻表示の色を変更するためのコンポーネント
  const renderTime = (props: any) => (
    <Time
      {...props}
      timeTextStyle={{
        left: {
          color: '#ffffff', // 相手の時間表示の色
        },
        right: {
          color: '#000000', // 自分の時間表示の色
        },
      }}
    />
  );

  //タイトルを変更した際その中身を格納するためのコンポーネント
  const handleTextChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  // カーソルが離れた際に呼ばれる関数
  const handleBlur = async () => {
    if (title.trim() !== '') {
      try {
        const response = await axios.post('http://172.16.42.21/api/change_theme', {
          theme_txt: title,
          user_id: userIdglobal
        });

        // レスポンスの処理
        console.log('API Response:', response.data);
        Alert.alert('Success', 'Text has been posted successfully!');
      } catch (error) {
        console.error('Error posting text:', error);
        Alert.alert('Error', 'Failed to post text.');
      }
    }
  }

  // プログレスバー
  const ProgressBar = () => {
    const widthAnim = useRef(new Animated.Value(0)).current;

    // const startProgressBar = useCallback(async (totalDuration: number, elapsedTime: number, end: number, current: number) => {
    //   if (totalDuration > 0) {
    //     // プログレスバーの幅を計算
    //     const progress = (elapsedTime / totalDuration) * 100;
    //     widthAnim.setValue(progress);

    //     // プログレスバーが終了したときに画面遷移を実行
    //     Animated.timing(widthAnim, {
    //       toValue: 100,
    //       duration: end - current,
    //       useNativeDriver: false,
    //     }).start(({finished}) => {
    //       if (finished) {
    //         // アニメーションが正常に終了した場合にのみ実行される
    //         console.log("アニメーション終了");
    //         // ここに画面遷移などの処理を追加
    //         router.navigate({pathname:'/title_page'}); // 例: react-routerを使用した画面遷移
    //       }
    //     });
    //   }
    // }, [widthAnim]);

    const fetchDataAndStartProgress = async () => {
      try {
        const response = await axios.post('http://172.16.42.21/chat_start',{
          user_id: userIdglobal,
        });
        const now = new Date().getTime();
        const start = new Date(ChangeDate(response.data.start_time)).getTime();
        const end = new Date(ChangeDate(response.data.end_time)).getTime();
        console.log("aaaaaaaaaaa",end);
        //リーダーかの判断
        if (response.data.user_id0 === "1") {
          setIsEditable(true); // リーダーの場合
          console.log("リーダーーーーーーーー");
        } else {
          setIsEditable(false); // リーダーでない場合
          console.log("あーーーーーーーーーーー");
        }

        // 現在時刻が開始時刻より前の場合は開始時刻に設定
        const current = Math.max(now, start);
        const totalDuration = end - start;
        const elapsedTime = current - start;

        console.log('サーバーからの開始時刻（JST）:', start);
        console.log('サーバーからの終了時刻（JST）:', end);
        console.log('クライアントの現在時刻:', new Date());

        // プログレスバーを開始
        // startProgressBar(totalDuration, elapsedTime, end, current);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAndStartProgress(); // 非同期関数を呼び出す

    return (
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    );
  };


  const test = () => {
    // axios.post('http://172.16.42.21/randam_theme',{
    //   user_id: userIdglobal,
    // })
    //   .then(random_theme => {
    //     console.log(random_theme.data.theme);
    //   })
    //   .catch(error => console.error("error", error));
    // const newUserId = '2'; // ここに設定したい値を設定
    // setUserIdglobal(newUserId);
  };

  return (
    <View style={styles.outWrapper}>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.safeAreaWrapper}>
        <View style={styles.container}>
          {/* ///////////////////////////////////////////////////////////////////// */}
          <View style={styles.backHomeButton}>
            <Link href={"/(tabs)/home"} asChild>
              <TouchableOpacity style={styles.backButton}>
                <Icon name="arrow-back" size={30} color="white" />
              </TouchableOpacity>
            </Link>
            <ProgressBar />
          </View>
          {/* ///////////////////////////////////////////////////////////////////////// */}
          
          <View style={styles.chatContainer}>
            <ImageBackground source={home_image} style={styles.HomeImage}>
              <View style={styles.topInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="お題"
                  ref={topInputRef}
                  onFocus={handleTopInputFocus} // フォーカスイベントを処理
                  onChangeText={handleTextChange} // テキスト変更を処理
                  onBlur={handleBlur} // フォーカスが外れたときに処理
                  editable={isEditable} // 編集可能/不可を制御
                />
                <TouchableOpacity style={styles.randomButton} onPress={test}>
                  <Icon name="casino" size={30} color="black" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <GiftedChat
                messages={msg}
                placeholder="メッセージを入力"
                onSend={(messages) => onSend(messages)}
                user={{
                  _id: 1,
                }}
                renderSend={(props) => <CustomSend {...props} />}
                renderInputToolbar={(props) => <CustomInputToolbar {...props} />}
                renderBubble={renderBubble}
                renderTime={renderTime}
                alwaysShowSend={true}
                keyboardShouldPersistTaps='handled'
              />
            </ImageBackground>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default App;

// カスタム送信ボタンを forwardRef でラップする
const CustomSend = React.forwardRef((props: any, ref: any) => (
  <Send {...props} ref={ref}>
    <View style={styles.sendButton}>
      <Icon name="send" size={24} color="#000000" />
    </View>
  </Send>
));

// カスタム入力ツールバー
const CustomInputToolbar = (props: any) => (
  <InputToolbar
    {...props}
    containerStyle={styles.inputToolbar} // スタイルを適用
    textInputProps={{
      ref: props.bottomInputRef, // ここで ref を渡す
    }}
  />
);

// スタイルシート
const styles = StyleSheet.create({
  outWrapper: {
    flex: 1
  },
  topSafeArea: {
    backgroundColor: '#4b58c8'
  },
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: '#001125'
  },
  container: {
    flex: 1,
    backgroundColor: '#4b58c8', // 画面全体の背景色
  },
  topInputContainer: {
    backgroundColor: '#4b58c8',
    flexDirection: 'row',  // 横に並べる
    borderBottomLeftRadius: 15,  // 下部左の角を丸くする
    borderBottomRightRadius: 15, // 下部右の角を丸くする
    paddingTop: 0,
    paddingBottom: 20,
  },
  textInput: {
    backgroundColor: '#ffffff',
    flex:1,
    textAlign: 'center',
    borderRadius: 4,
    padding: 10,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 30,
    paddingRight: 50, // ボタン分のスペースを確保
    paddingLeft: 50,
  },
  userId: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 7,
    marginLeft: 10
  },
  sendButton: {
    backgroundColor: "transparent",
    padding: 8,
    marginBottom: 4,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backHomeButton:{
    backgroundColor: '#4b58c8',
    flexDirection: 'row',  // 横に並べる
    height: 30,
  },
  inputToolbar: {
    backgroundColor: '#e1e1e1', // テキスト入力ボックスの背景色
    borderRadius: 50,
    paddingTop: 0,    // 上部の内側の余白を調整
    paddingBottom: 0,  // 下部の内側の余白を減らし、背景を見せる
    marginBottom: 0,
  },
  progressBarBackground: {
    flex:1,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginLeft: 15,
    marginRight: 20,
    marginTop: 17,
    marginBottom:0
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#38b26d',
  },
  chatContainer: {
    flex: 1,  // Chatエリアを拡張
    backgroundColor: '#001125',  // ここでGiftedChatの背景色を設定
  },
  backButton: {
    marginTop:3,
    marginLeft: 20,
    marginRight: 0,
    width: 25, // ボタンの幅を小さめに設定
  },
  HomeImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: 'flex-end', // 画像の下部に配置
  },
  randomButton: {
    position: 'absolute', // テキストボックス内に配置
    right: 30, // テキストボックスの右からの距離
    top: 41, // テキストボックスの中央に縦に配置
    transform: [{ translateY: -15 }], // ボタンを中央に合わせる
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  randomButtonText: {
    color: 'white',
    fontSize: 16,
  },
  icon: {
    transform: [{ rotate: '20deg' }], // アイコンを90度回転
  },
});



// from flask import Flask , jsonify, request
// from flask_sqlalchemy import SQLAlchemy
// from flask_migrate import Migrate
// from sqlalchemy import text 
// from flask_cors import CORS
// from datetime import datetime, timedelta


// app = Flask(__name__)
// CORS(app)

// app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
// app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

// db = SQLAlchemy(app)

// @app.route('/')
// def hello():
//      return "Hello World!"

// @app.route('/check-db')
// def check_db():
//     try:
//         result = db.session.execute(text('SELECT 1')).scalar()
//         if result == 1:
//             return "Database connection successful!", 200
//         else:
//             return "Database connection failed!", 500
//     except Exception as e:
//         return str(e), 500
    
// @app.route('/testpost', methods=['POST'])
// def testpost():
//     data = request.get_json()
//     if 'user_id' in data:
//         return jsonify({"postView_group":[
//     {
//         "id" : "1",
//         "user_name": "sample",
//         "theme":   "sample",
//         "post_txt": "sample"
//     },
//     {
//         "id" : "2",
//         "user_name": "sample2",
//         "theme":   "sample2",
//         "post_txt": "sample2"
//     }
// ]}) 
//     else:
//         return jsonify({"error": "user_id not provided"}), 400
    
// @app.route('/api/data', methods=['GET'])
// def get_data():
//     return jsonify({
//         "messages": [
//           {
//                "text": "Hello from Flask!",
//                "msg_id": "1",
//                "user_id": "3"
//           },
//           {
//                "text": "Another message",
//                "msg_id": "2",
//                "user_id": "1"
//           },
//           {
//                "text": "Yet another message",
//                "msg_id": "3",
//                "user_id": "2"
//           },
//           {
//                "text": "Final message",
//                "msg_id": "4",
//                "user_id": "4"
//           },
//         ],
//     })

// @app.route('/api/data/post', methods=['POST'])
// def post_data():
//      # POSTリクエストのボディからJSONデータを取得
//     data = request.json
//     # 取得したデータをそのまま返す
//     return jsonify(data)

// @app.route('/chat_start', methods=['POST'])
// def get_endtime():
//     # 固定された開始時刻と終了時刻を設定（JSTのISOフォーマット）
//     fixed_start_time = "20240919140000"  # 固定された開始時刻
//     fixed_end_time = "20240919163000"    # 固定された終了時刻
    
//     # 開始時刻と終了時刻をJSONで返す
//     return jsonify({'user_id0': "1",'startTime': fixed_start_time, 'endTime': fixed_end_time})

// # リーダーかどうかを判断
// @app.route('/api/leader', methods=['POST'])
// def post_leader():
//     # POSTリクエストからJSONデータを取得
//     data = request.json

//     # 'value'キーがリクエストボディに存在するか確認
//     if 'value' in data:
//         # 'value'の値が1の場合は1を返す
//         if data['value'] == 1:
//             return jsonify({'result': 1})
//         else:
//             return jsonify({'result': 0})
//     else:
//         # 'value'キーが存在しない場合はエラーメッセージを返す
//         return jsonify({'error': 'Missing "value" in request'}), 400

// #タイトル受け取る
// @app.route('/api/title', methods=['POST'])
// def post_and_return():
//     # POSTリクエストからJSONデータを取得
//     data = request.json

//     # 受け取ったデータをそのまま返す
//     return jsonify(data)

// #タイトル受け取る
// @app.route('/api/title_test', methods=['POST'])
// def post_title_test():
//     # POSTリクエストからJSONデータを取得
//     data = request.json

//     # 受け取ったデータをそのまま返す
//     return jsonify({'title': "画面遷移だよん!"})

// #タイトル受け取る
// @app.route('/api/test_post', methods=['POST'])
// def teat_post():
//     # POSTリクエストからJSONデータを取得
//     data = request.json

//     # 受け取ったデータをそのまま返す
//     return jsonify(data)

// @app.route('/matching', methods=['POST'])
// def matching():
//      # POSTリクエストのボディからJSONデータを取得
//     data = request.json
//     # 取得したデータをそのまま返す
//     return jsonify({'flag': "true"})

// @app.route('/matching_start', methods=['POST'])
// def matching_start():
//      # POSTリクエストのボディからJSONデータを取得
//     data = request.json
//     # 取得したデータをそのまま返す
//     return jsonify({'flag': "true"})

// @app.route('/signup', methods=['POST'])
// def signup():
//     data = request.get_json()
//     if 1:
//         return jsonify(
//     {
//        "flag":"true"
//     },

// ) 
//     else:
//         return jsonify({"error": "user_id not provided"}), 400
    
    
    
// @app.route('/login', methods=['POST'])
// def login():
//     data = request.get_json()
//     if 1:
//         return jsonify(
//     {
//        "flag":"true"
//     },

// ) 
//     else:
//         return jsonify({"error": "user_id not provided"}), 400
    
// @app.route('/get_userName', methods=['POST'])
// def get_userName():
//     data = request.get_json()
//     if 1:
//         return jsonify(
//     {
//        "user_name":"sample"
//     },

// ) 
//     else:
//         return jsonify({"error": "user_id not provided"}), 400
// @app.route('/postView_group', methods=['POST'])
// def postView_group():
//     data = request.get_json()
//     if 1:
//         return jsonify(
//     [{
//         "id":"8",
//         "user_name":"name8",
//         "theme":"theme8",
//         "post_txt":"疲れた",
//     },
// ]

// ) 
//     else:
//         return jsonify({"error": "user_id not provided"}), 400
    
    
// @app.route('/postView_all', methods=['GET'])
// def postView_all():
//     return jsonify(
//  [
//     {
//       "id":"1",
//       "user_name":"name1",
//       "theme":"theme1",
//       "post_txt":"眠い",
//     },
//     {
//       "id":"2",
//       "user_name":"name2",
//       "theme":"theme2",
//       "post_txt":"眠い",
//     },
//     {
//       "id":"3",
//       "user_name":"name3",
//       "theme":"theme3",
//       "post_txt":"眠い",
//     },
//     {
//       "id":"4",
//       "user_name":"name4",
//       "theme":"theme4",
//       "post_txt":"眠い",
//     },
//     {
//       "id":"5",
//       "user_name":"name5",
//       "theme":"theme5",
//       "post_txt":"眠い",
//     },
//     {
//       "id":"6",
//       "user_name":"name6",
//       "theme":"theme8",
//       "post_txt":"眠い",
//     },
//     {
//       "id":"7",
//       "user_name":"name7",
//       "theme":"theme7",
//       "post_txt":"眠い",
//     },
//     {
//       "id":"8",
//       "user_name":"name8",
//       "theme":"theme8",
//       "post_txt":"眠い",
//     },

//   ]

// ) 
    
// @app.route('/movePost', methods=['POST'])
// def movePost():
//     data = request.get_json()
//     if 1:
//         return jsonify(
//     {
//        "theme":"sample"
//     },

// ) 
        
// @app.route('/post', methods=['POST'])
// def post():
//     data = request.get_json()
//     if 1:
//         return jsonify(
//     {
//         "flag":"true" 
//     },

// ) 



// if __name__ == "__main__":
//      app.run(debug=True)
     
// #      from flask import Flask
// # from flask_sqlalchemy import SQLAlchemy

// # app = Flask(__name__)

// # # データベース URI を直接設定
// # app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mysql:mysql@db:3306/mysql_test'
// # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

// # db = SQLAlchemy(app)

// # class User(db.Model):
// #     id = db.Column(db.Integer, primary_key=True)
// #     name = db.Column(db.String(50), nullable=False)

// # def create_db():
// #     """Create the database tables."""
// #     with app.app_context():
// #         db.create_all()
// #         print("Database tables created.")

// # if __name__ == '__main__':
// #     create_db()
// #     app.run(debug=True)