import { Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Greeting = () => {
  const { user } = useContext(AuthContext);

  let greeting = '';
  if (user) {
    greeting = `Welcome, ${user.user_metadata.displayName}`;
  } else {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) {
      greeting = 'Good, Morning';
    } else if (hour < 18) {
      greeting = 'Good, Afternoon';
    } else {
      greeting = 'Good, Evening';
    }
  }

  return (
    <View className="px-6 py-4">
      <Text className="text-3xl font-medium">{greeting}</Text>
    </View>
  );
};

export default Greeting;