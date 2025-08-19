import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { PhoneCall, Plus, RefreshCcw } from "lucide-react-native";
import * as Contacts from "expo-contacts";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const handleSelectContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContacts(data);
        setIsModalVisible(true);
      }
    }
  };

  const toggleContact = (contact) => {
    const alreadySelected = selectedContacts.find((c) => c.id === contact.id);
    if (alreadySelected) {
      setSelectedContacts(selectedContacts.filter((c) => c.id !== contact.id));
    } else {
      if (selectedContacts.length < 5) {
        setSelectedContacts([...selectedContacts, contact]);
      }
    }
  };

  return (
    <View className="flex items-center bg-neutral-800 rounded-t-[25px] h-full">
      <View className="flex flex-row gap-2 justify-center items-center bg-black my-4 px-6 rounded-full py-2">
        <PhoneCall color="#cc785c" size={20} />
        <Text className="flex text-xl text-white">Emergency Contact</Text>
      </View>
      <View className="flex flex-row justify-between w-full px-10 border-b pb-4">
        <View>
        <TouchableOpacity onPress={handleSelectContact} className="flex flex-row gap-1 items-center">
          <Plus color="white" size={25} /><Text className="text-lg text-white">Add</Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={() => {console.log("Sync contacts pressed");}}>
          <RefreshCcw color="#cc785c" size={25} />
        </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 24,
              borderRadius: 12,
              width: "85%",
              maxHeight: "80%",
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 16, marginBottom: 16 }}
            >
              Select any 5 contacts of your choice
            </Text>
            <ScrollView style={{ marginBottom: 16 }}>
              {contacts.map((item) => {
                const isSelected = selectedContacts.some(
                  (c) => c.id === item.id
                );
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: isSelected ? "#e0f7fa" : "transparent",
                      borderRadius: 6,
                      marginBottom: 2,
                    }}
                    onPress={() => toggleContact(item)}
                  >
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        borderWidth: 2,
                        borderColor: "#2196f3",
                        borderRadius: 4,
                        marginRight: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isSelected ? "#2196f3" : "white",
                      }}
                    >
                      {isSelected && (
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          ✓
                        </Text>
                      )}
                    </View>
                    <Text style={{ flex: 1 }}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <Button title="Done" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
      {selectedContacts.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
            Selected Contacts:
          </Text>
          {selectedContacts.map((contact) => (
            <View key={contact.id} style={{ marginBottom: 6 }}>
              <Text>Name: {contact.name}</Text>
              <Text>
                Phone:{" "}
                {contact.phoneNumbers && contact.phoneNumbers.length > 0
                  ? contact.phoneNumbers[0].number
                  : "N/A"}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ContactList;
