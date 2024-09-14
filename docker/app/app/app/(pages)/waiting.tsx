import { Pressable, Text, SafeAreaView } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View, TouchableOpacity} from "react-native";
import {Link,useRouter} from 'expo-router';
import { Modal } from "react-native";


export default function Home() {
  const router = useRouter();
  return (
    <View style={{
      flex: 1,
      justifyContent: "flex-start",
      //alignItems: "center",
      backgroundColor: 'skyblue'
    }}
    >

      <SafeAreaView style ={{
        flex:1,
        backgroundColor:'skyblue'
      }}>

        <Text>waiting sheet.</Text>
        <Button title="go demo_chat" onPress={() => {router.replace("/demo_chat");}}/>
      </SafeAreaView>
      
    </View>
  );
}

const styles = StyleSheet.create({

});