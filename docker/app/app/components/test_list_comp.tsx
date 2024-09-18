import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

interface TestListCompProps{
  user_name:string,
  theme:string,
  post_txt:string,
}


const { height, width } = Dimensions.get("window");

export default function TestListComp(TestData:TestListCompProps) {
  return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {TestData.theme}
        </Text>
        <Text style={styles.text}>
          {TestData.user_name}
        </Text>
        <Text style={styles.text}>
          {TestData.post_txt}
        </Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#dde0f7",
    height:height/5,
    marginVertical: 10,
    padding:20,
    borderRadius:20,
    justifyContent:"center",
    marginHorizontal:30,
  },
  text:{
    fontSize: 25,
    color: "black",
  }
});
