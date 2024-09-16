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

  return (
    <SafeAreaView style = {{flex:1,backgroundColor: "#4b58c8"}}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.select({
        //ios: 25,
      })}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput placeholder="Username" style={styles.textInput} /*value={value} */keyboardType="email-address" /*onChangeText={handleTextChange}*//>
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
          <View style={{flex:0.1, backgroundColor:"gray"}}></View>
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
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    flex: 1,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },

});
