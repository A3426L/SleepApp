import { Pressable, Text, SafeAreaView } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View} from "react-native";
import {Link} from 'expo-router';



export default function Home() {
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: 'skyblue'
    }}
    >
      <Text>home sheet.</Text>
      <Link href="/(pages)/chat" asChild>
        <Button
          title="go chat"
          color="#841584"
        />
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});