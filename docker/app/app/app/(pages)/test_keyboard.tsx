import { Pressable, Text, SafeAreaView } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View, TouchableOpacity} from "react-native";
import {Link,useRouter,} from 'expo-router';
import { KeyboardAvoidingView, TextInput, Platform, TouchableWithoutFeedback, Keyboard,} from "react-native";
import { useState, useEffect } from "react";
import { Header, } from "react-native/Libraries/NewAppScreen";

export default function Home() {
  const [text, onChangeText] = useState('Useless Text');


  const [value, setValue] = useState("");
  const handleTextChange = (text: string) => {
    // 正規表現で英数字のみ許可
    const filteredText = text.replace(/[^a-zA-Z0-9]/g, "");
    setValue(filteredText);
  };

  return (

    <SafeAreaView style ={{
      flex:1,
      backgroundColor:'skyblue'
    }}>
     <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.select({
        ios: 25,
      })}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Header</Text>
          <TextInput placeholder="Username" style={styles.textInput} value={value} keyboardType="email-address" onChangeText={handleTextChange}/>
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});




/*

<SafeAreaView style ={{
      flex:1,
      backgroundColor:'skyblue'
    }}>
      <KeyboardAvoidingView style={{
        flex:1,
      }}>
        <View style={{
          flex:1,
        }}>
          <Text style={{
            fontSize: 50,
          }}>
            aaaaaaaaaaaaaaaaa
          </Text>
        </View>

        <View style={{
          flex:0.5,
        }}>



          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />



        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>


*/