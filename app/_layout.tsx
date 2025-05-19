import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux"; // ✅ Import Redux Provider
import { store } from "../redux/store"; // ✅ Import your store
import "../global.css"

export default function RootLayout() {
  return (
    <Provider store={store}> {/* ✅ Wrap everything with Provider */}
    
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </Provider>
  );
}
