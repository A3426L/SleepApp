import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring ,withTiming} from 'react-native-reanimated';

const { height,width } = Dimensions.get('window');



export default function HalfScreenSlider() {
  const translateX = useSharedValue(width); // 初期状態は画面の外にある
  const [isVisible, setIsVisible] = useState(false);

  const toggleSlider = () => {
    if (isVisible) {
      translateX.value = withTiming(width); // 隠すアニメーション
    } else {
      translateX.value = withTiming(0); // 半分だけ表示するアニメーション
    }
    setIsVisible(!isVisible);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style ={{flex:1, backgroundColor:"red",}}>
      <Button title="スライダーを表示" onPress={toggleSlider} />
      </View>


      {/* 背景タッチで閉じる */}
      {isVisible && (
        <TouchableWithoutFeedback onPress={toggleSlider}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* 横からスライドしてくるコンポーネント */}
      <Animated.View style={[styles.slider, animatedStyle]}>
        <Text style={styles.sliderText}>横からスライドするビュー</Text>
        <Button title="閉じる" onPress={toggleSlider} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: width/1.3, // 画面の半分の幅
    height: height/1.3,
    borderTopLeftRadius: 50,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  sliderText: {
    fontSize: 20,
    marginBottom: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
