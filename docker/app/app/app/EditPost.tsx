import { Pressable, Text, TextInput,SafeAreaView, LayoutChangeEvent ,Keyboard} from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View, TouchableOpacity, Platform,ImageBackground,KeyboardAvoidingView,TouchableWithoutFeedback} from "react-native";
import {Link,useRouter} from 'expo-router';
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabsHeaderText from "@/components/TabsHeaderText";
import React, { useState } from "react";
import TabsHeaderIcon from "@/components/TabsHeaderIcon";
import DigitalClock from "@/components/ DigitalClock";

export default function First_page() {
  const router = useRouter();
  const home_image = require("@/assets/images/sheep_image.png");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  return (
    <SafeAreaView style = {{flex:1,borderTopLeftRadius:30,borderTopRightRadius:30}}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.select({
        //ios: 25,
      })}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1}}>
          <View style={{flex:0.15,borderTopLeftRadius:30,borderTopRightRadius:30,flexDirection:"row"}}>
          
            <View style={{flex:0.3,justifyContent:"center"}}>
            <TouchableOpacity
              style={styles.AccountCross}
              onLayout={handleLayout}
              onPress={()=>{router.navigate("/test_tabs")}}
            >
              <Ionicons
                name="close"
                size={dimensions.height}
                color={"black"}
              />
            </TouchableOpacity>
              </View>
              <View style={{flex:0.4}}>

              </View>
              <View style={{flex:0.3,justifyContent:"center"}}>
                <TouchableOpacity style={{flex:1,backgroundColor: 'blue',marginVertical:25,marginHorizontal:10,borderRadius:15,justifyContent:"center"}} onPress={()=>{router.navigate("/test_tabs")}}>
                  <Text style={{color:"white",textAlign:"center",fontSize:20,}}>
                    POST
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          <View style={styles.inner}>
            <TextInput placeholder="テーマ名を薄く入れる" style={styles.textInput} /*value={value} */ /*onChangeText={handleTextChange}*//>
            {/* <View style={{flex:0.1, backgroundColor:"gray"}}></View> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    margin:20
  },

});
