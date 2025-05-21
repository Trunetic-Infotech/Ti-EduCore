import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const SubmitHomework = () => {
  return (
    <View className="items-center justify-center  h-full p-3 ">
      <View className="bg-white border-2   border-[#305495] p-4 gap-4">
        <Text className="font-bold text-center text-2xl">Submit Homework</Text>

        <View className="flex-row flex-wrap justify-center gap-4 items-center">
          <View className='w-[48%] items-center gap-2'>
            <Text className='font-bold text-gray-600'>Student's Name</Text>
            <TextInput className='border border-[#305495] w-full rounded-md p-4' placeholder='Name' ></TextInput>
          </View>
          <View className='w-[48%] items-center gap-2'>
            <Text className='font-bold text-gray-600'>Roll No</Text>
            <TextInput className='border border-[#305495] w-full rounded-md p-4' placeholder='ID'></TextInput>
          </View>
          <View className='w-[48%] items-center gap-2'>
            <Text className='font-bold text-gray-600'>Select Subject</Text>
            <TextInput className='border border-[#305495] w-full rounded-md p-4' placeholder='Subject'></TextInput>
          </View>
          <View className='w-[48%] items-center gap-2'>
            <Text className='font-bold text-gray-600'>Homework</Text>
            <TextInput className='border border-[#305495] w-full rounded-md p-4' placeholder='Homework'></TextInput>
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