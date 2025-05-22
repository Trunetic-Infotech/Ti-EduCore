import { View, Text, Image, FlatList, ScrollView } from 'react-native'
import React from 'react'

const studentprofile = () => {

  const data = [
    {
      label: "Student Roll No",
      value: "101",
    },
    {
      label: "Student Name",
      value: "Asad Shaikh",
    },
    {
      label: "Contact No.",
      value: "8868542153",
    },
    {
      label: "GR No",
      value: "ADM1001",
    },
    {
      label: "Email ID",
      value: "asad@gmail.com",
    },
    {
      label: "Date Of Birth",
      value: "24/03/2025",
    },
    {
      label: "Leaving Certificate",
      value: "Data"
    }, 
    {
      label: "Aadhar Card Number",
      value: "666688554477",
    }, 
    {
      label: "Admission Date",
      value: "24/03/2025",
    },
    {
      label: "Current Class",
      value: "1",
    },
    {
      label: "Sub Class",
      value: "A",
    },
    {
      label: "Status",
      value: "Active",
    },
    {
      label: "Address",
      value: "Thane",
    }, 
    
  ]

  // console.log(data);

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      ListHeaderComponent={
        <View className='p-2'>
          <View className='items-center m-2'>
            <Text className="text-2xl font-bold text-[#305495]">Student Profile</Text>
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



export default studentprofile;