/*import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    // キーボードが表示されたとき
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true); // キーボードが表示された状態
      }
    );

    // キーボードが隠れたとき
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false); // キーボードが隠れた状態
      }
    );

    // コンポーネントがアンマウントされる際にリスナーを解除
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: '#001125',
          // キーボードが表示されているときはタブバーを非表示にする
          display: isKeyboardVisible ? 'none' : 'flex',
        },
      }}
    >
      <Tabs.Screen
        name="(pages)"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="test_tabs"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}*/
/////////////////////////////////////

/*
import { Stack, Tabs} from "expo-router";
import {useRouter} from 'expo-router';
import { Button, Modal ,TouchableOpacity,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Keyboard, StyleSheet } from 'react-native';


export default function RootLayout() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    // キーボードが表示されたとき
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // キーボードが表示されている状態
      }
    );

    // キーボードが隠れたとき
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // キーボードが隠れている状態
      }
    );

    // コンポーネントがアンマウントされる際にリスナーを解除
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (



    <Tabs screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarStyle:{backgroundColor:'#001125', display: isKeyboardVisible ? "flex" : "none"},
    }}>
      <Tabs.Screen
        name="(pages)"
        options={{
          title:"",
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="test_tabs"
        options={{
          title:"",
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
*/
//////////////////

//main


import { Stack, Tabs} from "expo-router";
import {useRouter} from 'expo-router';
import { Button, Modal ,TouchableOpacity,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarStyle:{backgroundColor:'#001125', display: "flex"},
    }}>
      <Tabs.Screen
        name="(pages)"
        options={{
          title:"",
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="test_tabs"
        options={{
          title:"",
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  );
}

//////////////////////////////////
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