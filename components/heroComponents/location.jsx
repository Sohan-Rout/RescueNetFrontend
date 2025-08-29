import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MapPinHouse } from 'lucide-react-native';
import * as ExpoLocation from 'expo-location';
import { supabase } from '../../lib/supabaseClient';

const LocationTracker = () => {
  const [tracking, setTracking] = useState(false);
  const [coords, setCoords] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      }
    };
    fetchUser();
  }, []);

  const pushLocation = async () => {
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    setTracking(true);

    await ExpoLocation.watchPositionAsync(
  {
    accuracy: ExpoLocation.Accuracy.High,
    timeInterval: 5000,
    distanceInterval: 0,
  },
  async (loc) => {
    const { latitude, longitude } = loc.coords;
    setCoords({ latitude, longitude });

    if (!userId) return;

    await supabase
      .from("user_location")
      .upsert(
        {
          user_id: userId,
          latitude,
          longitude,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );
  }
);
  };

  return (
    <View className="flex justify-center px-6 items-center">
      {/* Location Icon triggers tracking */}
      <TouchableOpacity onPress={pushLocation}>
        <MapPinHouse size={25} color="#cc785c" />
      </TouchableOpacity>

      <View className="flex flex-row items-center mt-2">
        <View
          className={`w-3 h-3 rounded-full ${
            tracking ? 'bg-green-500 shadow-md shadow-green-500' : 'bg-red-500'
          }`}
        />
        <Text className="ml-2">
          {tracking ? 'Live tracking active' : 'Not tracking'}
        </Text>
      </View>

      {coords && (
        <Text className="mt-1 text-xs text-gray-600">
          Lat: {coords.latitude.toFixed(5)}, Lng: {coords.longitude.toFixed(5)}
        </Text>
      )}
    </View>
  );
};

export default LocationTracker;