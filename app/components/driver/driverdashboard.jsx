import {
  BackHandler,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import Header from "./../commanComponents/header";
import Driverprofile from "./screens/profiles/driverprofile";
import Viewdetails from "./screens/busdetails/viewdetails";
import Studentlist from "./screens/list/studentlist";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/features/authSlice";
import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid, Platform } from "react-native";
import * as Location from "expo-location";
import { LOCATION_TASK_NAME } from '../../../utils/backgroundLocationTask';  // Import the task
import { sendLocationToServer } from  '../../../utils/locationService';
import { useRouter } from "expo-router";

import * as TaskManager from 'expo-task-manager';

const driverdashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const fetchUser = async () => {
    try {
      const userId = await SecureStore.getItemAsync("userId");
      const token = await SecureStore.getItemAsync("token");
      // console.log(userId);
      // console.log(token);
      // console.log (userId)
      const response = await axios.get(`${API_URL}/deriver/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        const user = response.data.user; // ✅ define user from API response
      dispatch(setUser(user));
      await SecureStore.setItemAsync('user', JSON.stringify(user)); // ✅ stringify object before storing

      // ✅ Start location tracking only if role is driver
      if (user.role === 'driver') {
        await getLocation();
      }
      } else {
        Alert.alert("No user Found", response.data.message);
      }
    } catch (error) {
      // console.log(error, "hello");
      Alert.alert("Error", "Internal Server Error....................................");
    }
  };

  
  
  const getLocation = async () => {
  // Request permissions (foreground & background)
  console.log("Hello");
  
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Foreground permission denied');
    return;
  }
  const bgStatus = await Location.requestBackgroundPermissionsAsync();
  if (bgStatus.status !== 'granted') {
    alert('Background permission denied');
    return;
  }

  // Get current location once
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Highest,
  });
  await sendLocationToServer(location.coords.latitude, location.coords.longitude, user);

  // Start background location updates if not already started
  const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
  if (!hasStarted) {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 5000,
      distanceInterval: 0,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: 'Tracking your location',
        notificationBody: 'Location tracking in background is active',
        notificationColor: '#FF0000',
      },
    });
  }
};


 
 

  





  useEffect(() => {
    fetchUser();
  }, []);

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
         await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME); // 👈 stop tracking
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
  );
};

export default driverdashboard;
