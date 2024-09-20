import { Stack} from "expo-router";
import {useRouter} from 'expo-router';
import { Modal } from "react-native";
import { GlobalProvider } from './GlobalContext';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const router = useRouter();
  const [loaded] = useFonts({
    DenkOne: require('../assets/fonts/DenkOne-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  
  return (
    <GlobalProvider>
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
      <Stack.Screen name="title_page" options={{
        headerShown: false,
        headerStyle:{
          backgroundColor:'#9370db',
        }
        //headerBackVisible: false,
        //gestureEnabled: false,
      }}/>
      <Stack.Screen name="Loading" options={{
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
        <Stack.Screen name="EditPost" options={{
          headerShown: false,
          contentStyle:{
            borderTopRightRadius:30,
            borderTopLeftRadius:30,
          },
          headerStyle:{
            backgroundColor:'#9370db',
          },
          presentation:"modal"
          //headerBackVisible: false,
          //gestureEnabled: false,
        }}/>
    </Stack>
    </GlobalProvider>
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