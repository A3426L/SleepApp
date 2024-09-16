import { Pressable, Text, SafeAreaView, LayoutChangeEvent } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View, TouchableOpacity} from "react-native";
import {Link,useRouter} from 'expo-router';
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabsHeaderText from "@/components/TabsHeaderText";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import React, { useState } from "react";
import TabsHeaderIcon from "@/components/TabsHeaderIcon";
import axios from 'axios';

export default function Home() {

  const router = useRouter();

  const test = ()=>{axios.get('http://192.168.0.103/add-user-test')
    .then(username=>{
      console.log(username.data)})
    .catch(error => console.error("error",error))}


  return (
      <SafeAreaView style = {styles.Container}>
        <View style = {styles.TabsHeaderContainer}>
          <View style = {styles.TabsHeaderTextContainer}>
          </View>
          <TabsHeaderIcon/>
        </View>
        <View style = {{flex :0.9, backgroundColor: "white"}}>
        <TouchableOpacity style={{flex:1}} onPress={test}>
          <Text>test</Text>
        </TouchableOpacity>
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
    backgroundColor: 'white',
    flexDirection: "row",
  },
  TabsHeaderTextContainer: {
    flex: 0.8,
    justifyContent: "center", 
    backgroundColor:"#001125"
  },
  TabsHeaderIcon: {
    backgroundColor: 'white',
    flex: 0.2,
    justifyContent: "center", 
    alignItems: "center",
  },
});
