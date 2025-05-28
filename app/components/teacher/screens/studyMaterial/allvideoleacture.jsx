import { FlatList, Text, View, TouchableOpacity, Linking, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store'
import {  useSelector } from "react-redux";
import { API_URL } from '@env';
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Platform } from 'react-native';
const allvideoleacture = () => {

  const [allVideoLec, setAllVideoLec] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const getAllMaterial = async () => {
    try {
      const token = SecureStore.getItem("token");
      const response = await axios.get(
        `${API_URL}/students/video/lectures/get-all/${
          user.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data && response.data.data) {
        Alert.alert(response.data.message);
        setAllVideoLec(response.data.data);
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.response?.data?.message || "Something went wrong!");
    }
  };

const handleDownload = async (url) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission denied", "Media library permission is required to save the video.");
      return;
    }

    const fileUri = `${FileSystem.documentDirectory}video_${Date.now()}.mp4`;
    const downloadResumable = FileSystem.createDownloadResumable(url, fileUri);

    const { uri } = await downloadResumable.downloadAsync();
    const asset = await MediaLibrary.createAssetAsync(uri);

    await MediaLibrary.createAlbumAsync("Download", asset, false);

    Alert.alert("Success", "Video downloaded to your gallery.");
  } catch (error) {
    console.error("Download error:", error);
    Alert.alert("Error", "Failed to download the video.");
  }
};

//    const handleDownload = (url) => {
//   if (Platform.OS === 'web') {
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "video.mp4");
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//   } else {
//     Alert.alert("Download not supported", "Use the mobile app to download the video.");
//     // Or call a native handler like `expo-file-system`
//   }
// };

  const handleDelete = async(id)=>{
    try {
        const token = SecureStore.getItem("token");
        const response = await axios.delete(`${API_URL}/students/video/lectures/delete/video/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        console.log(response)
        if(response.data.success){
            Alert.alert(response.data.message);
            getAllMaterial()
        }else{
            Alert.alert(response.data.message);
        }
    } catch (error) {
        console.log(error);
      Alert.alert(error.response?.data?.message || "Something went wrong!");
    }
  }

  useEffect(() => {
    getAllMaterial();
  }, []);



  return (
    <View>
      <View className="bg-white p-4 mb-4 rounded-4xl shadow-sm border border-gray-200">
        <Text className="text-lg font-bold text-[#305495] mb-1">
          All Video Lectures
        </Text>
      </View>

      <FlatList
        data={allVideoLec}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10, backgroundColor: "#f3f4f6" }}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-[#305495]">
            <Text className="text-lg font-bold text-[#305495] mb-1">
              {item.subject_name} - {item.title}
            </Text>
            <Text className="text-sm text-gray-700">
              Descriptions: {item.description}
            </Text>
            <Text className="text-sm text-gray-700">
              Duration: {item.duration} minutes
            </Text>
            <Text className="text-sm text-gray-700">
              Leacture Date:  {new Date(item.upload_date).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    // hour: "2-digit",
                    // minute: "2-digit",
                    // hour12: true,
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
              <TouchableOpacity onPress={() => handleDownload(item.video_file_path)}>
                <View className="flex-row items-center space-x-2 bg-blue-600 px-4 py-2 rounded-full">
                  <MaterialIcons name="file-download" size={20} color="white" />
                  <Text className="text-white font-semibold text-sm">
                    Download
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className="px-4 py-2 rounded-full bg-red-600"
                onPress={() => handleDelete(item.id)}
              >
                <Text className="text-white font-semibold text-sm">
                  {" "}
                  🗑️ Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 text-lg">
              No video lectures found
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default allvideoleacture;
