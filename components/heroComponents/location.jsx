import React from 'react';
import { View, Text } from 'react-native';
import { MapPinHouse } from 'lucide-react-native';

const Location = () => {
  return (
    <View className="flex justify-center px-6">
      <MapPinHouse size={25} color="#cc785c" />
    </View>
  );
};

export default Location;