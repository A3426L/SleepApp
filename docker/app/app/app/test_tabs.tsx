import { Pressable, Text, SafeAreaView, LayoutChangeEvent } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View, TouchableOpacity} from "react-native";
import {Link,useRouter} from 'expo-router';
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabsHeaderText from "../components/TabsHeaderText";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import React, { useState } from "react";
import TabsHeaderIcon from "@/components/TabsHeaderIcon";

export default function Home() {
  const router = useRouter();


  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleLayout = (event:LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };


  return (
      <SafeAreaView style = {styles.Container}>
        <View style = {styles.TabsHeaderContainer}>
          <View style = {styles.TabsHeaderTextContainer}>
            <TabsHeaderText/>
          </View>
          <TabsHeaderIcon/>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
  },
  TabsHeaderContainer: {
    flex: 0.1,
    backgroundColor: '#9370db',
    flexDirection: "row",
    //alignItems: "center",
  },
  TabsHeaderTextContainer: {
    flex: 0.8,
    justifyContent: "center", 
  },
  TabsHeaderIcon: {
    backgroundColor: '#9370db',
    flex: 0.2,
    justifyContent: "center", 
    alignItems: "center",
  },
});
