import "./globals.css";
import Navbar from "./components/navbar";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
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
      <View className="flex-1 items-center justify-center">
        <Text className="font-poppins text-xl text-blue-600">
          Regular Poppins
        </Text>
        <Text className="font-poppins-medium text-xl text-green-600">
          Medium Poppins
        </Text>
        <Text className="font-poppins-bold text-xl text-red-600">
          Bold Poppins
        </Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}