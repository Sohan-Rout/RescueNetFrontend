import { useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { Siren } from "lucide-react-native";
import Report from "./report";

export default function EmergencyButton() {
  const [showReport, setShowReport] = useState(false);

  return (
    <SafeAreaView className="flex items-center py-14">
        <View className="flex w-[22rem] h-[22rem] bg-neutral-100 rounded-full items-center justify-center">
      <View className="flex w-[18rem] h-[18rem] bg-red-400 rounded-full items-center justify-center">
        <View className="flex w-[16rem] h-[16rem] bg-red-500 rounded-full items-center justify-center">
          <TouchableOpacity 
            className="flex flex-col w-[15rem] h-[15rem] rounded-full bg-red-600 justify-center items-center"
            onPress={() => setShowReport(true)}
          >
            <Siren size={40} color="white" />
            <Text className="text-white font-semibold text-2xl">
              Emergency !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      {showReport && <Report visible={showReport} onClose={() => setShowReport(false)} />}
    </SafeAreaView>
  );
}