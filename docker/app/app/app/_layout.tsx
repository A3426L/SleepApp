import { Stack, Tabs} from "expo-router";
import {useRouter} from 'expo-router';
import { Button, Modal ,TouchableOpacity,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "pink",
      tabBarStyle:{backgroundColor:"purple"},
    }}>
      <Tabs.Screen
        name="(pages)"
        options={{
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="test_tabs"
        options={{
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          )
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