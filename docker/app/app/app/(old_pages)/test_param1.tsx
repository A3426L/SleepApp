// pages/Home.tsx
import { useRouter } from 'expo-router';
import { Button, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View>
      <Button
        title="次のページへ値を渡す (replace)"
        onPress={() => {
          router.replace({
            pathname: '/test_param1',
            params: { name: 'John'}, // パラメータを渡す
          });
        }}
      />
    </View>
  );
}
