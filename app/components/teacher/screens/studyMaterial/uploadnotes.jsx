import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";
import axios from "axios";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";

const UploadNotes = () => {
  const user = useSelector((state) => state.auth.user);

  const [subjects, setAllSubjects] = useState([]);
  const [subject_id, setSubject_id] = useState("");
  const [chapter_name, setChapter_name] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (!result.canceled && result.assets?.length > 0) {
        const file = result.assets[0];
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
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log("Fetch Subjects Error:", error.response?.data || error.message);
    }
  };

  const addChapter = async () => {
    const formData = new FormData();
    formData.append("subject_id", subject_id);
    formData.append("chapter_name", chapter_name);
    formData.append("start_date", startDate.toISOString().split("T")[0]);
    formData.append("end_date", endDate.toISOString().split("T")[0]);
    formData.append("teacher_id", user.id);
    formData.append("class_id", user.class_id);

    if (selectedFile) {
      formData.append("notes", {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: "application/pdf",
      });
    }

    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.post(
        `${API_URL}/class/subject/add/chapter`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Success", response.data.message);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log("Upload Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getSubject();
  }, []);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-white border-2 border-[#305495] rounded-2xl p-5 space-y-5 shadow-md">
        <Text className="text-center text-2xl font-bold text-[#305495]">
          Upload Notes
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="font-semibold text-gray-700 mb-1">Class</Text>
            <Text className="border border-[#305495] rounded-lg p-3 bg-white">
              {user.class_name || user.class_id}
            </Text>
          </View>

          <View>
            <Text className="font-semibold text-gray-700 mb-1">Subject</Text>
            <View className="border border-[#305495] rounded-lg bg-white">
              <Picker
                selectedValue={subject_id}
                onValueChange={(itemValue) => setSubject_id(itemValue)}
              >
                <Picker.Item label="Select a subject" value="" />
                {subjects.map((subj) => (
                  <Picker.Item
                    key={subj.id}
                    label={subj.subject_name}
                    value={subj.id}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View>
            <Text className="font-semibold text-gray-700 mb-1">
              Chapter Name
            </Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Chapter Name"
              value={chapter_name}
              onChangeText={setChapter_name}
            />
          </View>

          <View className="w-full items-center">
            <Text className="font-bold text-gray-600">File Upload (PDF)</Text>
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

          {/* Start Date Picker */}
          <View>
            <Text className="font-semibold text-gray-700 mb-1">Start Date</Text>
            <TouchableOpacity
              onPress={() => setShowStartPicker(true)}
              className="border border-[#305495] rounded-lg p-3 bg-gray-50"
            >
              <Text className="text-gray-700">
                {startDate.toDateString()}
              </Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(e, selectedDate) => {
                  setShowStartPicker(false);
                  if (selectedDate) setStartDate(selectedDate);
                }}
              />
            )}
          </View>

          {/* End Date Picker */}
          <View>
            <Text className="font-semibold text-gray-700 mb-1">End Date</Text>
            <TouchableOpacity
              onPress={() => setShowEndPicker(true)}
              className="border border-[#305495] rounded-lg p-3 bg-gray-50"
            >
              <Text className="text-gray-700">{endDate.toDateString()}</Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={(e, selectedDate) => {
                  setShowEndPicker(false);
                  if (selectedDate) setEndDate(selectedDate);
                }}
              />
            )}
          </View>
        </View>

        <TouchableOpacity
          className="bg-[#305495] rounded-xl py-3 mt-3 items-center"
          onPress={addChapter}
        >
          <Text className="text-white font-bold text-lg">Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadNotes;
