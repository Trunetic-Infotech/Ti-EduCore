import { Text, Image, View, TouchableOpacity } from "react-native";
import "../global.css";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/forgotpassword');
    }, 2000); // 2000ms = 2 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  return (
    <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
    <View className="bg-gray-200 items-center justify-center h-full relative">
      <Image source={require("../assets/images/Logo5.png")} />

      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="bg-[#305495] px-4 py-3 rounded-md"
      >
        <Text className="text-white font-bold text-xl">Login</Text>
      </TouchableOpacity>

      {isOpen ? (
        <View className="absolute w-[70%] gap-4 h-full right-0 bg-white p-2">
          <View className="items-end font-bold ">
            <AntDesign  onPress={() => {setIsOpen(false); console.log("helloo")}} name="close" size={24} color="black" />
          </View>
      

          <View className="gap-2 p-2">
            <Text className="text-center font-semibold text-xl text-[#305495]"> User Login</Text>
            <View className="border border-gray-300"></View>
          </View>
          <View className="items-center gap-3">
            
            <TouchableOpacity className="bg-gray-200 rounded-md p-4 w-full">
              <Text className="text-xl text-center  font-semibold text-[#305495] ">Teacher</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-200 rounded-md p-4 w-full">
              <Text className="text-xl text-center  font-semibold text-[#305495] ">Student</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-200 rounded-md p-4 w-full" >
              <Text className="text-xl text-center  font-semibold text-[#305495] ">Parent</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-200 rounded-md p-4 w-full">
              <Text className="text-xl text-center  font-semibold text-[#305495] ">Driver</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      ) :""}
    </View>
    </SafeAreaView>
  );
}
