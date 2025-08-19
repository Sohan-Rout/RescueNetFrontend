import { SafeAreaView } from "react-native-safe-area-context";
import Greeting from "./heroComponents/greeting";
import { Text, View } from "react-native";

export default function Hero(){
    return(
        <SafeAreaView>
            <View>
                <Greeting/>
            </View>
        </SafeAreaView>
    );
}