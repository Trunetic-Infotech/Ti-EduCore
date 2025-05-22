import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

const feesrecord = () => {

  const students = [
    { id: '1', name: 'Asad Shaikh', class: '1', date: '25/02/25', feesamount: '15,000'},
    { id: '2', name: 'Pooja Verma', class: '2', date: '25/02/25', feesamount: '15,000' },
    { id: '3', name: 'Rahul Kumar', class: '3', date: '25/02/25', feesamount: '15,000' },
    { id: '4', name: 'Sneha Patil', class: '4', date: '25/02/25', feesamount: '15,000' },
    { id: '5', name: 'Anjali Singh', class: '5', date: '25/02/25', feesamount: '15,000' },
    { id: '6', name: 'Rohit Sharma', class: '6', date: '25/02/25', feesamount: '15,000' },
  ];
  return (
     <ScrollView className="flex-1 bg-gray-100 p-4">

        <View className="items-center justify-center relative mb-4">
        <TextInput
          className="p-2 pl-10 border border-[#305495] rounded-xl w-[75%] bg-white"
          placeholder="Search...."
        />
        <Feather
          name="search"
          size={20}
          color="gray"
          style={{ position: 'absolute', left: '14%', zIndex: 1 }}
        />
      </View>
         {students.map((item) => (
           <View
             key={item.id}
             className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-200"
           >
               {/* Card */}
      <View className="bg-white rounded-xl shadow-md p-4 space-y-3">
      
        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Student Name</Text>
          <Text className="font-semibold text-gray-800">{item.name}</Text>
        </View>

          <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Student Id</Text>
          <Text className="font-semibold text-gray-800">{item.id}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Class</Text>
          <Text className="font-semibold text-gray-800">{item.class}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Date</Text>
          <Text className="font-semibold text-red-500">{item.date}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Fees Amount</Text>
          <Text className="font-semibold text-yellow-600">{item.feesamount}</Text>
        </View>

         <TouchableOpacity className="mt-4 bg-[#f1a621] rounded-xl py-2 px-4 items-center">
          <Text className="text-white font-bold">View Receipt</Text>
        </TouchableOpacity>
      </View>
           </View>
         ))}

    
       </ScrollView>
  )
}

export default feesrecord