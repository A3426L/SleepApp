import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(pages)/home" options={{
        title: "Home",
        headerBackVisible: false,
        gestureEnabled: false,
        headerStyle:{
          backgroundColor: "red",
        }
      }}/>
    </Stack>
  );
}
