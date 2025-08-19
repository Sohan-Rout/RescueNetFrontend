import { Text, View } from "react-native";

const Greeting = () => {
  const now = new Date();
  const hour = now.getHours();
  let greeting = '';
  if (hour < 12) {
    greeting = 'Good, Morning';
  } else if (hour < 18) {
    greeting = 'Good, Afternoon';
  } else {
    greeting = 'Good, Evening';
  }
  return (
    <View className="px-6 py-4">
      <Text className="text-2xl font-semibold">{greeting}</Text>
    </View>
  );
};

export default Greeting;