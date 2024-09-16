import React, { forwardRef, useState, createRef, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, ImageBackground, Animated , TouchableOpacity} from 'react-native';
import { GiftedChat, IMessage, Send, InputToolbar, Bubble, Time } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Link} from 'expo-router';
import axios from 'axios';

interface AppState {
  messages: IMessage[];
}

const home_image = require("@/assets/images/chat_image.png");

export default class App extends React.Component<{}, AppState> {
  private topInputRef = createRef<TextInput>();
  private bottomInputRef = createRef<TextInput>();

  constructor(props: {}) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount(){
    this.setState({ messages: fetchedMessages });
  }

 

  // Operation when the send button is pressed
  onSend = (messages: IMessage[] = []) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  handleTopInputFocus = () => {
    if (this.bottomInputRef.current) {
      this.bottomInputRef.current.blur(); // 下部のテキストボックスのフォーカスを解除
    }
  };

  // 吹き出しの色をカスタマイズ
  renderBubble = (props: any) => {
    return (
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
            color: '#ffffff', // 相手のテキストの色を黒に変更
          },
          right: {
            color: '#000000', // 自分のテキストの色を白に変更
          },
        }}
      />
    );
  };

  //時刻表示の文字色指定
  renderTime = (props: any) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: '#ffffff', // 相手の時間表示の色を黒に変更
          },
          right: {
            color: '#000000', // 自分の時間表示の色を白に変更
          },
        }}
      />
    );
  };

  render() {
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
            <ProgressBar duration={10000} />
          </View>
          {/* ///////////////////////////////////////////////////////////////////////// */}
          
            <View style={styles.chatContainer}>
              <ImageBackground source={home_image} style={styles.HomeImage}>
                <View style={styles.topInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="お題"
                    ref={this.topInputRef}
                    onFocus={this.handleTopInputFocus} // フォーカスイベントを処理
                  />
                  <TouchableOpacity style={styles.randomButton} >
                    <Icon name="casino" size={30} color="black" style={styles.icon} />
                  </TouchableOpacity>
                </View>
                  <GiftedChat
                    messages={this.state.messages}
                    placeholder="メッセージを入力"
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                      _id: 1,
                    }}
                    renderSend={(props) => <CustomSend {...props} />}
                    renderInputToolbar={(props) => <CustomInputToolbar {...props} />} // カスタム入力ボックス
                    renderBubble={this.renderBubble}
                    renderTime={this.renderTime}
                    alwaysShowSend={true}
                    keyboardShouldPersistTaps='handled'
                  />
              </ImageBackground>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

// カスタム送信ボタンを forwardRef でラップする
const CustomSend = forwardRef((props: any, ref: any) => {
  return (
    <Send {...props} ref={ref}>
      <View style={styles.sendButton}>
        <Icon name="send" size={24} color="#000000" />
      </View>
    </Send>
  );
});

// カスタム入力ツールバー
const CustomInputToolbar = (props: any) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar} // スタイルを適用
      textInputProps={{
        ref: props.bottomInputRef, // ここで ref を渡す
      }}
    />
  );
};

// プログレスバーコンポーネント
const ProgressBar = ({ duration }: { duration: number }) => {
  const widthAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: 0,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [widthAnim, duration]);

  return (
    <View style={styles.progressBarBackground}>
      <Animated.View style={[styles.progressBarFill, { width: widthAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['100%', '0%']
      }) }]} />
    </View>
  );
};

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
    marginLeft: 5,
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
