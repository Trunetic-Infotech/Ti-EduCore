import { AntDesign, Feather, FontAwesome6, Foundation } from '@expo/vector-icons';
import React, { Component } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";


const driverprofile = () => {

  const data = [
    {
      label: "Email ID",
      value: "asad@gmail.com",
    },
    {
      label: "Driver Name",
      value: "Asad Shaikh",
    },
    {
      label: "Contact No.",
      value: "8868542153",
    },
    {
      label: "Aadhar Card Number",
      value: "666688554477",
    },

    {
      label: "Pan Card Number",
      value: "BJEP12345",
    },
    {
      label: "Driving License",
      value: "Data"
    },
    {
      label: "Driver Join Date",
      value: "24/03/2025",
    },
    {
      label: "Admission Date",
      value: "24/03/2025",
    },
    {
      label: "Experience",
      value: "5 years",
    },
    {
      label: "Salary",
      value: "15,000",
    },
    {
      label: "Address",
      value: "Thane, Maharashtra, India",
    },

  ]

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      ListHeaderComponent={
        <View className='p-2'>
          <View className='items-center m-2'>
            <Text className="text-2xl font-bold text-[#305495]">Driver Profile</Text>
          </View>

          <View className='items-center gap-2 mb-4'>
            <Text className='font-bold'>Profile Picture</Text>
            <Image
              className='rounded-full h-[200px] w-[200px]'
              source={require("../../../../../assets/images/profile.jpg")}
            />
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <View className='gap-2' style={{ flex: 1, margin: 8 }}>
          <Text className='text-center text-gray-500'>{item.label}</Text>
          <Text className='text-center font-bold'>{item.value}</Text>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }} // for spacing at the bottom
      showsVerticalScrollIndicator={false}
    />

  )
}


export default driverprofile;
