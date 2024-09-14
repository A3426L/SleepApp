import { Stack, Tabs} from "expo-router";
import {useRouter} from 'expo-router';
import { Modal } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  return (
    <Tabs>
      <Tabs.Screen
        name="(pages)"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="test_tabs"
        options={{
          title: 'test_tabs' ,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

/*
import { Stack} from "expo-router";
import {useRouter} from 'expo-router';
import { Modal } from "react-native";

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
      <Stack.Screen name="(pages)/test_modal" options={{
        title: "demo_chat",
        presentation: "modal",
        animation:"slide_from_left"
        //headerBackVisible: false,
        //gestureEnabled: false,
      }}/>
    </Stack>
  );
}
*/