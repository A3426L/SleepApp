import { Image, StyleSheet, Platform, Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomeScreen() {
  // データを保存するためのステートを定義
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // コンポーネントがマウントされた時にAPIリクエストを実行
  useEffect(() => {
    axios
      .get('http://172.16.42.22/api/data')  // Flask APIエンドポイント
      .then(response => {
        setMessage(response.data.message);  // response.data.messageをステートに保存
        setLoading(false);  // ローディング状態を解除
      })
      .catch(err => {
        setError(err.message);  // エラーが発生した場合の処理
        setLoading(false);
      });
  }, []);
  const test = ()=>{axios.get('http://172.16.42.22/api/data')
      .then(test_data=>{
        console.log(test_data.data)})
      .catch(error => console.error("error",error))}
      

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">uuu!</ThemedText>
        <HelloWave />
        <Button title='test' onPress={test}/>
      </ThemedView>

      {/* APIのレスポンスを表示 */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">API Response:</ThemedText>
        {loading ? (
          <ThemedText>Loadin...</ThemedText>
        ) : error ? (
          <ThemedText>Erro: {error}</ThemedText>
        ) : (
          <ThemedText>{message}</ThemedText>  // 取得したmessageを表示
        )}
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
