import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Entypo, Feather } from '@expo/vector-icons';

const leaveshistory = () => {

  const leaves = [
    { id: '1', leavetype: 'Pooja', reason: 'Personal reason', leavetaken: '4', appliedon: '25/02/25', time: '2025-04-25T18' },
    { id: '1', leavetype: 'Pooja', reason: 'Personal reason', leavetaken: '4', appliedon: '25/02/25', time: '2025-04-25T18' },
    { id: '1', leavetype: 'Pooja', reason: 'Personal reason', leavetaken: '4', appliedon: '25/02/25', time: '2025-04-25T18' },
    { id: '1', leavetype: 'Pooja', reason: 'Personal reason', leavetaken: '4', appliedon: '25/02/25', time: '2025-04-25T18' },
    { id: '1', leavetype: 'Pooja', reason: 'Personal reason', leavetaken: '4', appliedon: '25/02/25', time: '2025-04-25T18' },
    { id: '1', leavetype: 'Pooja', reason: 'Personal reason', leavetaken: '4', appliedon: '25/02/25', time: '2025-04-25T18' },
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
      {leaves.map((item) => (
        <View
          key={item.id}
          className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-200"
        >
          {/* Card */}
          <View className="bg-white rounded-xl shadow-md p-4 space-y-3">

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">ID</Text>
              <Text className="font-semibold text-gray-800">{item.id}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Leave Type</Text>
              <Text className="font-semibold text-gray-800">{item.leavetype}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Reason</Text>
              <Text className="font-semibold text-gray-800">{item.reason}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Leaves Taken</Text>
              <Text className="font-semibold text-yellow-600">{item.leavetaken}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Applied On</Text>
              <Text className="font-semibold text-yellow-600">{item.appliedon},{item.time}</Text>
            </View>

            <TouchableOpacity className="mt-4 bg-[#f1a621] rounded-xl py-2 px-4 items-center">
              <Text className="text-white font-bold">Status</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}


    </ScrollView>
  )
}

export default leaveshistory