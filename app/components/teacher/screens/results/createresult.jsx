import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';

const createresult = () => {
  const [studentName, setStudentName] = useState('');
  const [seatNo, setSeatNo] = useState('');
  const [subject, setSubject]= useState('');
  const [outof, setOutof] = useState('');
  const [obtained,setObtained] = useState('');


  return (
    <ScrollView contentContainerStyle={{ padding: 8 }} className="bg-white min-h-screen">
      <Text className="text-2xl font-bold text-center mb-2">Test English School</Text>
      <Text className="text-center font-medium text-gray-600 mb-6">Thane School</Text>

      {/* Input Section */}
      <View className="space-y-4 flex-row flex-wrap gap-4 justify-between pt-4">
        {/* Student Name Input */}
        <View className="w-[48%]">
          <Text className="text-base font-semibold mb-1">Student Name</Text>
          <TextInput
            value={studentName}
            onChangeText={setStudentName}
            placeholder="Enter student name"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base "
          />
        </View>

        {/* Seat No Input */}
        <View className="w-[48%]">
          <Text className="text-base font-semibold mb-1">Seat No</Text>
          <TextInput
            value={seatNo}
            onChangeText={setSeatNo}
            placeholder="Enter seat number"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          />
        </View>
      </View>
         {/* Input Section */}
      <View className="space-y-4 flex-row flex-wrap gap-4 pt-4  justify-between">
        {/* Student Name Input */}
        <View className="w-[48%]">
          <Text className="text-base font-semibold mb-1">Student Class</Text>
          <TextInput
            value={subject}
            onChangeText={setSubject}
            placeholder="Enter student name"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base "
          />
        </View>

        {/* Seat No Input */}
        <View className="w-[48%]">
          <Text className="text-base font-semibold mb-1">Exam</Text>
          <TextInput
            value={seatNo}
            onChangeText={setSeatNo}
            placeholder="Enter seat number"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          />
        </View>
      </View>


<View className="pt-4 px-4 space-y-4">
  {/* Subject - Full Width */}
  <View className="w-full pt-4">
    <Text className="text-sm font-medium text-gray-600 mb-2 text-center">Subject</Text>
    <TextInput
      value={subject}
      onChangeText={setSubject}
      placeholder="Enter subject"
      className="border border-gray-300 rounded-lg px-4 py-3 text-base"
    />
  </View>

  {/* Out of and Marks Obtained - Side by Side */}
  <View className="flex-row justify-between">
    {/* Out of - Half Width */}
    <View className="w-[48%] pt-2">
      <Text className="text-sm font-medium text-gray-600 mb-2 text-center">Out of</Text>
      <TextInput
        value={outof}
        onChangeText={setOutof}
        placeholder="Total marks"
        keyboardType="numeric"
        className="border border-gray-300 rounded-lg px-4 py-3 text-base"
      />
    </View>

    {/* Marks Obtained - Half Width */}
    <View className="w-[48%] pt-2">
      <Text className="text-sm font-medium text-gray-600 mb-2 text-center">Marks Obtained</Text>
      <TextInput
        value={obtained}
        onChangeText={setObtained}
        placeholder="Marks obtained"
        keyboardType="numeric"
        className="border border-gray-300 rounded-lg px-4 py-3 text-base"
      />
    </View>
  </View>
</View>

  <TouchableOpacity className="bg-[#f1a621] rounded-xl py-3 mt-3 items-center">           
          <Text className="text-white font-bold text-lg">Save</Text>
        </TouchableOpacity>
<View className="space-y-6 flex-row flex-wrap gap-4 justify-between pt-4">

   <Text className="text-base font-semibold mb-1">Percentage :00.00</Text>
      <Text className="text-base font-semibold mb-1">Total Marks: 00.00</Text>
         <Text className="text-base font-semibold mb-1">Obtained Marks : 00.00</Text>
</View>
          <TouchableOpacity className="bg-[#305495] rounded-xl py-3 mt-3 items-center">
                  <Text className="text-white font-bold text-lg">Created</Text>
                </TouchableOpacity>

    </ScrollView>
  );
};




export default createresult