//ip変更場所1個

import { View, SafeAreaView, StyleSheet, Text, ImageBackground } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from './GlobalContext';
import axios from 'axios';

const Title = () => {
    // const title = useLocalSearchParams();
    const home_image = require("@/assets/images/sheep_image_title.png");
    const { userIdglobal, setUserIdglobal } = useGlobalContext();
    const [ title, setTitle ] = useState();
    const [ error, setError] = useState();

    useEffect(() => {
        const postData = async () => {
            try {
<<<<<<< HEAD
              const response = await axios.post('http://192.168.11.5/api/title_test', {
=======
              const response = await axios.post('http://10.225.174.32/api/post_theme', {
>>>>>>> 347f89a6acfcd892f11b7e948e6e2fad959e2bdf
                user_id: userIdglobal,
              });
              setTitle(response.data.title);
              console.log(response.data.title);
            } catch (err) {
                console.log("error")
            }
        };
        postData();
    },[])

    return (
        <View style={style.container}>
            <SafeAreaView style={style.container}>
                
                <Text style={style.text}>今日の夢のテーマは。。。</Text>
                <View style={style.titleContainer}>
                    <Text style={style.title}>{title}</Text>
                </View>
                <ImageBackground source={home_image} style={style.NewImage}>
                    <View style={style.sleepContainer}>
                        <Text style={style.sleep}>おやすみなさい。</Text>
                    </View>
                </ImageBackground>
                
            </SafeAreaView>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#001125",
      },
      NewImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        marginTop: 20,
      },
      text: {
        fontSize: 27, // フォントサイズを24に設定
        fontWeight: '400', // フォントを太字に設定
        color: '#fff', // テキストの色をダークグレーに設定
        marginTop: 40,
        marginLeft: 30,
      },
      titleContainer: {
        backgroundColor: '#dde0f7',
        height: 100, // コンテナの高さ
        borderRadius: 15, // 角の丸み
        marginTop: 20,
        marginHorizontal: 30, // 左右のマージン
        padding: 25, // テキスト周りに25ピクセルのパディングを設定
        justifyContent: 'center', // コンテナ内のコンテンツを中央揃え
        alignItems: 'center', // コンテナ内のコンテンツを中央揃え
      },
      title: {
        fontSize: 20, // フォントサイズを20に設定
        fontWeight: 'bold', // フォントを太字に設定
        color: '#000', // テキストの色をブラックに設定
        textAlign: 'center', // テキストを中央揃え
      },
      sleepContainer: {
        backgroundColor: '#4b58c8',
        justifyContent: 'center',
        height: 70,
        marginBottom: 110,
        marginHorizontal: 30,
        borderRadius: 15
      },
      sleep: {
        fontSize: 17,
        fontWeight: '400',
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Arial'
      }
})

export default Title;
