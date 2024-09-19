import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, ImageBackground, Animated, TouchableOpacity, Alert } from 'react-native';
import { GiftedChat, IMessage, Send, InputToolbar, Bubble, Time } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Link, usePathname, useRouter, useFocusEffect } from 'expo-router';
import axios from 'axios';
import { useGlobalContext } from './GlobalContext';

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

  useEffect(() => {
    // メッセージを取得する関数
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://172.20.10.8/api/data');
        // メッセージを逆順に並び替える
        const reversedMessages = response.data.messages.reverse();
        const fetchedMessages = reversedMessages.map((msg: any) => {
          // userIdGlobalとmsg.idが同じかどうかをチェック
          const isUserMessage = userIdglobal === msg.user_id;

          return {
            text: msg.text,
            _id: msg.msg_id,
            createdAt: new Date(),
            user: {
              _id: isUserMessage ? 1 : msg.user_id, // 同じ場合は1、それ以外はmsg.id
              name: 'developer',
              avatar: 'https://png.pngtree.com/png-clipart/20191122/original/pngtree-user-icon-isolated-on-abstract-background-png-image_5192004.jpg',
            },
          };
        });

        // 前回のメッセージと新しいメッセージを比較し、新しいメッセージだけをフィルタリング
        const previousMessages = previousMessagesRef.current;
        const newMessages = fetchedMessages.filter((message: IMessage) => 
          !previousMessages.some((prev) => prev._id === message._id)
        );

        // 新しいメッセージがある場合にのみ状態を更新
        if (newMessages.length > 0) {
          setMsg((previousMessages) => [...previousMessages, ...newMessages]);
        }

        // 現在のメッセージリストを保存
        previousMessagesRef.current = [...previousMessagesRef.current, ...newMessages];
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // 初回実行
    fetchMessages();

    // 0.1秒ごとにメッセージを取得するためのインターバルを設定
    const intervalId = setInterval(fetchMessages, 2000); // 100ミリ秒 = 0.1秒

    // クリーンアップ関数
    return () => clearInterval(intervalId);
  }, []); // 空の依存配列で初回マウント時のみに実行

  // useEffect(() => {
  //   console.log('Messages:', msg); // msgの中身を表示
  // }, [msg]); // msgが変更されたら実行

    // コンポーネントがマウントされた際にPOSTリクエストを送信
  // const checkLeader = async () => {
  //   try {
  //     const response = await axios.post('http://172.20.10.8/api/leader', {
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
  
    // メッセージをPOSTリクエストでサーバーに送信
    const messageData = messages.map(msg => ({
      _id: msg._id,
      text: msg.text,
      // createdAt: msg.createdAt,
      user: userIdglobal
    }));
  
    axios.post('http://172.20.10.8/api/data/post', 
      { messages: messageData },  // メッセージデータをサーバーに送信
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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
        const response = await axios.post('http://172.20.10.8/api/title', {
          text: title,
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

    const startProgressBar = useCallback(async (totalDuration: number, elapsedTime: number, end: number, current: number) => {
      if (totalDuration > 0) {
        // プログレスバーの幅を計算
        const progress = (elapsedTime / totalDuration) * 100;
        widthAnim.setValue(progress);

        // プログレスバーが終了したときに画面遷移を実行
        Animated.timing(widthAnim, {
          toValue: 100,
          duration: end - current,
          useNativeDriver: false,
        }).start(({finished}) => {
          if (finished) {
            // アニメーションが正常に終了した場合にのみ実行される
            console.log("アニメーション終了");
            // ここに画面遷移などの処理を追加
            router.navigate({pathname:'/title_page'}); // 例: react-routerを使用した画面遷移
          }
        });
      }
    }, [widthAnim]);

    const fetchDataAndStartProgress = async () => {
      try {
        const response = await axios.get('http://172.20.10.8/chat_start');
        const now = new Date().getTime();
        const start = new Date(response.data.startTime).getTime();
        const end = new Date(response.data.endTime).getTime();

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

        console.log('サーバーからの開始時刻（JST）:', new Date(response.data.startTime).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }));
        console.log('サーバーからの終了時刻（JST）:', new Date(response.data.endTime).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }));
        console.log('クライアントの現在時刻:', new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }));

        // プログレスバーを開始
        startProgressBar(totalDuration, elapsedTime, end, current);
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
    // axios.get('http://172.20.10.8/api/data')
    //   .then(test_data => {
    //     console.log(test_data.data);
    //   })
    //   .catch(error => console.error("error", error));
    const newUserId = '2'; // ここに設定したい値を設定
    setUserIdglobal(newUserId);
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
