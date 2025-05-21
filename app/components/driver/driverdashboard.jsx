import { BackHandler, View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import Header from "./../commanComponents/header";
import Driverprofile from "./screens/profiles/driverprofile";
import Viewdetails from "./screens/busdetails/viewdetails"
import Studentlist from "./screens/list/studentlist"

  const driverdashboard= ()=>  {
     const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

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
                setSelectedComponent(Viewdetails);
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
                setSelectedComponent(Studentlist);
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
          <TouchableOpacity className="bg-[#f1a621] p-3 rounded-md mt-4">
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
