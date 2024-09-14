import { Stack} from "expo-router";
import {useRouter} from 'expo-router';
import { Modal } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="home" options={{
        title: "Home",
        headerShown: false,
        headerBackVisible: false,
        gestureEnabled: false,
        headerStyle:{
          backgroundColor: "red",
        }
      }}/>
      <Stack.Screen name="waiting" options={{
        headerShown: false,
        headerBackVisible: false,
        gestureEnabled: false,
      }}/>
      <Stack.Screen name="demo_chat" options={{
        title: "demo_chat",
        //headerBackVisible: false,
        //gestureEnabled: false,
      }}/>

    </Stack>
  );
}
