import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, Feather } from '@expo/vector-icons';

const allevents = () => {

  const events = [
    { id: '1', name: 'Pooja', date: '25/02/25', starttime: '2025-04-25T18:30:00.000Z', description: 'Hello Everyone' },
    { id: '1', name: 'Pooja', date: '25/02/25', starttime: '2025-04-25T18:30:00.000Z', description: 'Hello Everyone' },
    { id: '1', name: 'Pooja', date: '25/02/25', starttime: '2025-04-25T18:30:00.000Z', description: 'Hello Everyone' },
    { id: '1', name: 'Pooja', date: '25/02/25', starttime: '2025-04-25T18:30:00.000Z', description: 'Hello Everyone' },
    { id: '1', name: 'Pooja', date: '25/02/25', starttime: '2025-04-25T18:30:00.000Z', description: 'Hello Everyone' },
    { id: '1', name: 'Pooja', date: '25/02/25', starttime: '2025-04-25T18:30:00.000Z', description: 'Hello Everyone' },
  ];
  return (
    <ScrollView className="flex-1 bg-gray-100 p-4" nestedScrollEnabled={true}>

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
      {events.map((item) => (
        <View
          key={item.id}
          className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-200"
        >
          {/* Card */}
         

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Event Name</Text>
              <Text className="font-semibold text-gray-800">{item.name}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Event Date</Text>
              <Text className="font-semibold text-gray-800">{item.date}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Event Start Time</Text>
              <Text className="font-semibold text-gray-800">{item.starttime}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Event Description</Text>
              <Text className="font-semibold text-yellow-600">{item.description}</Text>
            </View>
            <TouchableOpacity className="mt-4 bg-[#f1a621] rounded-xl gap-2 py-2 px-4 items-center flex-row justify-center space-x-2">
              <Text className="text-white font-bold">View Event Image </Text>
              <Entypo name="eye" size={24} color="white" />
            </TouchableOpacity>
          </View>
    
      ))}


    </ScrollView>
  )
}

export default allevents