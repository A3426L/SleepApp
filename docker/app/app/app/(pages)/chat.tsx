import React from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

interface AppState {
  messages: IMessage[];
}

export default class App extends React.Component<{}, AppState> {
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
          text: 'Hello developer',
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

  onSend = (messages: IMessage[] = []) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
