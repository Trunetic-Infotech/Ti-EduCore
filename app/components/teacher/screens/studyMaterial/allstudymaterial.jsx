import { FlatList, Text, View, TouchableOpacity, Linking, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import * as SecureStore from 'expo-secure-store'
import { API_URL } from '@env';
import axios from "axios";

const AllStudyMaterial = () => {
  const [allMaterial, setAllMaterial] = useState([]);
  const user = useSelector((state)=> state.auth.user)

    const getAllMaterial = async()=>{
    try {
      const token = SecureStore.getItem("token");
      const response = await axios.get(`${API_URL}/class/subject/get-all-chapter/${user.id}`,{
        headers: {
          Authorization : `Bearer ${token}`
        }
      })
      console.log(response)
      if(response.data && response.data.chapterData){
        Alert.alert(response.data.message)
        setAllMaterial(response.data.chapterData)
      }else{
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
            Alert.alert(error.response?.data?.message || "Something went wrong!");
    }
  }


  const handleDownload = (url) => {
    Linking.openURL(url);
  };

  const deleteChapter = async(id)=>{
    // console.log(id)
    try {
      const token = SecureStore.getItem("token");
      const response = await axios.delete(`${API_URL}/class/subject/delete/chapter/${id}`,{
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      if(response.data.success){
          Alert.alert(response.data.message)
          getAllMaterial()
      }else{
          Alert.alert(response.data.message)
      }
  } catch (error) {
      console.log(error);
      Alert.alert(error.response?.data?.message || "Something went wrong!");
  }
  }

   useEffect(()=>{
    getAllMaterial()
  },[])
  return (
    <View>
      <View className="bg-white p-4 mb-4 rounded-4xl shadow-sm border border-gray-200">
        <Text className="text-lg font-bold text-[#305495] mb-1">
          All Study Material List
        </Text>
      </View>

      <FlatList
        data={allMaterial}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10, backgroundColor: "#f3f4f6" }}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-[#305495]">
            {/* <Text className="text-lg font-bold text-[#305495] mb-1">
              {item.Subject_name} - {item.Chapter_Name}
            </Text> */}
            <Text className="text-sm text-gray-700">
              Subjects: {item.subject_name}
            </Text>
            <Text className="text-sm text-gray-700">Class: {item.class_name}</Text>
            <Text className="text-sm text-gray-700">
              Start Date: {new Date(item.start_date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
 
  })}
            </Text>
            <Text className="text-sm text-gray-700">
              End Date: {new Date(item.end_date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
   
  })}
            </Text>

            {/* Status Texts */}
            <Text className="text-sm font-semibold mt-2 text-green-600">
              Status: Download
            </Text>
            <Text className="text-sm font-semibold text-red-500">
              Status: Delete
            </Text>

            {/* Buttons */}
            <View className="flex-row justify-between items-center mt-3">
              <TouchableOpacity
                onPress={() => handleDownload(item.notes)}
              >
                <View className="flex-row items-center space-x-2 bg-blue-600 px-4 py-2 rounded-full">
                  <MaterialIcons name="file-download" size={20} color="white" />
                  <Text className="text-white font-semibold text-sm">
                    Download
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className="px-4 py-2 rounded-full bg-red-600"
                onPress={() => deleteChapter(item.id)}
              >
                <Text className="text-white font-semibold text-sm">
                  🗑️ Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
         ListEmptyComponent={() => (
                  <View className="flex-1 items-center justify-center">
                    <Text className="text-gray-500 text-lg">
                      No Study Material found
                    </Text>
                  </View>
                )}
      />
    </View>
  );
};

export default AllStudyMaterial;
