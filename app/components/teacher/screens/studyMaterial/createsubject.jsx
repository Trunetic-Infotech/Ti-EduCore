import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const createsubject = () => {
 const [subjectName, setSubjectName] = useState('');
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-white border-2 border-[#305495] rounded-2xl p-5 space-y-5 shadow-md">
        <Text className="text-center text-2xl font-bold text-[#305495]">
         Create Subject
        </Text>
        <View className="space-y-4">
          <View>
            <Text className="font-semibold text-gray-700 mb-1">Class Name</Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Class Name"
            />
          </View>
          <View>
            <Text className="font-semibold text-gray-700 mb-1">
              Enter Subject Name
            </Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Teacher Name"
            />
          </View>
        </View>
        <TouchableOpacity className="bg-[#305495] rounded-xl py-3 mt-3 items-center">
          <Text className="text-white font-bold text-lg">Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default createsubject