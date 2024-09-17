import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useGlobalContext } from '../GlobalContext';
import TabsHeaderIcon from "@/components/TabsHeaderIcon";
import { LayoutChangeEvent } from "react-native";
import TabsHeaderText from "@/components/TabsHeaderText";
const { height, width } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import TestListComp from "../../components/test_list_comp";

import { TouchableOpacity ,RefreshControl} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";

export default function Test_tabs() {
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
  const { userIdglobal, setUserIdglobal } = useGlobalContext();
  const accountmenu_image = require("@/assets/images/accountmenu_image.png");
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

  const[selectTabColor, setSelectTabColor] = useState(false);

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
  const [dimensions_5, setDimensions_5] = useState({ width: 0, height: 0 });
  const handleLayout_5 = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions_5({ width, height });
  };

////////////////////////////////////
  
  const [refreshing, setRefreshing] = useState(false);
  const [test_data, settest_data] = useState([
    {
      id:1,
      text:"眠い",
    },
    {
      id:2,
      text:"眠い",
    },
    {
      id:3,
      text:"眠い",
    },
    {
      id:4,
      text:"眠い",
    },
    {
      id:5,
      text:"眠い",
    },
    {
      id:6,
      text:"眠い",
    },
    {
      id:7,
      text:"眠い",
    },
    {
      id:8,
      text:"眠い",
    },
    {
      id:9,
      text:"眠い",
    },
    {
      id:10,
      text:"眠い",
    },
    {
      id:11,
      text:"眠い",
    },
    {
      id:12,
      text:"眠い",
    },
    {
      id:13,
      text:"眠い",
    },
    {
      id:14,
      text:"眠い",
    },
  ])

const test_data2 =[
  {
    id:1,
    text:"疲れた！",
  },
]

/////////////////////////////////////////
const onRefresh = () => {
  // 再読み込みが始まるときにrefreshingをtrueに設定
  setRefreshing(true);

  // 仮のデータフェッチをシミュレート
  setTimeout(() => {
    // 新しいデータをセット
    settest_data([
      { id: 1, text: 'New Item 1' },
      { id: 2, text: 'New Item 2' },
      { id: 3, text: 'New Item 3' },
      { id: 4, text: 'New Item 4' }, // 新しいアイテムを追加
    ]);

    // データのリフレッシュ完了
    setRefreshing(false);
  }, 1000); // 2秒後に再読み込みが完了するシミュレーション
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
        <View style={{ flex: 0.9,}} >
        <ImageBackground source={home_image} style={styles.ResultImage}>
          <View style={{flex: 0.2,flexDirection:"row"}}>
            <View style={{flex: 1,}}>
            <TouchableOpacity
              onPress={() => {
                setSelectTabColor(false);
              }}
              style={{
                flex: 1,
                backgroundColor: (selectTabColor === true)?"#012045":"#4b58c8",
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                justifyContent: "center",
                marginTop: "20%",
                marginLeft: 30
              }}
            >
              <Text style={{ fontSize: 25, textAlign: "center" ,color:"white"}}>Group</Text>
            </TouchableOpacity>
            </View>
            <View style={{flex: 1,}}>
            <TouchableOpacity
              onPress={() => {
                setSelectTabColor(true);
              }}
              style={{
                flex: 1,
                backgroundColor: (selectTabColor === false)?"#012045":"#4b58c8",
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                justifyContent: "center",
                marginTop: "20%",
                marginRight: 30
              }}
            >
              <Text style={{ fontSize: 25, textAlign: "center" ,color:"white"}}>All</Text>
            </TouchableOpacity>

            </View>

          </View>
          <View style={{flex: 0.8,}}>
            <FlatList
              style={{flex:1,marginTop:"5%"}}
              data={(selectTabColor===true)?test_data:test_data2}
              renderItem={({ item }) => <TestListComp id={item.id} text={item.text} />}
              keyExtractor={(item) => item.id.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
              }
            >
            </FlatList>
            <TouchableOpacity
              style={{
                 height:100,
                 width:100,
                justifyContent: "center",
                alignItems: "center",
                position:"absolute",
                right:0,
                bottom:0
              }}
              onLayout={handleLayout_5}
              onPress={() =>{router.navigate({pathname:"/EditPost"})}}
            >
              <Ionicons
                name="add-circle"
                size={dimensions_5.height}
                color={"rgba(0,17,37,0.5)"}
              />
            </TouchableOpacity>
          </View>
          </ImageBackground>
        </View>
      </SafeAreaView>

      {/* <View style ={{flex:0.1, backgroundColor:"red",}}>
      <Button title="スライダーを表示" onPress={toggleSlider} />
      </View> */}

      {/* 背景タッチで閉じる */}
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
        <View style={{ flex: 0.45 }}>
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
                {userIdglobal}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                router.dismissAll,
                router.replace({
                  pathname: "/first_page",
                }),setUserIdglobal(null)
              }}
              style={{
                flex: 1,
                backgroundColor: "#9a9dcc",
                borderRadius: 20,
                justifyContent: "center",
                margin: "5%",
              }}
            >
              <Text style={{ fontSize: 25, textAlign: "center" }}>ログアウト</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 0.55,}}>
          <ImageBackground source={accountmenu_image} style={styles.ResultImage}></ImageBackground>
        </View>

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
    backgroundColor: "#001125",
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
  welcome: {
    flex: 1,
    margin: 20,
    backgroundColor: 'orange',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 70,
  },
  ResultImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

///////////////////////////////////////////////////////
// import React from 'react';
// import { View, Text } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native'; // useFocusEffectをインポート

// export default function HomeScreen() {
//   useFocusEffect(
//     React.useCallback(() => {
//       console.log('HomeScreenがフォーカスされました');
//       // タブが押されたことを示すアクションをここに記述します。

//       return () => {
//         console.log('HomeScreenのフォーカスが外れました');
//       };
//     }, [])
//   );

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }
