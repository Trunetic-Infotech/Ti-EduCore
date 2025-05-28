import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import { useSelector } from "react-redux";
import { API_URL } from "@env";

const UploadVideoLecture = () => {
  const user = useSelector((state) => state.auth.user);

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);

  const [subjects, setAllSubjects] = useState([]);
  const [subjectId, setSubject_Id] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadDate, setUploadDate] = useState(null);
  const [duration, setDuration] = useState("Unknown");

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        const res = await axios.get(
          `${API_URL}/class/subject/get-all-teacher-subjects/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.success) {
          setAllSubjects(res.data.data);
        } else {
          Alert.alert("Error", res.data.message);
        }
      } catch (err) {
        console.error("Fetch Subjects Error:", err);
      }
    };

    fetchSubjects();
  }, []);

  const pickVideoLecture = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "video/*" });
      if (result.assets?.length > 0) {
        const fileData = result.assets[0];
        setSelectedFile(fileData.name);
        setFile({
          uri: fileData.uri,
          name: fileData.name,
          type: fileData.mimeType || "video/mp4",
        });
      }
    } catch (err) {
      console.error("Pick Video Error:", err);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
    setUploadDate(currentDate.toISOString().split("T")[0]);
  };

  const handleSubmit = async () => {
    if (!subjectId || !title || !file || !description || !uploadDate) {
      return Alert.alert("Error", "All fields are required.");
    }

    const formData = new FormData();
    formData.append("class_subject_id", subjectId);
    formData.append("description", description);
    formData.append("upload_date", uploadDate);
    formData.append("title", title);
    formData.append("teacher_id", user.id);
    formData.append("subclass_id", user.subclass_id);
    formData.append("admin_id", user.admin_id);
    formData.append("class_id", user.class_id);
    formData.append("duration", duration);
    formData.append("video_file_path", file);

    try {
      setIsUploading(true);
      const token = await SecureStore.getItemAsync("token");
      const res = await axios.post(`${API_URL}/students/video/lectures/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setUploadProgress(percent);
        },
      });

      if (res.data.success) {
        Alert.alert("Success", res.data.message);
      } else {
        Alert.alert("Upload Failed", res.data.message);
      }
    } catch (err) {
      console.error("Upload Error:", err);
      Alert.alert("Error", err.response?.data?.message || "Upload failed.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <ScrollView className="bg-gray-100 p-4">
      <View className="bg-white border-2 border-[#305495] rounded-2xl p-5 space-y-5 shadow-md">
        <Text className="text-center text-2xl font-bold text-[#305495]">
          Upload Video Lectures
        </Text>

        <View>
          <Text className="font-semibold text-gray-700 mb-1">Class Name</Text>
          <TextInput
            value={user.class_name}
            editable={false}
            className="border border-[#305495] rounded-lg p-3 bg-white"
          />
        </View>

        <View>
          <Text className="font-semibold text-gray-700 mb-1">Division</Text>
          <TextInput
            value={user.division}
            editable={false}
            className="border border-[#305495] rounded-lg p-3 bg-white"
          />
        </View>

        <View>
          <Text className="font-semibold text-gray-700 mb-1">Subject</Text>
          <View className="border border-[#305495] rounded-lg bg-white">
            <RNPickerSelect
              onValueChange={setSubject_Id}
              value={subjectId}
              items={subjects.map((s) => ({ label: s.subject_name, value: s.id }))}
              placeholder={{ label: "Select a subject", value: "" }}
              style={{
                inputIOS: { padding: 12, fontSize: 16, color: "#000" },
                inputAndroid: { padding: 12, fontSize: 16, color: "#000" },
                placeholder: { color: "#888" },
              }}
            />
          </View>
        </View>

        <View>
          <Text className="font-semibold text-gray-700 mb-1">Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Upload Video Title"
            className="border border-[#305495] rounded-lg p-3 bg-white"
          />
        </View>

        <View>
          <Text className="font-semibold text-gray-700 mb-1">Upload Video</Text>
          <TouchableOpacity
            onPress={pickVideoLecture}
            className="border border-[#305495] rounded-lg p-3 bg-gray-50"
          >
            <Text className="text-gray-700">
              {selectedFile || "Tap to select video file"}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text className="font-semibold text-gray-700 mb-1">Date</Text>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            className="border border-[#305495] rounded-lg p-3 bg-gray-50"
          >
            <Text className="text-gray-700">{date.toDateString()}</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} />
          )}
        </View>

        <View>
          <Text className="font-semibold text-gray-700 mb-1">Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter Description"
            multiline
            numberOfLines={5}
            style={{ minHeight: 100, textAlignVertical: "top" }}
            className="border border-[#305495] rounded-lg p-3 bg-white"
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isUploading}
          className={`${
            isUploading ? "bg-gray-400" : "bg-[#305495]"
          } rounded-xl py-3 mt-3 items-center`}
        >
          <Text className="text-white font-bold text-lg">
            {isUploading ? `Uploading ${uploadProgress}%...` : "Upload"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UploadVideoLecture;
