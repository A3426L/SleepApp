import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, Dimensions } from "react-native";

interface TestListCompProps {
  user_name: string;
  theme: string;
  post_txt: string;
}

const { height, width } = Dimensions.get("window");

export default function TestListComp(TestData: TestListCompProps) {
  return (
    <View style={styles.container}>
      <View style={{flex:0.2, flexDirection:"row",paddingHorizontal:8,paddingTop:8}}>
        <View style={{flex:0.5,justifyContent:"center"}}>
          <Text style={styles.theme}>{TestData.theme}</Text>
        </View>
        <View style={{flex:0.5,backgroundColor:"#4b58c8",borderTopLeftRadius: 10,borderTopRightRadius: 10,justifyContent:"center"}}>
          <Text style={styles.user_name}>{TestData.user_name}</Text>
        </View>
        </View>
      <View style={{flex:0.8,borderBottomLeftRadius: 20,borderBottomRightRadius: 20,paddingHorizontal:8,paddingBottom:8}}>
        <View style={{flex:1,backgroundColor:"#4b58c8",borderBottomLeftRadius: 20,borderBottomRightRadius: 20,borderTopLeftRadius: 20,paddingHorizontal:10}}>
          <Text style={styles.post_txt}>{TestData.post_txt}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dde0f7",
    height: 220,
    marginVertical: 10,
    //padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  user_name: {
    fontSize: 16,
    fontWeight:"bold",
    color: "black",
    textAlign: "center"
  },
  theme: {
    fontSize: 16,
    fontWeight:"bold",
    color: "black",
    textAlign: "center",
    
  },
  post_txt: {
    fontSize: 16,
    color: "black",
  },
});
