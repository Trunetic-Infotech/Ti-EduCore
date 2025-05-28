import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";
import axios from "axios";
import { useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { Feather } from "@expo/vector-icons";

const UploadHomework = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [subjects, setAllSubjects] = useState([]);
  const [subject, setSubject_name] = useState("");
  const [description, setDescription] = useState("");
  const [submission_date, setSubmission_date] = useState(null);
 const [selectedFile, setSelectedFile] = useState(null);

  const user = useSelector((state) => state.auth.user);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setSubmission_date(selectedDate.toISOString().split("T")[0]);
    }
  };

const pickFile = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (!result.canceled && result.assets?.length > 0) {
      const file = result.assets[0];

      console.log("Picked file details:", file);

      setSelectedFile({
        uri: file.uri,
        name: file.name.endsWith(".pdf") ? file.name : `${file.name}.pdf`,
        type: "application/pdf",
      });
    } else {
      Alert.alert("Cancelled", "No file was selected");
    }
  } catch (error) {
    console.log("File picking error:", error);
    Alert.alert("Error", "Failed to pick file");
  }
};



  const clearForm = () => {
    setSubject_name("");
    setDescription("");
    setSelectedFile(null);
    setSubmission_date(null);
    setDate(new Date());
  };

  const getSubject = async () => {
    try {
      const id = user.id;
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${API_URL}/class/subject/get-all-teacher-subjects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setAllSubjects(response.data.data);
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      Alert.alert("Upload Error:", error.response?.data || error.message);
    }
  };

  const addHomework = async () => {
    console.log("Adding homework with data:", 
      subject,
      description,
      submission_date,
      selectedFile);
    
    if (!subject || !description || !submission_date || !selectedFile) {
      Alert.alert("Please fill all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("submission_date", submission_date);
    formData.append("teacher_id", user.id);
    formData.append("subclass_id", user.subclass_id);

    if (selectedFile) {
      formData.append("upload_homeWork", {
        uri: selectedFile.uri,
        name: selectedFile.name,
       type: "application/pdf", // 🔥 IMPORTANT
      });
    }

    try {
      console.log("Form data being sent:", formData);
      
      const token = await SecureStore.getItemAsync("token");
      console.log("Token:", token);
      console.log("API URL:", `${API_URL}/homework/add-homework`);
      const response = await axios.post(
        `${API_URL}/homework/add-homework`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // ✅ this is required
          
          },
        }
      );
      console.log("Response from server:", response.data);
      
      if (response.data.success) {
        Alert.alert(response.data.message);
        clearForm();
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(
        "Upload Error:",
        error.response?.data || error.message
      );
      
      Alert.alert("Upload Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getSubject();
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="bg-white border-2 border-[#305495] rounded-2xl p-5 space-y-5 shadow-md">
        <Text className="text-center text-2xl font-bold text-[#305495]">
          Upload Homework
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="font-semibold text-gray-700 mb-1">Class Name</Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              value={user.class_name}
              editable={false}
            />
          </View>

          <View>
            <Text className="font-semibold text-gray-700 mb-1">Division</Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              value={user.division}
              editable={false}
            />
          </View>

          <View>
  <Text className="font-semibold text-gray-700 mb-1">Subject</Text>
  <View className="border border-[#305495] rounded-lg bg-white px-2">
    <RNPickerSelect
      placeholder={{ label: "Select a subject", value: null }}
      value={subject}
      onValueChange={(value) => setSubject_name(value)}
      items={subjects.map((subj) => ({
        label: subj.subject_name,
        value: subj.subject_name,
      }))}
      style={{
        inputIOS: {
          paddingVertical: 12,
          color: "#333",
        },
        inputAndroid: {
          paddingVertical: 8,
          color: "#333",
        },
        placeholder: {
          color: "#999",
        },
      }}
    />
  </View>
</View>

 <View className="w-full items-center">
            <Text className="font-bold text-gray-600">File</Text>
            <TouchableOpacity
              onPress={pickFile}
              className="border border-[#305495] w-full rounded-md p-4 bg-white flex-row justify-between items-center"
            >
              <Text className="text-gray-800">
                {selectedFile ? selectedFile.name : "Choose a file"}
              </Text>
              <Feather name="paperclip" size={20} color="#305495" />
            </TouchableOpacity>
          </View>


          <View>
            <Text className="font-semibold text-gray-700 mb-1">Submission Date</Text>
            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              className="border border-[#305495] rounded-lg p-3 bg-gray-50"
            >
              <Text className="text-gray-700">{date.toDateString()}</Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </View>

          <View>
            <Text className="font-semibold text-gray-700 mb-1">Description</Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Description"
              multiline
              numberOfLines={5}
              style={{ minHeight: 100, textAlignVertical: "top" }}
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

        <TouchableOpacity
          className="bg-[#305495] rounded-xl py-3 mt-3 items-center"
          onPress={addHomework}
        >
          <Text className="text-white font-bold text-lg">Upload</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UploadHomework;
