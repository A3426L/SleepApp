import { Pressable, Text, SafeAreaView, LayoutChangeEvent } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View, TouchableOpacity, ImageBackground,Keyboard,TouchableWithoutFeedback} from "react-native";
import {Link,useLocalSearchParams,useRouter} from 'expo-router';
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabsHeaderText from "@/components/TabsHeaderText";
import React, { useState } from "react";
import TabsHeaderIcon from "@/components/TabsHeaderIcon";
import DigitalClock from "@/components/ DigitalClock";
import { KeyboardAvoidingView ,Platform, TextInput} from "react-native";


export default function Acccount_two() {
  const getmode = useLocalSearchParams();
  const router = useRouter();
  const home_image = require("@/assets/images/sheep_image.png");
  const [userid, setuserid] = useState("");
  const handleuseridChange = (text: string) => {
    // 正規表現で英数字のみ許可
    const filteredText = text.replace(/[^a-zA-Z0-9]/g, "");
    setuserid(filteredText);
  };
  const [password, setpassword] = useState("");
  const handlepasswordChange = (text: string) => {
    // 正規表現で英数字のみ許可
    const filteredText = text.replace(/[^a-zA-Z0-9]/g, "");
    setpassword(filteredText);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <View style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.Container}
          keyboardVerticalOffset={Platform.select({
            //ios: -25,
          })}>
        <SafeAreaView style = {{flex:0.3,backgroundColor: "#4b58c8"}}>
          <View style = {{flex:1,backgroundColor: "#001125"}}>
            <View style={{flex: 1, backgroundColor: "#4b58c8",borderBottomLeftRadius: 50, borderBottomRightRadius: 50, justifyContent:"center"}}>
              <Text style={{color: "white",fontSize:45,textAlign:"center"}}>
                {getmode.mode}
              </Text>
            </View>
          </View>
        </SafeAreaView>
        <SafeAreaView style = {{flex:0.7,backgroundColor: "#001125"}}>
          <ImageBackground source={home_image} style={styles.NewImage}>
            <View style={{flex: 0.50, }}>
              <View style={{flex: 0.2, flexDirection:"row"}}>
                <View style={{flex: 0.05,}}/>
                <View style={{flex: 0.15, alignItems: "center", justifyContent:"center"}}>
                  <View style={{height:50,width:50, backgroundColor: "#4b58c8", borderRadius: 50}}/>
                </View>
                <View style={{flex: 0.8, }}/>
              </View>
              <View style={{flex: 0.17,  flexDirection:"row"}}>
                <View style={{flex: 0.1, }}/>
                <View style={{flex: 0.13,  alignItems: "center", justifyContent:"center"}}>
                  <View style={{height:40,width:40, backgroundColor: "#4b58c8", borderRadius: 50}}/>
                </View>
                <View style={{flex: 0.77,}}/>
              </View>
              <View style={{flex: 0.13,  flexDirection:"row"}}>
                <View style={{flex: 0.2,}}/>
                <View style={{flex: 0.1, alignItems: "center", justifyContent:"center"}}>
                  <View style={{height:30,width:30, backgroundColor: "#4b58c8", borderRadius: 50}}/>
                </View>
                <View style={{flex: 0.7,}}/>
              </View>
              <View style={{flex: 0.5,}}/>
            </View>
            <View style={{flex: 0.15,minHeight: 10}}>
              <View style={{flex: 0.4,justifyContent:"center"}}>
                <Text style={{color: "white",fontSize:20,marginHorizontal:"5%"}}>
                  UserID
                </Text>
              </View>
              <View style={{flex: 0.6,}}>
                <TextInput style={{flex:1, backgroundColor: "#4b58c8",borderRadius:10, justifyContent:"center", marginHorizontal:"5%", fontSize: 25}} value={userid} keyboardType="email-address" onChangeText={handleuseridChange}/>
              </View>
            </View>
            <View style={{flex: 0.05,}}/>
            <View style={{flex: 0.15,minHeight: 10}}>
              <View style={{flex: 0.4,justifyContent:"center"}}>
                <Text style={{color: "white",fontSize:20,marginHorizontal:"5%"}}>
                  PassWord
                </Text>
              </View>
              <View style={{flex: 0.6,}}>
                <TextInput style={{flex:1, backgroundColor: "#4b58c8",borderRadius:10, justifyContent:"center", marginHorizontal:"5%", fontSize: 25}} value={password} keyboardType="email-address" onChangeText={handlepasswordChange}/>
              </View>
            </View>
            <View style={{flex: 0.15, flexDirection: "row"}}>
              <View style={{flex: 1, flexDirection: "row",}}>
                <TouchableOpacity onPress={() => {(getmode.mode==="Edit")?router.navigate("/home") : router.navigate("/first_page")}} style={{flex:1, backgroundColor: "#4b58c8",borderRadius:20, justifyContent:"center", marginHorizontal: "5%", marginTop:"15%"}}>
                  <Text style={{color: "white",fontSize:25,textAlign:"center"}}>
                    {/* アイコンに変える */}
                    ⇦
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, flexDirection: "row",}}></View>
              <View style={{flex: 1, flexDirection: "row",}}>
                <TouchableOpacity onPress={() => {(getmode.mode==="Sign Up"||"Edit")?router.push("/username"):(router.dismissAll(),router.replace("/home"))}} style={{flex:1, backgroundColor: "#4b58c8",borderRadius:20, justifyContent:"center", marginHorizontal: "5%", marginTop:"15%"}}>
                  <Text style={{color: "white",fontSize:25,textAlign:"center"}}>
                    {/* アイコンに変える */}                    
                    ⇨
                  </Text>
                </TouchableOpacity>               
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback> 
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#001125",
  },
  NewImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  TextInput: {
    height: 40,
    flex: 1,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },

});
