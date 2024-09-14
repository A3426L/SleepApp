import { Pressable, Text, SafeAreaView, LayoutChangeEvent } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View, TouchableOpacity, ImageBackground} from "react-native";
import {Link,useRouter} from 'expo-router';
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabsHeaderText from "@/components/TabsHeaderText";
import React, { useState } from "react";
import TabsHeaderIcon from "@/components/TabsHeaderIcon";
import Diditaltimer from "./test_comp";


export default function Home() {
  const router = useRouter();
  const home_image = require("@/assets/images/home_image.png");

  return (
      <SafeAreaView style = {styles.Container}>
        <View style = {styles.TabsHeaderContainer}>
          <View style = {styles.TabsHeaderTextContainer}>
            <TabsHeaderText/>
          </View>
          <TabsHeaderIcon/>
        </View>
        <View style={styles.MainContainer}>
          <View style={{backgroundColor:"#001125",flex:0.5}}>
            <View style ={{flex:0.3, backgroundColor: "#001125",justifyContent: 'center', marginLeft: "5%"}}>
              <Text style={{color: "white", backgroundColor: "#001125", fontSize: 25 }}>
                こんばんは！
              </Text>
            </View>
            <Diditaltimer>

            </Diditaltimer>
          </View>
          <View style={{backgroundColor:"#001125",flex:0.5}}>
            <ImageBackground source={home_image} style={styles.HomeImage}>
              <TouchableOpacity style={{flex:0.35, backgroundColor: "#4b58c8",justifyContent: 'center',marginBottom: "20%",marginHorizontal:"7%", borderRadius:20}}>
                <Text style={{color: "white",fontSize:25,textAlign:"center"}}>
                  夢を決める
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>   
          
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#001125",
  },
  TabsHeaderContainer: {
    flex: 0.1,
    backgroundColor: '#001125',
    flexDirection: "row",
    //alignItems: "center",
  },
  TabsHeaderTextContainer: {
    flex: 0.8,
    justifyContent: "center", 
  },
  TabsHeaderIcon: {
    backgroundColor: 'white',
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
    justifyContent: "center"
  },
});
