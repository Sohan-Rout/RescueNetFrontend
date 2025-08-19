import { SafeAreaView } from "react-native-safe-area-context";
import Greeting from "./heroComponents/greeting";
import Location from "./heroComponents/location";
import EmergencyButton from "./heroComponents/emergencyButton";
import ContactList from "./heroComponents/contactList";
import { Text, View } from "react-native";

export default function Hero(){
    return(
        <SafeAreaView>
            <View className="flex flex-row justify-between">
                <Greeting/>
                <Location/>
            </View>
            <View>
                <EmergencyButton />
            </View>
            <View>
                <ContactList />
            </View>
        </SafeAreaView>
    );
}