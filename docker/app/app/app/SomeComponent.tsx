import React from 'react';
import { Button , Alert, View, TouchableOpacity, Text, ImageBackground} from "react-native";
import { useGlobalContext } from './GlobalContext';
import {Link,useRouter} from 'expo-router';

export const SomeComponent: React.FC = () => {
  const { userIdglobal, setUserIdglobal } = useGlobalContext();

  return (
    <View>
      <Link href={"/(tabs)/home"} asChild>
                <TouchableOpacity style={{flex:0.35, backgroundColor: "#4b58c8",justifyContent: 'center',marginBottom: "20%",marginHorizontal:"7%", borderRadius:20}}>
                  <Text style={{color: "white",fontSize:25,textAlign:"center"}}>
                    夢を決める
                  </Text>
                </TouchableOpacity>
              </Link>
      <Text>Current User ID: {userIdglobal}</Text>
      <Button title="Set User ID" onPress={() => setUserIdglobal('111111')} />
    </View>
  );
};

export default SomeComponent;