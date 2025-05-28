import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL } from '@env';

const CreateSubject = () => {
  const user = useSelector((state) => state.auth.user);

  const [subjectName, setSubjectName] = useState('');
   
  const addSubject = async () => {
    try {
      const token = await SecureStore.getItemAsync("token"); // use async version
      const response = await axios.post(`${API_URL}/class/subject/add`, {
        subject_name: subjectName,
        teacher_id: user.id,
        admin_id: user.admin_id,
        class_id: user.class_id
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          console.log(`⬆ Upload Progress: ${Math.round((progressEvent.loaded * 100) / progressEvent.total)}%`);
        }
      });

      if (response.data.success) {
        Alert.alert("Success", response.data.message);
        setSubjectName(""); // clear field
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log("Upload Error:", error.response?.data || error.message);
      Alert.alert("Error", "Something went wrong while creating subject.");
    }
  };

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-white border-2 border-[#305495] rounded-2xl p-5 space-y-5 shadow-md">
        <Text className="text-center text-2xl font-bold text-[#305495]">
          Create Subject
        </Text>
        <View className="space-y-4">
          <View>
            <Text className="font-semibold text-gray-700 mb-1">Class Name</Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Class Name"
              value={user.class_name}
              editable={false} // readonly if auto-filled
            
            />
          </View>
          <View>
            <Text className="font-semibold text-gray-700 mb-1">
              Subject Name
            </Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Subject Name"
              value={subjectName}
              onChangeText={setSubjectName}
            />
          </View>
        </View>
        <TouchableOpacity
          className="bg-[#305495] rounded-xl py-3 mt-3 items-center"
          onPress={addSubject}
        >
          <Text className="text-white font-bold text-lg">Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateSubject;
