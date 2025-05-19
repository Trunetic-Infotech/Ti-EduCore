import { View, Text, TextInput } from 'react-native'
import React from 'react'

const SubmitHomework = () => {
  return (
    <View className="items-center justify-center h-full">
      <View className="bg-gray-400 p-4">
        <Text className="font-bold">Submit Homework</Text>

        <View className="">
          <View>
            <Text>Student's Name</Text>
            <TextInput placeholder='Name' ></TextInput>
          </View>
          <View>
            <Text>Roll No</Text>
            <TextInput placeholder='ID'></TextInput>
          </View>
          <View>
            <Text>Select Subject</Text>
            <TextInput placeholder='Subject'></TextInput>
          </View>
          <View>
            <Text>Homework</Text>
            <TextInput placeholder='Homework'></TextInput>
          </View>
          <View>
            <Text>File</Text>
            <TextInput placeholder='Name'></TextInput>
          </View>
        </View>
      </View>
    </View>
  )
}

export default SubmitHomework