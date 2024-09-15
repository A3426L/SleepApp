import { Stack} from "expo-router";
import {useRouter} from 'expo-router';
import { Modal } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack>

      <Stack.Screen name="(tabs)" options={{
        headerShown: false,
        headerBackVisible: false,
        //gestureEnabled: false,
      }}/>
      <Stack.Screen name="chat" options={{
        headerShown: false,
        headerStyle:{
          backgroundColor:'#9370db',
        }
        //headerBackVisible: false,
        //gestureEnabled: false,
      }}/>
      <Stack.Screen name="first_page" options={{
        headerShown: false,
        headerStyle:{
          backgroundColor:'#9370db',
        }
        //headerBackVisible: false,
        //gestureEnabled: false,
      }}/>
      <Stack.Screen name="account_two" options={{
        headerShown: false,
        headerStyle:{
          backgroundColor:'#9370db',
        }
        //headerBackVisible: false,
        //gestureEnabled: false,
      }}/>
      <Stack.Screen name="username" options={{
        headerShown: false,
        headerStyle:{
          backgroundColor:'#9370db',
        }
        //headerBackVisible: false,
        //gestureEnabled: false,
      }}/>

    </Stack>
  );
}
/*
      <Stack.Screen name="home" options={{
        title: "Home",
        headerShown: false,
        headerBackVisible: false,
        gestureEnabled: false,
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
      <Stack.Screen name="test_keyboard" options={{
        headerShown: false,
      }}/>














*/