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
      Sleep App
    </Text>
  );
}

const styles = StyleSheet.create({
  TabsHeaderText: {
    color: "white",
    fontSize: 25,
    textAlign: "left",
  },
});

export default TabsHeaderText;