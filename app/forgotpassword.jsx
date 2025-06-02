import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env'; // if using react-native-dotenv


const ForgotPassword = () => {
  const [email, setEmail] = useState([]);
  const route = useRoute();
  const { Role } = route.params;

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(`${API_URL}/admin/forget-password`, {
        Role,
        email,
      });

      if (response.data.success) {
        Alert.alert("Reset link sent to your email");
      } else {
        Alert.alert(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      Alert.alert(error.response?.data?.message || "Failed to send reset email!");
    }
  };

  return (
    <SafeAreaView>
      <View className="flex h-full">
        <View className="h-1/2 flex justify-between items-center">
          <View className="mt-10 p-8 items-center">
            <Text className="text-lg text-[#305495] font-bold">Welcome back!</Text>
          </View>
          <Image source={require('../assets/images/Logo5.png')} className="w-[60vw] h-[25vh]" resizeMode='contain' />
        </View>

        <View className="h-1/2 bg-[#f1a621] w-full p-4 flex justify-center">
          <View className="flex items-center gap-4">
            <Text className="text-xl font-bold p-1">Forgot Password</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Your Email"
              keyboardType="email-address"
              type="email"
              autoCapitalize="none"
              className="bg-gray-100 border-2 rounded-xl text-sm p-6 font-bold  w-[90%] border-[#f5b237]"
            />
            <TouchableOpacity className="bg-[#305495] rounded-md mt-3" onPress={handleForgotPassword}>
              <Text className="text-md text-white font-bold px-6 py-3">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
