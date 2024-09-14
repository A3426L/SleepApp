import { Pressable, Text, SafeAreaView } from "react-native";
import {StyleSheet} from 'react-native';
import { Button , Alert, View, TouchableOpacity} from "react-native";
import {Link} from 'expo-router';



export default function Home() {
  return (
    <View style={{
      flex: 1,
      justifyContent: "flex-start",
      //alignItems: "center",
      backgroundColor: 'skyblue'
    }}
    >
      <View style ={{
        flex:0.5,
        backgroundColor:'yellow',
        borderBottomLeftRadius:60,
        borderBottomRightRadius:60,
      }}>
      </View>
      <SafeAreaView style ={{
        flex:1,
        backgroundColor:'skyblue'
      }}>
        <SafeAreaView style ={{
          flex:1,
          backgroundColor:'white'
        }}>
          <Link href={"/(pages)/chat"} asChild>
            <TouchableOpacity onPress={() => {}} style={{
              margin: "10%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: 'gray',
              borderRadius: 20
            }}>
              <Text style={{
                fontSize: 30,
              }}>go chat</Text>
            </TouchableOpacity>
          </Link>
        </SafeAreaView>
        <SafeAreaView style ={{
          flex:1,
          backgroundColor:'red'
        }}>
          <Link href={"/(pages)/waiting"} asChild>
            <TouchableOpacity onPress={() => {}} style={{
              margin: "10%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: 'gray',
              borderRadius: 20
            }}>
              <Text style={{
                fontSize: 30,
              }}>go waiting</Text>
            </TouchableOpacity>
          </Link>
        </SafeAreaView>
      </SafeAreaView>
      
    </View>



    
  );
}

const styles = StyleSheet.create({

});