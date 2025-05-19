import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";

const payfees = () => {
  return (
    <SafeAreaView>
      <View className="p-4">
        <Text>payfees</Text>

        <View className="flex-row">
          <View>
            <Text>Student Name</Text>
            <TextInput
              keyboardType="text"
              placeholder="Enter Your Name"
              className="bg-gray-200 w-[40%] border-2  border-[#305495] rounded-xl"
            />
          </View>

          <View>
            <Text>Student ID</Text>
            <TextInput
              keyboardType="text"
              placeholder="Enter Your Name"
              className="bg-gray-200 w-[40%] border-2  border-[#305495] rounded-xl"
            />
          </View>
        </View>

        <View>
          <View>
            <Text>Fees Amount</Text>
            <TextInput
              keyboardType="text"
              placeholder="Enter Your Name"
              className="bg-gray-200 w-[40%] border-2  border-[#305495] rounded-xl"
            />
          </View>

          <View>
            <Text>Date</Text>
            <TextInput
              keyboardType="text"
              placeholder="Enter Your Name"
              className="bg-gray-200 w-[40%] border-2  border-[#305495] rounded-xl"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default payfees;
