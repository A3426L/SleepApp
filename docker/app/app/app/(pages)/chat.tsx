import React, { forwardRef, useState, createRef, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { GiftedChat, IMessage, Send, InputToolbar } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AppState {
  messages: IMessage[];
}

export default class App extends React.Component<{}, AppState> {
  private topInputRef = createRef<TextInput>();
  private bottomInputRef = createRef<TextInput>();

  constructor(props: {}) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer!!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://www.profuture.co.jp/mk/wp-content/uploads/2022/04/img_34670_02.png',
          },
        },
      ],
    });
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.topInputContainer}>
            <ProgressBar duration={10000} />
            <TextInput
              style={styles.textInput}
              placeholder="上部のテキスト入力"
              ref={this.topInputRef}
              onFocus={this.handleTopInputFocus} // フォーカスイベントを処理
            />
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
            alwaysShowSend={true}
            keyboardShouldPersistTaps='handled'
          />
      </SafeAreaView>
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
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // 画面全体の背景色
  },
  topInputContainer: {
    backgroundColor: '#9370db',
    borderBottomLeftRadius: 15,  // 下部左の角を丸くする
    borderBottomRightRadius: 15, // 下部右の角を丸くする
    paddingTop: 30,
    paddingBottom: 20,
  },
  textInput: {
    backgroundColor: '#6495ed',
    textAlign: 'center',
    borderRadius: 4,
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 30,
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
  inputToolbar: {
    backgroundColor: '#f5f5f5', // テキスト入力ボックスの背景色
    borderRadius: 50,
    paddingTop: 0,    // 上部の内側の余白を調整
    paddingBottom: 0,  // 下部の内側の余白を減らし、背景を見せる
    marginBottom: 0,
  },
  progressBarBackground: {
    height: 7,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 15,
    marginTop: 0,
    marginBottom:15
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6495ed',
  },
});
