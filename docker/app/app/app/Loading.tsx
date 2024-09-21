//ip変更場所2個

import { View, SafeAreaView, StyleSheet, Text, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from './GlobalContext';
import axios from 'axios';
import { MATCHING_START ,matching_start, MATCHING,matching, postData} from '@/components/ApiFunc';

const Loading = () => {
    // const title = useLocalSearchParams();
    const home_image = require("@/assets/images/sheep_image_title.png");
    const { userIdglobal, setUserIdglobal } = useGlobalContext();
    const [ title, setTitle ] = useState("");
    const [ error, setError] = useState();
    const router = useRouter();
    //////////////////////////////////
    const matching_startAPI = async (param:postData) => {
      try {
        // test関数を非同期で呼び出し、結果を取得
        const buf: MATCHING_START | undefined = await matching_start(param);
        console.log(buf?.flag);
        setTitle(String(buf?.flag));
        ()=>{console.log("aaaaaaaaaaaaaaaaa",buf?.flag);};
      } catch (error) {
        console.error('エラーが発生しました:', error);
      }
    };
    useEffect(() => {
      matching_startAPI({user_id:String(userIdglobal)});
    },[]);


    const matchingAPI = async (param:postData) => {
      try {
        // test関数を非同期で呼び出し、結果を取得
        const buf: MATCHING| undefined = await matching(param);
        if(buf?.flag === "true"){
          console.log("アニメーション終了");
        // ここに画面遷移などの処理を追加
        router.replace({pathname:'/chat'}); // 例: react-routerを使用した画面遷移
        }

      } 
      catch (error) {
        console.error('エラーが発生しました:', error);
      }
    };
    useEffect(() => {
      // 1秒ごとにPOSTリクエストを送信
      const intervalId = setInterval(() => {
        if(title === "true"){
          matchingAPI({user_id:String(userIdglobal)});
        }
      }, 1000); // 1000ミリ秒 = 1秒
  
      // コンポーネントがアンマウントされたときにインターバルをクリア
      return () => clearInterval(intervalId);
    },[title]);
    /////////////////////////////////////

    // useEffect(() => {
    //   console.log("aaaaaaaaaaaaaaaaa");
    //     const postData = async () => {
    //         try {
    //           const response = await axios.post('http://172.16.42.31/matching_start', {
    //             user_id: userIdglobal,
    //           });
    //           console.log(response.data.flag);
    //           setTitle(response.data.flag);
    //           console.log("aaaaaaaaaaaaaaaaa",response.data.flag);
    //         } catch (err) {
    //             console.log("error")
                
    //         }
    //     };
    //     postData();
    // },[])

    // useEffect(() => {
    //     // POSTリクエストを送信する関数
    //     const sendPostRequest = () => {
    //       console.log('0000000000')
    //       axios.post('http://172.16.42.31/matching', {
    //         // 送信するデータ
    //         user_id: userIdglobal,
    //       })
    //       .then(response => {
    //         console.log(response.data.flag);
    //         if(response.data.flag === "true"){
    //           console.log("アニメーション終了");
    //         // ここに画面遷移などの処理を追加
    //         router.replace({pathname:'/chat'}); // 例: react-routerを使用した画面遷移
    //         }
    //       })
    //       .catch(error => {
    //         console.error('POST failed:', error);
    //       });
    //     };
        
      
    //     // 1秒ごとにPOSTリクエストを送信
    //     const intervalId = setInterval(() => {
    //       if(title === "true"){
    //         sendPostRequest();
    //       }
    //     }, 1000); // 1000ミリ秒 = 1秒
    
    //     // コンポーネントがアンマウントされたときにインターバルをクリア
    //     return () => clearInterval(intervalId);
    
    //   }, [title]);

    return (
        <View style={style.container}>
            <SafeAreaView style={style.container}>
                
                <Text style={style.text}>マッチング中...</Text>
                <View style={style.titleContainer}>
                    <Text style={style.title}>おやすみの前に</Text>
                </View>
                <ImageBackground source={home_image} style={style.NewImage}>
                    <View style={style.sleepContainer}>
                        <Text style={style.sleep}>少々お待ちください。。</Text>
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

export default Loading;
