import React, { useState } from 'react';
import { View, Text, TouchableOpacity ,FlatList,StyleSheet} from 'react-native';
import { useRouter } from 'expo-router'; // ルーターを使いたい場合はここでインポート
import { test ,postView_group } from '@/components/ApiFunc';



export default function YourComponent() {
  const [apiResult, setApiResult] = useState<postView_group[] | undefined>(undefined); // API結果のステート

  const handleSignUp = async () => {
    try {
      // test関数を非同期で呼び出し、結果を取得
      const buf: postView_group[] | undefined = await test({ user_id: "testtest" });

      // 結果をステートにセット
      setApiResult(buf);
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  };

  // データがない場合はプレースホルダーを表示
  const renderPostItem = ({ item }: { item: { id: string; user_name: string; theme: string; post_txt: string } }) => (
    <View style={styles.postItem}>
      <Text style={styles.title}>ID: {item.id}</Text>
      <Text style={styles.subtitle}>User Name: {item.user_name}</Text>
      <Text style={styles.subtitle}>Theme: {item.theme}</Text>
      <Text style={styles.postText}>Post: {item.post_txt}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity
        onPress={handleSignUp}
        style={{
          backgroundColor: "#4b58c8",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Sign up</Text>
      </TouchableOpacity>

      {/* API結果をFlatListで表示 */}
      {apiResult? (
        <FlatList
          data={apiResult}  // ここに表示するデータを渡す
          renderItem={renderPostItem}      // 各アイテムの表示方法
          keyExtractor={(item) => item.id} // アイテムのキー
        />
      ) : (
        <Text>No data received yet</Text>  // データがまだない場合の表示
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  postItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
  postText: {
    fontSize: 14,
    color: '#333',
  },
});

