import { Pressable, Text, SafeAreaView } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View, TouchableOpacity} from "react-native";
import {Link,useRouter} from 'expo-router';
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabsHeaderText from "../components/TabsHeaderText";

export default function Home() {
  const router = useRouter();
  return (
      <SafeAreaView style = {styles.Container}>
        <View style = {styles.TabsHeaderContainer}>
          <View style = {styles.TabsHeaderTextContainer}>
            <TabsHeaderText/>
          </View>
          <TouchableOpacity style={styles.TabsHeaderIcon}>
            <Ionicons name="person-circle" />
          </TouchableOpacity>
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
    backgroundColor: "purple",
    flexDirection: "row",
    alignItems: "center",
  },
  TabsHeaderTextContainer: {
    flex: 0.8,
    justifyContent: "center", 
  },
  TabsHeaderIcon: {
    flex: 0.2,
    justifyContent: "center", 
    alignItems: "center",
  },
});
