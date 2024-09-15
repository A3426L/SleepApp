import { Pressable, Text, SafeAreaView } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View} from "react-native";
import {Link, useRouter} from 'expo-router';


export default function Demo_chat() {
  const router = useRouter();
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: 'skyblue'
    }}
    >
      <Text>demo_chat sheet.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});