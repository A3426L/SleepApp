import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

interface TestListCompProps{
  id:number;
  text:string;
}


const { height, width } = Dimensions.get("window");

export default function TestListComp(TestData:TestListCompProps) {
  return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {TestData.id}
        </Text>
        <Text style={styles.text}>
          {TestData.text}
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
