import "./global.css";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Navbar />
      <Hero />
      <View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
