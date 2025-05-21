import { FlatList, Text, View, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
const students = [
  {
    id: "1",
    Subject_name: "Mathematics",
    Chapter_Name: "Additions",
    class: "1",
    division: "A",
    Start_Date: "2023-08-01",
    End_Date: "2023-08-31",
    Download: "https://chatgpt.com/share/682c55a4-1ac4-8012-ad90-fab2f839fa52",
  },
  // ... other items
];

const AllStudyMaterial = () => {
  const handleDownload = (url) => {
    Linking.openURL(url);
  };

  const handleDelete = (id) => {
    console.log(`Delete clicked for ID: ${id}`);
    // Your delete logic here
  };

  return (
    <View>
      <View className="bg-white p-4 mb-4 rounded-4xl shadow-sm border border-gray-200">
        <Text className="text-lg font-bold text-[#305495] mb-1">
          All Study Material List
        </Text>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10, backgroundColor: "#f3f4f6" }}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-[#305495]">
            <Text className="text-lg font-bold text-[#305495] mb-1">
              {item.Subject_name} - {item.Chapter_Name}
            </Text>
            <Text className="text-sm text-gray-700">
              Subjects: {item.Chapter_Name}
            </Text>
            <Text className="text-sm text-gray-700">Class: {item.class}</Text>
            <Text className="text-sm text-gray-700">
              Division: {item.division}
            </Text>
            <Text className="text-sm text-gray-700">
              Start Date: {item.Start_Date}
            </Text>
            <Text className="text-sm text-gray-700">
              End Date: {item.End_Date}
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
                onPress={() => handleDownload(item.Download)}
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
                onPress={() => handleDelete(item.id)}
              >
                <Text className="text-white font-semibold text-sm">
                  🗑️ Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default AllStudyMaterial;
