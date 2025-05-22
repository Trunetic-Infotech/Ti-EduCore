import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';

const feesrecord = () => {
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
          <Text className="text-gray-500 font-medium">Student Name</Text>
          <Text className="font-semibold text-gray-800">101</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Student ID</Text>
          <Text className="font-semibold text-gray-800">100</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Class </Text>
          <Text className="font-semibold text-gray-800">10th</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium"> Date</Text>
          <Text className="font-semibold text-gray-800">22/05/2025</Text>
        </View>

        

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Fees Amount</Text>
          <Text className="font-semibold text-gray-800">10,000</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Receipt</Text>
          <Text className="font-semibold text-red-500">View</Text>
        </View>

      </View>
    </View>
  )
}

export default feesrecord