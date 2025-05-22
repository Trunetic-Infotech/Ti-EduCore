import { View, Text, Image, FlatList, ScrollView } from 'react-native'
import React from 'react'

const teacherprofile = () => {

  const data = [
   
    {
      label: "Teacher Name",
      value: "Asad Shaikh",
    },
    {
      label: "Contact No.",
      value: "8868542153",
    },
  
    {
      label: "Date Of Join",
      value: "24/03/2025",
    },
    {
      label: "Experiance",
      value: "8 Years",
    }, 
   
  
    {
      label: "Current Class",
      value: "6",
    },
    {
      label: "Division",
      value: "A",
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
            <Text className="text-2xl font-bold text-[#305495]">Teacher Profile</Text>
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
        <View className='gap-1' style={{ flex: 1, margin: 8 }}>
          <Text className='text-center text-gray-500'>{item.label}</Text>
          <Text className='text-center font-bold'>{item.value}</Text>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }} // for spacing at the bottom
      showsVerticalScrollIndicator={false}
    />
    
  )
}



export default teacherprofile