import { View, Text, TouchableOpacity,StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";


const payfees = () => {
  return (
    <SafeAreaView>
    
    <View className='items-center justify-center rounded-xl'>

        <View className="p-4 items-center  gap-10 w-[90vw] bg-[#dad6d6]" style={styles.box}>
        <Text className="text-[#305495] text-2xl text-center font-bold text-shadow">
          Pay Fees
        </Text>

        <View className="gap-1">
          <Text className='text-xl text-center font-bold'>Student Name</Text>
          <TextInput
            keyboardType="text"
            placeholder="Enter Your Name"
            className="bg-white w-[50vw] border-2  border-[#305495] rounded-xl placeholder:text-center"
          />
        </View>

        <View className="gap-1">
          <Text className='text-xl text-center font-bold'>Student ID</Text>
          <TextInput
            keyboardType="text"
            placeholder="Enter Your Name"
            className="bg-white w-[50vw] border-2  border-[#305495] rounded-xl placeholder:text-center"
          />
        </View>

        <View className="gap-1">
          <Text className='text-xl text-center font-bold'>Fees Amount</Text>
          <TextInput
            keyboardType="text"
            placeholder="Enter Your Name"
            className="bg-white w-[50vw] border-2  border-[#305495] rounded-xl placeholder:text-center"
          />
        </View>

        <View className="gap-1">
          <Text className='text-xl text-center font-bold' >Date</Text>
          <TextInput
            keyboardType="text"
            placeholder="Enter Your Name"
            className="bg-white w-[50vw] border-2  border-[#305495] rounded-xl placeholder:text-center"
          />
        </View>

        <TouchableOpacity>
          <Text className='px-5 py-3 bg-[#305495] rounded-full' style={styles.box} >Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    // boxShadow: '0px 8px 6px rgba(48, 84, 149, 0.2)'
    boxShadow: '-6px 10px 15px rgba(48, 84, 149, 0.2),6px 10px 15px rgba(48, 84, 149, 0.2),0px 12px 18px rgba(48, 84, 149, 0.2)'
  },
});

export default payfees;
