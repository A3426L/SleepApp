import { Stack } from "expo-router";
import {useRouter} from 'expo-router';

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="(pages)/home" options={{
        title: "Home",
        headerShown: false,
        headerBackVisible: false,
        gestureEnabled: false,
        headerStyle:{
          backgroundColor: "red",
        }
      }}/>
      <Stack.Screen name="(pages)/waiting" options={{
        headerShown: false,
        headerBackVisible: false,
        gestureEnabled: false,
      }}/>
      <Stack.Screen name="(pages)/demo_chat" options={{
        title: "demo_chat",
        //headerBackVisible: false,
        //gestureEnabled: false,
      }}/>
    </Stack>
  );
}
