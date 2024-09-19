import { useEffect, useState } from "react";
import { Text , View} from "react-native";
import { Pressable, SafeAreaView } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, TouchableOpacity} from "react-native";
import {Link,useRouter} from 'expo-router';
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {LayoutChangeEvent } from "react-native";


const TabsHeaderIcon = () => {

const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
const handleLayout = (event:LayoutChangeEvent) => {
  const { width, height } = event.nativeEvent.layout;
  setDimensions({ width, height });
};
  return (
    <TouchableOpacity style={styles.TabsHeaderIcon} onLayout={handleLayout}>
      <Ionicons name="person-circle" size={dimensions.height} color={"white"}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  TabsHeaderIcon: {
    backgroundColor: '#001125',
    flex: 0.2,
    justifyContent: "center", 
    alignItems: "center",
  },
});
export default TabsHeaderIcon;

