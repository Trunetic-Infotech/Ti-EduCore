import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "@env";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const SubmitHomework = ({ pendingHw }) => {
  const user = useSelector((state) => state.auth.user);
  const [homework, setHomeworks] = useState([]);
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const [homeworksOpen, setHomeworksOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedHw, setSelectedHw] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false); // <--- Loading state

  useEffect(()=>{
    if(pendingHw){
      console.log(pendingHw);
      
      setSelectedHw(pendingHw)
    }
  },[]);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      console.log("Picker result:", result);

      if (!result.canceled && result.assets?.length > 0) {
        const file = result.assets[0];
        setSelectedFile(file);
      } else {
        Alert.alert("Cancelled", "No file was selected");
      }
    } catch (error) {
      console.log("File picking error:", error);
      Alert.alert("Error", "Failed to pick file");
    }
  };

  const uniqueSubjects = [...new Set(homework.map((hw) => hw.subject))];
  const filteredHomework = homework.filter((hw) => hw.subject === selectedSubject);

  const getHomework = async () => {
    try {
      const token = await SecureStore.getItemAsync("token"); // <-- added await here
      const response = await axios.get(
        `${API_URL}/homework/get-homework/subclass/${user.subclass_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.HomeworkData) {
        setHomeworks(response.data.HomeworkData);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong!"
      );
    }
  };

  const submitHomework = async () => {
    console.log(selectedHw);
    
    if (!selectedHw) {
      Alert.alert("Error", "Please select a homework");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("homework_id", selectedHw.id);
    formData.append("student_id", user.id);
    formData.append("students_name", user.student_name);
    formData.append("subclass_id", user.subclass_id);

    if (selectedFile) {
      formData.append("submission_file", {
        uri: selectedFile.uri,
        name: selectedFile.name || "file",
        type: selectedFile.mimeType || "application/octet-stream",
      });
    }

    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.post(
        `${API_URL}/homework/submit-homework`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Submission Successful", response.data.message);
        setSelectedSubject("");
        setSelectedHw("");
        setSelectedFile(null);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong!"
      );
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    getHomework();
  }, []);

  return (
    <View className="items-center justify-center  h-full p-3 ">
      <View className="bg-white border-2   border-[#305495] p-4 gap-4">
        <Text className="font-bold text-center text-2xl">Submit Homework</Text>

        <View className="flex-row flex-wrap justify-center gap-2 items-center">
          <View className="w-[48%] items-center gap-2">
            <Text className="font-bold text-gray-600">Student's Name</Text>
            <TextInput
              className="border border-[#305495] w-full rounded-md p-4"
              value={user ? user.student_name : "Loading..."}
              placeholder="Name"
              editable={false}
            />
          </View>
          <View className="w-[48%] items-center gap-2">
            <Text className="font-bold text-gray-600">Roll No</Text>
            <TextInput
              className="border border-[#305495] w-full rounded-md p-4"
              value={user ? user.roll_number : "Loading..."}
              placeholder="ID"
              editable={false}
            />
          </View>
          {pendingHw ? (
            <View className="w-[48%] items-center gap-2">
              <Text className="font-bold text-gray-600">Select Subject</Text>
              <TextInput
                className="border border-[#305495] w-full rounded-md p-4"
                value={pendingHw.subject}
                placeholder="Subject"
                editable={false}
              />
            </View>
          ) : (
            <View className="w-[48%] items-center gap-2">
              <Text className="font-bold text-gray-600">Select Subject</Text>
              <View className="w-full relative">
                <TouchableOpacity
                  onPress={() => setSubjectsOpen(!subjectsOpen)}
                  className="border border-[#305495] w-full rounded-md p-4 flex-row justify-between items-center"
                >
                  <Text>{selectedSubject || "Choose a subject"}</Text>
                  <Feather
                    name={subjectsOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>

                {subjectsOpen && (
                  <View className="absolute top-full left-0 right-0 bg-white border border-[#305495] rounded-md mt-1 z-10">
                    {uniqueSubjects.length > 0 ? (
                      uniqueSubjects.map((sub, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setSelectedSubject(sub);
                            setSelectedHw("");
                            setSubjectsOpen(false);
                          }}
                          className="p-2 border-b border-gray-200"
                        >
                          <Text>{sub}</Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text className="p-2 text-center text-gray-500">
                        No Subject Found
                      </Text>
                    )}
                  </View>
                )}
              </View>
            </View>
          )}

          {pendingHw ? (
            <View className="w-[48%] items-center gap-2">
              <Text className="font-bold text-gray-600">Homework</Text>
              <View className="border border-[#305495] w-full rounded-md p-4 bg-white">
                <Text className="text-gray-800">{pendingHw.description }</Text>
              </View>
            </View>
          ) : (
            <View className="w-[48%] items-center gap-2">
              <Text className="font-bold text-gray-600">Select Homework</Text>
              <View className="w-full relative z-50">
                <TouchableOpacity
                  onPress={() => {
                    if (selectedSubject) {
                      setHomeworksOpen(!homeworksOpen);
                    }
                  }}
                  className={`border w-full rounded-md p-4 flex-row justify-between items-center ${
                    selectedSubject
                      ? "border-[#305495] bg-white"
                      : "border-gray-300 bg-gray-100"
                  }`}
                  disabled={!selectedSubject}
                >
                  <Text
                    className={`flex-1 text-wrap ${
                      selectedSubject ? "text-gray-800" : "text-gray-400"
                    }`}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {selectedHw.description ||
                      (selectedSubject ? "Choose Homework" : "Select a subject first")}
                  </Text>
                  <Feather
                    name={homeworksOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={selectedSubject ? "black" : "gray"}
                  />
                </TouchableOpacity>

                {homeworksOpen && selectedSubject && (
                  <View className="absolute top-full left-0 right-0 bg-white border border-[#305495] rounded-md mt-1 max-h-48">
                    <ScrollView
                      style={{ maxHeight: 150 }}
                      nestedScrollEnabled={true}
                      contentContainerStyle={{ paddingVertical: 4 }}
                    >
                      {filteredHomework.length > 0 ? (
                        filteredHomework.map((hw, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setSelectedHw(hw);
                              setHomeworksOpen(false);
                            }}
                            className="p-2 border-b border-gray-200"
                          >
                            <Text className="text-gray-800 text-wrap">
                              {hw.description}
                            </Text>
                          </TouchableOpacity>
                        ))
                      ) : (
                        <Text className="p-2 text-center text-gray-500">
                          No Homework Found
                        </Text>
                      )}
                    </ScrollView>
                  </View>
                )}
              </View>
            </View>
          )}

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
        </View>

        {uploading ? (
          <ActivityIndicator size="large" color="#305495" className="mt-3" />
        ) : (
          <TouchableOpacity
            onPress={submitHomework}
            className="items-center bg-[#f1a621] p-3 rounded-xl mt-3"
          >
            <Text className="font-bold">Upload</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SubmitHomework;
