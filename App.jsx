import "./global.css";
import { AuthProvider } from "./context/AuthContext";
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
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { supabase } from "./lib/supabaseClient";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      supabase.auth.exchangeCodeForSession(url);
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) {
        supabase.auth.exchangeCodeForSession(url);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <SafeAreaView className="flex-1 bg-white">
        <Navbar />
        <Hero />
        <View>
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </AuthProvider>
  );
}
