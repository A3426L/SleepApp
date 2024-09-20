import { useEffect, useState } from "react";
import { Text , View} from "react-native";
import { Pressable, SafeAreaView } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, TouchableOpacity} from "react-native";
import {Link,useRouter} from 'expo-router';
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TabsHeaderText = () => {
  return(
    <Text style = {styles.TabsHeaderText}>
      Sheeeep
    </Text>
  );
}

const styles = StyleSheet.create({
  TabsHeaderText: {
    color: "white",
    fontSize: 45,
    textAlign: "left",
    fontFamily:"DenkOne",
    paddingLeft:20,
  },
});

export default TabsHeaderText;