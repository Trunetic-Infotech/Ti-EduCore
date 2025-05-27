import { AntDesign, Feather, FontAwesome6, Foundation } from '@expo/vector-icons';
import React, { Component } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux';


const driverprofile = () => {
const user=useSelector((state)=>state.auth.user);
console.log(user);
  const data = [
    {
      label: "Email ID",
      value:  user ? user.email:"loading",
    },
    {
      label: "Driver Name",
      value:  user ? user.derivers_name:"loading",
    },
    {
      label: "Contact No.",
      value: user ? user.phone_number:"loading",
    },
    {
      label: "Aadhar Card Number",
      value: user ? user.aadhaar_number:"loading",
    },

    {
      label: "Pan Card Number",
      value: user ? user.pan_Card:"loading",
    },
    {
      label: "Driving License",
      value: user ? user.licence_number:"loading"
    },
    {
      label: "Driver Join Date",
      value: user ? user.date_of_join:"loading",
    },
    {
      label: "Admission Date",
      value: "24/03/2025",
    },
    {
      label: "Experience",
      value: user ? user.experience:"loading",
    },
    {
      label: "Salary",
      value: user ? user.salary:"loading",
    },
    {
      label: "Address",
      value: user ? user.address:"loading",
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
              source={require("../../../../../assets/images/Profile.jpg")}
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
