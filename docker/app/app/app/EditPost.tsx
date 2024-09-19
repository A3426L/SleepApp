import { Pressable, Text, TextInput,SafeAreaView, LayoutChangeEvent ,Keyboard} from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View, TouchableOpacity, Platform,ImageBackground,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView} from "react-native";
import {Link,useRouter} from 'expo-router';
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabsHeaderText from "@/components/TabsHeaderText";
import React, { useEffect, useState } from "react";
import TabsHeaderIcon from "@/components/TabsHeaderIcon";
import DigitalClock from "@/components/ DigitalClock";
import { useRef } from "react";
import { movePost, MOVEPOST ,postData} from "@/components/ApiFunc";
import { post, POST } from "@/components/ApiFunc";
import { useGlobalContext } from "./GlobalContext";

export default function First_page() {
  const router = useRouter();
  const home_image = require("@/assets/images/sheep_image.png");
  const { userIdglobal, setUserIdglobal } = useGlobalContext();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };
  const inputRef = useRef<TextInput>(null);
  const [value, setvalue] = useState("");
  useEffect(() => {
    // 画面が表示されたときにTextInputにフォーカスを当てる

      if (inputRef.current) {
        inputRef.current.focus(); // TextInputにフォーカスを当ててキーボードを表示
      }

  },[]);

  const [movePostapiResult, setmovePostApiResult] = useState<MOVEPOST | undefined>(undefined); // API結果のステート
  const movePostAPI = async (param:postData) => {
    try {
      // test関数を非同期で呼び出し、結果を取得
      const buf: MOVEPOST | undefined = await movePost(param);
      setmovePostApiResult(buf);
      // 結果をステートにセット
      //setApiResult(buf);
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  };
  useEffect(() => {
    movePostAPI({user_id:String(userIdglobal)});
  },[])

  const [postapiResult, setpostApiResult] = useState<POST | undefined>(undefined); // API結果のステート
  const postAPI = async (param:postData) => {
    try {
      // test関数を非同期で呼び出し、結果を取得
      const buf: POST | undefined = await post(param);
      setpostApiResult(buf);
      // 結果をステートにセット
      //setApiResult(buf);
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  };


  return (
    <SafeAreaView style = {{flex:1,borderTopLeftRadius:30,borderTopRightRadius:30,backgroundColor:"#dde0f7"}}>
          <View style={{height:100,borderTopLeftRadius:30,borderTopRightRadius:30,flexDirection:"row",backgroundColor:"#001125"}}>
          
          <View style={{flex:0.3,justifyContent:"center"}}>
          <TouchableOpacity
            style={styles.AccountCross}
            onLayout={handleLayout}
            onPress={()=>{router.navigate("/test_tabs")}}
          >
            <Ionicons
              name="close"
              size={dimensions.height}
              color={"white"}
            />
          </TouchableOpacity>
            </View>
            <View style={{flex:0.4}}>

            </View>
            <View style={{flex:0.3,justifyContent:"center"}}>
              <TouchableOpacity style={{flex:1,backgroundColor: '#4b58c8',marginVertical:25,marginHorizontal:10,borderRadius:15,justifyContent:"center",minHeight:50}} onPress={()=>{postAPI({user_id:String(userIdglobal),post_txt:value}),router.navigate("/test_tabs")}}>
                <Text style={{color:"white",textAlign:"center",fontSize:20,}}>
                  POST
                </Text>
              </TouchableOpacity>
            </View>
          </View>

      
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.select({
        //ios: 25,
      })}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


          <View style={styles.inner}>
            <TextInput ref={inputRef} placeholder={movePostapiResult?.theme} style={styles.textInput} multiline={true} maxLength={100} value={value} onChangeText={setvalue}/>
            {/* <View style={{flex:0.1, backgroundColor:"gray"}}></View> */}
          </View>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#dde0f7"
  },
  inner: {
    padding: 24,
    flex: 0.85,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    flex: 1,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
    fontSize:20
  },
  btnContainer: {
    flex:0.2,
    backgroundColor: 'white',
    marginTop: 15,
  },
  AccountCross: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
    margin:20,
    minHeight:50
  },

});
