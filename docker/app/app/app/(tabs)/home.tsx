import React, { useState, useEffect } from "react";
import DigitalClock from "@/components/ DigitalClock";
import TabsHeaderText from "@/components/TabsHeaderText";
import {Link,useRouter} from 'expo-router';
import { useGlobalContext } from '../GlobalContext';
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  ImageBackground
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import TabsHeaderIcon from "@/components/TabsHeaderIcon";
import { LayoutChangeEvent } from "react-native";
const { height, width } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";
import { useFocusEffect } from "expo-router";

export default function Test_tabs() {
  const { userIdglobal, setUserIdglobal } = useGlobalContext();
  const translateX = useSharedValue(width); // 初期状態は画面の外にある
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const home_image = require("@/assets/images/result_image.png");
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

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("HomeScreenがフォーカスされました");
      // タブが押されたことを示すアクションをここに記述します。

      return () => {
        console.log("HomeScreenのフォーカスが外れました");
        setIsVisible(false);
        translateX.value = withTiming(width);
      };
    }, [])
  );
  const [dimensions_2, setDimensions_2] = useState({ width: 0, height: 0 });
  const handleLayout_2 = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions_2({ width, height });
  };
  const [dimensions_3, setDimensions_3] = useState({ width: 0, height: 0 });
  const handleLayout_3 = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions_3({ width, height });
  };
  const [dimensions_4, setDimensions_4] = useState({ width: 0, height: 0 });
  const handleLayout_4 = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions_4({ width, height });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.Container}>
        <View style={styles.TabsHeaderContainer}>
          <View style={styles.TabsHeaderTextContainer}><TabsHeaderText/></View>
          <TouchableOpacity
            style={styles.TabsHeaderIcon}
            onLayout={handleLayout}
            onPress={toggleSlider}
          >
            <Ionicons
              name="person-circle"
              size={dimensions.height}
              color={"white"}
            />
          </TouchableOpacity>
        </View>

        
        <View style={styles.MainContainer}>
        <ImageBackground source={home_image} style={styles.HomeImage}>
          <View style={{backgroundColor:"#001125",flex:0.5}}>
            <View style ={{flex:0.3, backgroundColor: "#001125",justifyContent: 'center', marginLeft: "5%"}}>
              <Text style={{color: "white", backgroundColor: "#001125", fontSize: 25 }}>
              Current User ID: {userIdglobal}
              </Text>
            </View>
            <DigitalClock>

            </DigitalClock>
          </View>
          <View style={{flex:0.5,justifyContent:"center"}}>
            
              <Link href={"/chat"} asChild>
                <TouchableOpacity style={{flex:0.35, backgroundColor: "#4b58c8",justifyContent: 'center',marginBottom: "20%",marginHorizontal:"7%", borderRadius:20}}>
                  <Text style={{color: "white",fontSize:25,textAlign:"center"}}>
                    夢を決める
                  </Text>
                </TouchableOpacity>
              </Link>
            
          </View>   
          </ImageBackground>
        </View>
      </SafeAreaView>
      {isVisible && (
        <TouchableWithoutFeedback onPress={toggleSlider}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* 横からスライドしてくるコンポーネント */}
      <Animated.View style={[styles.slider, animatedStyle]}>
        <View
          style={{ flex: 0.1, borderTopLeftRadius: 40, flexDirection: "row" }}
        >
          <View
            style={{
              flex: 0.2,
              borderTopLeftRadius: 40,
              justifyContent: "center",
            }}
          >
            <View style={styles.AccountHeaderIcon} onLayout={handleLayout_2}>
              <Ionicons
                name="person-circle"
                size={dimensions_2.height}
                color={"#4b58c8"}
              />
            </View>
          </View>
          <View style={{ flex: 0.6, justifyContent: "center" }}>
            <Text style={{ fontSize: 40, color: "#4b58c8" }}>Account</Text>
          </View>
          <View style={{ flex: 0.2, justifyContent: "center" }}>
            <TouchableOpacity
              style={styles.AccountCross}
              onLayout={handleLayout_3}
              onPress={toggleSlider}
            >
              <Ionicons
                name="close"
                size={dimensions_3.height}
                color={"black"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 0.18,
            justifyContent: "flex-end",
            alignContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.AccountIcon}
            onLayout={handleLayout_4}
          >
            <Ionicons
              name="person-circle"
              size={dimensions_4.height}
              color={"#4b58c8"}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.02 }}></View>
        <View style={{ flex: 0.4 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                borderColor: "black",
                borderWidth: 2,
                backgroundColor: "white",
                borderRadius: 20,
                justifyContent: "center",
                margin: "5%",
              }}
            >
              <Text style={{ fontSize: 25, textAlign: "center" }}>
                ユーザー名
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                borderColor: "black",
                borderWidth: 2,
                backgroundColor: "white",
                borderRadius: 20,
                justifyContent: "center",
                margin: "5%",
              }}
            >
              <Text style={{ fontSize: 25, textAlign: "center" }}>
                ユーザーID
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/account_two",
                  params: { mode: "Edit" },
                });
              }}
              style={{
                flex: 1,
                backgroundColor: "#9a9dcc",
                borderRadius: 20,
                justifyContent: "center",
                margin: "5%",
              }}
            >
              <Text style={{ fontSize: 25, textAlign: "center" }}>編集</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 0.4, backgroundColor: "#4b58c8" }}></View>

        {/* <Text style={styles.sliderText}>横からスライドするビュー</Text>
        <Button title="閉じる" onPress={toggleSlider} /> */}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: width / 1.1, // 画面の半分の幅
    height: height / 1.2,
    borderTopLeftRadius: 40,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  sliderText: {
    fontSize: 20,
    marginBottom: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  Container: {
    flex: 1,
    backgroundColor:"#001125",
  },
  TabsHeaderContainer: {
    flex: 0.1,
    flexDirection: "row",
  },
  TabsHeaderTextContainer: {
    flex: 0.8,
    justifyContent: "center",
    backgroundColor: "#001125",
  },
  TabsHeaderIcon: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  MainContainer:{
    flex: 0.9,
  },
  HomeImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  AccountHeaderIcon: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  AccountCross: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  AccountIcon: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
});
// const styles = StyleSheet.create({
//   Container: {
//     flex: 1,
//     backgroundColor: "#001125",
//   },
//   TabsHeaderContainer: {
//     flex: 0.1,
//     backgroundColor: '#001125',
//     flexDirection: "row",
//     //alignItems: "center",
//   },
//   TabsHeaderTextContainer: {
//     flex: 0.8,
//     justifyContent: "center", 
//   },
//   TabsHeaderIcon: {
//     backgroundColor: 'white',
//     flex: 0.2,
//     justifyContent: "center", 
//     alignItems: "center",
//   },
//   MainContainer:{
//     flex: 0.9,
//   },
//   HomeImage: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "center",
//   },
// });