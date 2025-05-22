import { Text, View } from 'react-native';

const Supports = () => {
  return (
    <View className="flex-1 bg-gray-100 p-6">
      {/* Header */}
      <Text className="text-3xl font-bold text-[#305495] text-center mb-6">
        Support Team
      </Text>

      {/* Card Container */}
      <View className="bg-white rounded-2xl shadow-md p-5 space-y-5 flex-row flex-wrap gap-2 ">

        {/* Contact Details */}
        <View className="flex flex-col w-[48%]">
          <Text className="text-lg font-semibold text-gray-700">Contact Number</Text>
          <Text className="text-base text-gray-600 mt-1">+91 000000000</Text>
        </View>

        {/* Email */}
        <View className="flex flex-col w-[48%] ">
          <Text className="text-lg font-semibold text-gray-700">Support Email</Text>
          <Text className="text-base text-gray-600 mt-1">support@tieducore.com</Text>
        </View>

        {/* Open Timings */}
        <View className="flex flex-col w-[90%] items-center">
          <Text className="text-lg font-semibold text-gray-700">Open Timings</Text>
          <Text className="text-base text-gray-600 mt-1">9:00 AM – 6:00 PM</Text>
        </View>
      </View>
    </View>
  );
};

export default Supports;
