import { Pressable, Text, SafeAreaView, LayoutChangeEvent } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View, TouchableOpacity, ImageBackground} from "react-native";
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

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style = {{flex:0.3,backgroundColor: "#4b58c8"}}>
        <View style = {{flex:1,backgroundColor: "#001125"}}>
          <View style={{flex: 1, backgroundColor: "#4b58c8",borderBottomLeftRadius: 50, borderBottomRightRadius: 50, justifyContent:"center"}}>
            <Text style={{color: "white",fontSize:45,textAlign:"center"}}>
              はじめまして！
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
          <View style={{flex: 0.15,}}>
            {/* Linkに置き換え */}
            <TouchableOpacity onPress={() => {router.push({pathname:"/account_two", params:{mode:"Sign Up"}});}} style={{flex:1, backgroundColor: "#4b58c8",borderRadius:20, justifyContent:"center", marginHorizontal:"5%"}}>
              <Text style={{color: "white",fontSize:25,textAlign:"center"}}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.05, }}/>
          <View style={{flex: 0.15,}}>
            {/* Linkに置き換え */}
            <TouchableOpacity onPress={() => {router.push({pathname:"/account_two", params:{mode:"Log In"}});}} style={{flex:1, backgroundColor: "#4b58c8",borderRadius:20, justifyContent:"center", marginHorizontal:"5%"}}>
              <Text style={{color: "white",fontSize:25,textAlign:"center"}}>
                  Log in
                </Text>
              </TouchableOpacity>
          </View>
          <View style={{flex: 0.15, }}/>
        </ImageBackground>
      </SafeAreaView>
    </View>
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

});
