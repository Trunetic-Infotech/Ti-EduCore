import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const uploadnotes = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      console.log("Selected file:", result.uri);
      setSelectedFile(result.name);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-white border-2 border-[#305495] rounded-2xl p-5 space-y-5 shadow-md">
        <Text className="text-center text-2xl font-bold text-[#305495]">
          Upload Homework
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="font-semibold text-gray-700 mb-1">Class Name</Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Class Name"
            />
          </View>
             <View>
            <Text className="font-semibold text-gray-700 mb-1">
              Subject Name
            </Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Teacher Name"
            />
          </View>
              <View>
            <Text className="font-semibold text-gray-700 mb-1">
              ENter Chapter Name 
            </Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Teacher Name"
            />
          </View>
          <View>
            <Text className="font-semibold text-gray-700 mb-1">
              Upload Chapter Notes
            </Text>
            <TouchableOpacity
              onPress={pickDocument}
              className="border border-[#305495] rounded-lg p-3 bg-gray-50"
            >
              <Text className="text-gray-700">
                {selectedFile ? selectedFile : "Tap to select file"}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="font-semibold text-gray-700 mb-1">Start Date</Text>
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
            <Text className="font-semibold text-gray-700 mb-1">End Date</Text>
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
                onChange={onChange}
              />
            )}
          </View>
        </View>
        <TouchableOpacity className="bg-[#305495] rounded-xl py-3 mt-3 items-center">
          <Text className="text-white font-bold text-lg">Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default uploadnotes