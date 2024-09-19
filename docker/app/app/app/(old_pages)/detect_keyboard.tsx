//////////////////////unused///////////////////////

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Keyboard, StyleSheet } from 'react-native';

export default function DetectKey() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    // キーボードが表示されたとき
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // キーボードが表示されている状態
      }
    );

    // キーボードが隠れたとき
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // キーボードが隠れている状態
      }
    );

    // コンポーネントがアンマウントされる際にリスナーを解除
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        {isKeyboardVisible ? "Keyboard is visible" : "Keyboard is hidden"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  status: {
    fontSize: 18,
    color: 'black',
  },
});
