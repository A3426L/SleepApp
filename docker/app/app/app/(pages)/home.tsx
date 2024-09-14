import { Pressable, Text, SafeAreaView, LayoutChangeEvent } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View, TouchableOpacity, ImageBackground} from "react-native";
import {Link,useRouter} from 'expo-router';
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabsHeaderText from "@/components/TabsHeaderText";
import React, { useState } from "react";
import TabsHeaderIcon from "@/components/TabsHeaderIcon";

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
          <ImageBackground source={home_image} style={styles.HomeImage}>
            <View style={{backgroundColor:"red",flex:0}}></View>
          </ImageBackground>
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
