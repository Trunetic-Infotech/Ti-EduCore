import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';

const leavesrequest = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null)



  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-white border-2 border-[#305495] rounded-2xl p-5 space-y-5 shadow-md">
        <Text className="text-center text-2xl font-bold text-[#305495]">
          Request a Leave
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="font-semibold text-gray-700 mb-1">Teacher Id</Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter  Username"
            />
          </View>

          <View>
            <Text className="font-semibold text-gray-700 mb-1">Teacher Name</Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Contact No"
            />
          </View>

          <View>
            <Text className="font-semibold text-gray-700 mb-1">Leave Type</Text>
            <View className="border border-[#305495] rounded-lg p-3 bg-white">
              <TouchableOpacity
                onPress={() => setIsOpen(!isOpen)}
                className="flex-row items-center justify-between border border-gray-300 rounded px-3 py-2"
                activeOpacity={1}
              >
                <Text>{selectedLeave ? selectedLeave : "select a type"}


                </Text>
                <Feather name="chevron-down" size={20} color="#6B7280" />
              </TouchableOpacity>

            </View>
            {isOpen && (
              <View className="mt-2 border border-[#305495] rounded-lg bg-white">
                {["Personal Reason", "Village Leave", "Medical Leave", "Emergency"].map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      setSelectedLeave(item);
                      setIsOpen(false);
                    }}
                    className="p-2 border-b border-gray-200"
                  >
                    <Text className="text-gray-800">{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}


          </View>


          <View>
            <Text className="font-semibold text-gray-700 mb-1">
              Reason
            </Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Description"
              multiline
              numberOfLines={4}
              style={{ minHeight: 100, textAlignVertical: "top" }}
            />
          </View>
        </View>

        <TouchableOpacity className="bg-[#305495] rounded-xl py-3 mt-3 items-center">
          <Text className="text-white font-bold text-lg">Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default leavesrequest