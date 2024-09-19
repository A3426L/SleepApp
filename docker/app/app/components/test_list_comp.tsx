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
      <View style={{flex:0.2}}>
        <Text style={styles.theme}>{TestData.theme}</Text>
      </View>
      <View style={{flex:0.1}}>
        <Text style={styles.user_name}>{TestData.user_name}</Text>
      </View>
      <View style={{flex:0.6}}>
        <Text style={styles.post_txt}>{TestData.post_txt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dde0f7",
    height: height / 5,
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  user_name: {
    fontSize: 15,
    color: "black",
    textDecorationLine:"underline"
  },
  theme: {
    fontSize: 30,
    color: "black",
  },
  post_txt: {
    fontSize: 25,
    color: "black",
  },
});
