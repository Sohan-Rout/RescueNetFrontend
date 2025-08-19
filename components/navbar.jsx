import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { Sun, Cloud, CloudRain, Snowflake, CloudLightning } from "lucide-react-native";
import {Menu} from "lucide-react-native";

const Navbar = () => {
  const [weather, setWeather] = useState({ temp: null, type: null, icon: null });
  const [menuVisible, setMenuVisible] = useState(false);

  const getWeatherIcon = (type) => {
  switch (type) {
    case "Clear":
      return <Sun size={28} color="white" />;
    case "Clouds":
      return <Cloud size={28} color="white" />;
    case "Rain":
      return <CloudRain size={28} color="white" />;
    case "Snow":
      return <Snowflake size={28} color="white" />;
    case "Thunderstorm":
      return <CloudLightning size={28} color="white" />;
    default:
      return null;
  }
};

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
        setWeather({
          temp: Math.round(data.main.temp),
          type: data.weather[0].main,
          icon: data.weather[0].icon
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <SafeAreaView className="flex flex-row items-center justify-between bg-black shadow h-16 px-4">
      <View className="relative">
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} className="p-2">
          <Text className="text-xl text-white font-bold">
            <Menu color="white"/>
          </Text>
        </TouchableOpacity>
        {menuVisible && (
          <View className="flex flex-col space-y-2 absolute top-16 left-0 bg-white shadow w-40 px-4 py-2 rounded z-10">
            <TouchableOpacity className="w-full items-center py-2 bg-black rounded">
              <Text className="text-white font-semibold">Login / Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full items-center py-2">
              <Text className="text-black">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full items-center py-2">
              <Text className="text-black">Customer Care</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full items-center py-2">
              <Text className="text-black">FAQ</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View className="flex-row items-center">
        <Text className="text-white text-lg mr-2">
          {weather.temp !== null ? `${weather.temp}°C` : '...'}
        </Text>
        {weather.type && (
          getWeatherIcon(weather.type)
        )}
      </View>
    </SafeAreaView>
  );
};

export default Navbar;