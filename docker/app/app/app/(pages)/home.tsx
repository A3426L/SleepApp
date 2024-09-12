import { Pressable, Text, SafeAreaView } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View} from "react-native";
import {Link} from 'expo-router';



export default function Home() {
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'skyblue'
    }}
    >
      <View style={{
        flex: 1,
      }}>

      </View>
      <Text>home sheet.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});