import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

const Navbar = () => {
  const [temperature, setTemperature] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_OPENWEATHER_API_KEY;
        if (!apiKey) {
          console.error('OpenWeather API key is missing.');
          return;
        }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`);
        const data = await response.json();
        setTemperature(Math.round(data.main.temp));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <SafeAreaView>
      <View className="flex flex-col p-4 bg-white shadow h-16">
        <View>
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} className="p-2">
            <Text className="text-xl font-bold text-black">☰</Text>
          </TouchableOpacity>
          {menuVisible && (
            <View className="absolute top-16 left-0 bg-white shadow p-4 rounded">
              <TouchableOpacity className="py-1">
                <Text className="text-black">Login / Signup</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-1">
                <Text className="text-black">Home</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-1">
                <Text className="text-black">Customer Care</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-1 pl-4">
                <Text className="text-black">FAQ</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <Text className="text-black">{temperature !== null ? `${temperature}°C` : '...'}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Navbar;