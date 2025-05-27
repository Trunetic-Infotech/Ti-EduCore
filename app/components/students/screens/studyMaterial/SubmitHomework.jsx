import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const SubmitHomework = ({pendingHw}) => {
  console.log(pendingHw);
  const user = useSelector((state)=>state.auth.user);
  
  return (
    <View className="items-center justify-center  h-full p-3 ">
      <View className="bg-white border-2   border-[#305495] p-4 gap-4">
        <Text className="font-bold text-center text-2xl">Submit Homework</Text>

        <View className="flex-row flex-wrap justify-center gap-2 items-center">
          <View className='w-[48%] items-center gap-2'>
            <Text className='font-bold text-gray-600'>Student's Name</Text>
            <TextInput className='border border-[#305495] w-full rounded-md p-4' value={user ? user.student_name : "Loading..."} placeholder='Name' ></TextInput>
          </View>
          <View className='w-[48%] items-center gap-2'>
            <Text className='font-bold text-gray-600'>Roll No</Text>
            <TextInput className='border border-[#305495] w-full rounded-md p-4' value={user ? user.roll_number : "Loading..."} placeholder='ID'></TextInput>
          </View>
          <View className='w-[48%] items-center gap-2'>
            <Text className='font-bold text-gray-600'>Select Subject</Text>
            <TextInput className='border border-[#305495] w-full rounded-md p-4' value={pendingHw ? pendingHw.subject : "Loading..."} placeholder='Subject'></TextInput>
          </View>
          <View className='w-[48%] items-center gap-2'>
            <Text className='font-bold text-gray-600'>Homework</Text>
            <TextInput className='border border-[#305495] w-full rounded-md p-4' value={pendingHw ? pendingHw.description : ""} placeholder='Homework'></TextInput>
          </View> 
          <View className='w-full items-center'>
            <Text className='font-bold text-gray-600'>File</Text>
            <TextInput className='border border-[#305495] w-full rounded-md p-4' placeholder='Name'></TextInput>
          </View>
        </View>

        <TouchableOpacity className="items-center bg-[#f1a621] p-3 rounded-xl">
          <Text className="font-bold">Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SubmitHomework