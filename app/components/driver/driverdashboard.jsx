import { BackHandler, View, Text, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import Header from "./../commanComponents/header";
import Driverprofile from "./screens/profiles/driverprofile";
import Viewdetails from "./screens/busdetails/viewdetails"
import Studentlist from "./screens/list/studentlist"
import * as SecureStore from 'expo-secure-store'
import axios from "axios";
import { API_URL } from '@env';
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/authSlice";
import { useRouter } from "expo-router";


  const driverdashboard= ()=>  {
     const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const dispatch=useDispatch();
const router = useRouter();
 const fetchUser = async()=>{
    try {
      const userId = await SecureStore.getItemAsync('userId');
      const token = await SecureStore.getItemAsync('token');
      // console.log(userId);
      // console.log(token);
      console.log (userId)
      const response = await axios.get(`${API_URL}/deriver/profile/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      if(response.data.success){
        dispatch(setUser(response.data.user))
        // Alert.alert("True", "User profile Set")
      }else{
        Alert.alert("No user Found", response.data.message)
      }
    } catch (error) {
      console.log(error, "hello");
      Alert.alert("Error", "Internal Server Error");
    }
  }

  useEffect(()=>{
    fetchUser();
  },[])

  useEffect(() => {
    const backAction = () => {
      if (selectedComponent) {
        setSelectedComponent(null); // go back to dashboard
        return true; // prevent default back behavior
      }
      return false; // allow default behavior (exit screen)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [selectedComponent]);
  

    
   const handleLogOut =  async()=>{
    try {
      const response = await axios.post(`${API_URL}/admin/logout`,
        {withCredentials: true}
      )

      if(response.data.success){
        
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('userId');
        Alert.alert("Logout Successfull", "User Logout Successfull");
        router.push('/');
       
      }else{
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Logout Failed");
    }
  }


    return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-gray-100">
      {/* Custom Header */}
      <Header title="Driver Dashboard" onMenuPress={() => setIsOpen(true)} />
      {/* Page Content */}
      <View className="p-4 flex-1">
        {selectedComponent ? (
          selectedComponent
        ) : (
          // Default content
          <View>
            <Driverprofile />
          </View>
        )}
      </View>

      {/* Side Menu */}
      {isOpen && (
        <View className="absolute left-0 bottom-0 top-12 h-full w-[70%] bg-[#7b9cdb] p-4 shadow-lg z-50 flex flex-col justify-between">
          {/* Close button */}
          <ScrollView>
          <View className="items-end mb-4">
            <AntDesign
              onPress={() => setIsOpen(false)}
              name="close"
              size={24}
              color="black"
            />
          </View>

          {/* Main menu options */}
          <View className="flex-grow">
            <Text className="text-xl font-semibold text-black mb-4">
              Driver Menus
            </Text>
     <TouchableOpacity
        className="bg-gray-200 p-3 rounded-md mb-3"
        onPress={() => setSelectedComponent(<Driverprofile />)}
      >
        <Text className="text-black font-semibold text-center">Profile</Text>
      </TouchableOpacity>


            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-md mb-3"
              onPress={() => {
                setSelectedComponent(<Viewdetails/>);
                setIsOpen(false);
              }}
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Bus Details
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedComponent(<Studentlist/>);
                setIsOpen(false);
              }}
              className="bg-gray-200 p-3 rounded-md mb-5"
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Students List
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Logout fixed at bottom */}
          <TouchableOpacity className="bg-[#f1a621] p-3 rounded-md mt-4" onPress={handleLogOut}>
            <View>
              <Text className="text-black font-semibold text-center">
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        </View>
      )}
    </SafeAreaView>
    )
  };


export default driverdashboard
