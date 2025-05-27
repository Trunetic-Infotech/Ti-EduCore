import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';

const CurrentYearResults = () => {
  return (
    <View className="p-4 bg-gray-100 min-h-full">
      {/* Search Input */}
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

      {/* Card */}
      <View className="bg-white rounded-xl shadow-md p-4 space-y-3">
        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Roll No</Text>
          <Text className="font-semibold text-gray-800">101</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Student Name</Text>
          <Text className="font-semibold text-gray-800">Asad Shaikh</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Marks Obtained</Text>
          <Text className="font-semibold text-gray-800">140</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Total Marks</Text>
          <Text className="font-semibold text-gray-800">400</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Percentage</Text>
          <Text className="font-semibold text-gray-800">35%</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Grade</Text>
          <Text className="font-semibold text-red-500">F</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Remarks</Text>
          <Text className="font-semibold text-yellow-600">Need More Improvement!</Text>
        </View>

         <TouchableOpacity className="mt-4 bg-[#f1a621] rounded-xl py-2 px-4 items-center">
          <Text className="text-white font-bold">View Result</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CurrentYearResults