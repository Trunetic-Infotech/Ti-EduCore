import { Foundation } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const driverprofile = () => {

  const DATA = [
    { label: "Email ID", name: "email", value: "sanga@gmail.com" },
    { label: "Driver Name", name: "derivers_name", value: "Sangam" },
    { label: "Contact No", name: "phone_number", value: "9876453728" },
    { label: "Aadhaar Number", name: "aadhaar_number", value: "9878565784352" },
    { label: "Pan Card Number", name: "pan_Card", value: "BJEP0987" },
    { label: "Driving License", name: "licence_number", value: "9676789975467" },
    { label: "Driver Join Date", name: "date_of_join", value: "25/02/2025" },
    { label: "Experience", name: "experience", value: "3 Years" },
    { label: "Salary", name: "salary", value: "₹50,000" },
    { label: "Address", name: "address", value: "Pune" }
  ];

  // Remove the "Address" item for separate handling
  const nonAddressData = DATA.filter(item => item.label !== 'Address');
  const addressData = DATA.find(item => item.label === 'Address');

  return (
    <SafeAreaView>
      <View className="bg-white w-full mx-auto p-6 rounded-lg">
        <View className="flex items-center justify-center mb-6">
          <Text className="text-[#305395] text-2xl font-bold">Driver Profile</Text>
        </View>

        {/* Profile Picture Section */}
        <View className="mb-6 flex items-center">
          <Text className="text-lg font-semibold text-gray-700 mb-2">Profile Picture</Text>
          <View className="relative w-40 h-40">
            <Image
              className="w-full h-full rounded-full border-4 border-gray-300 shadow-lg"
              source={{
                uri: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
              }}
            />
            <TouchableOpacity className="bg-black p-2 absolute bottom-1 right-1 rounded-full">
              <Foundation name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* FlatList Section - Displaying items in 3 columns */}
        <FlatList
          data={nonAddressData}
          keyExtractor={item => item.label}
          numColumns={3} // Display the rest of the items in 3 columns
          renderItem={({ item }) => (
            <View className="w-1/3 p-2">
              <Text className="text-gray-500 text-sm font-medium">{item.label}</Text>
              <Text className="text-gray-900 text-xs font-semibold">{item.value}</Text>
            </View>
          )}
        />

        {/* Manually placing the Address item in the second column */}
        <View className="flex-row">
          {/* First column */}
          <View className="w-1/3 p-2" />
          
          {/* Second column */}
          <View className="w-1/3 p-2">
            <Text className="text-gray-500 text-sm font-medium">{addressData.label}</Text>
            <Text className="text-gray-900 text-xs font-semibold">{addressData.value}</Text>
          </View>
          
          {/* Third column */}
          <View className="w-1/3 p-2" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default driverprofile;
