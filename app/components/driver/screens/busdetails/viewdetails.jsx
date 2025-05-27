import React, { Component } from 'react'
import { FlatList, Image, Text, View } from 'react-native'

const viewdetails=()=> {
      const details = [
    {
      label: "Driver Name",
      value: "Asad Shaikh",
    },
     {
      label: "Vehicle Name",
      value: "Asad Shaikh",
    },
    {
      label: "Vehicle Number",
      value: "666688554477",
    },

    {
      label: "RC Number",
      value: "BJEP12345",
    },
    {
      label: "Bus Color",
      value: "Data"
    },
  ]

    return (
     <FlatList
           data={details}
           keyExtractor={(item, index) => index.toString()}
           numColumns={2}
           ListHeaderComponent={
             <View className='p-2'>
               <View className='items-center m-2'>
                 <Text className="text-2xl font-bold text-[#305495]">Bus Details</Text>
               </View>
     
               <View className='items-center gap-2 mb-4'>
                 <Text className='font-bold'>Bus Picture</Text>
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


export default viewdetails
