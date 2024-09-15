import { Redirect, useRootNavigationState } from 'expo-router';

export default function Page() {
  const rootNavigationState = useRootNavigationState();

  // ルートナビゲーターが準備できている場合にのみ、リダイレクトをレンダリング
  if (rootNavigationState?.key == null) return null;

  return <Redirect href={"/first_page"} />;
}