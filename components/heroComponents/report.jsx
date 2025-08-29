import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { MapPin } from "lucide-react-native";

const Report = ({ visible, onClose }) => {
  const [location, setLocation] = useState('');
  const handleFetchLocation = () => {
    // Placeholder for fetching location logic
    setLocation("Fetched current location");
  };
  const [disasterType, setDisasterType] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState(null);

  const handleAttachMedia = () => {
    // Placeholder for media attachment logic
    setMedia('media-placeholder');
  };

  const handleSubmit = () => {
    // Placeholder for submit logic
    onClose();
    setLocation('');
    setDisasterType('');
    setDescription('');
    setMedia(null);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white p-6 rounded-xl w-11/12">
          <Text className="text-2xl font-bold text-center mb-4">Report a Disaster</Text>
          <View className="flex-row items-center mb-3">
            <TextInput
              className="flex-1 border border-gray-300 rounded-md p-3 bg-gray-50 text-base"
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />
            <TouchableOpacity className="ml-2" onPress={handleFetchLocation}>
              <MapPin size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-3 bg-gray-50 text-base"
            placeholder="Disaster Type"
            value={disasterType}
            onChangeText={setDisasterType}
          />
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-3 bg-gray-50 text-base h-24 text-top"
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity className="bg-gray-200 p-3 rounded-md items-center mb-4" onPress={handleAttachMedia}>
            <Text className="text-gray-800 text-base">Attach Media</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-black rounded-xl py-3 items-center"
            onPress={handleSubmit}
          >
            <Text className="text-white font-semibold">Submit Report</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-2 bg-red-500 rounded-xl shadow-xl py-3 items-center" onPress={onClose}>
            <Text className="text-white">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Report;