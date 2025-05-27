import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';

const studentcertificates = () => {
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
          <Text className="text-gray-500 font-medium">Class No</Text>
          <Text className="font-semibold text-gray-800">101</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Achievement Descriptions</Text>
          <Text className="font-semibold text-gray-800">.....</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Upload Date</Text>
          <Text className="font-semibold text-gray-800">22/05/2025</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Class Name</Text>
          <Text className="font-semibold text-gray-800">name</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">View Certificates</Text>
          <Text className="font-semibold text-gray-800">certificate</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Download</Text>
          <Text className="font-semibold text-red-500">Download</Text>
        </View>

      </View>
    </View>
  )
}

export default studentcertificates