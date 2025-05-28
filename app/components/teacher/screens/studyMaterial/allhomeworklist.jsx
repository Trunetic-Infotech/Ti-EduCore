import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import StudentSubmissions from "../homework/StudentSubmissions";

const AllHomeworkList = ({ homeworkList, getHomeworkAndSubmissions, setHomework_id, setSelectedComponent }) => {

  
  const handleDownload = (url) => Linking.openURL(url);
  const handleEdit = (id) => console.log(`Edit clicked for ${id}`);
  const handleDelete = (id) => console.log(`Delete clicked for ${id}`);

  useEffect(() => {
    getHomeworkAndSubmissions();
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-200">
        <Text className="text-lg font-bold text-[#305495]">All Homework List</Text>
      </View>

      {/* Conditional rendering if no homework */}
    {homeworkList.length > 0 ? (
  homeworkList.map((hw, index) => (
    <View
      key={hw.homework_id}
      className={`p-4 mb-4 rounded-2xl shadow-md border border-gray-200 ${
        index % 2 === 0 ? "bg-blue-100" : "bg-orange-200"
      }`}
    >
      <Text className="text-lg font-bold text-[#305495] mb-1">
        Subject Name: {hw.subject}
      </Text>

      <Text className="text-sm text-gray-800 mb-1">
        Description: {hw.description}
      </Text>

      <Text className="text-sm text-gray-700 mb-1">
        Submission Date:{" "}
        {hw.submission_date
          ? new Date(hw.submission_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })
          : "N/A"}
      </Text>

      <Text className="text-sm text-gray-700 mb-2">Room No: {hw.room_no || "N/A"}</Text>

      {/* Submission Students List */}
      <View className="flex-row items-center mb-4">
        <Icon name="link" size={18} color="#305495" />
        <TouchableOpacity
          onPress={() => {
            setHomework_id(hw.homework_id);
            setSelectedComponent({
              subitem: {
                component: (
                  <StudentSubmissions
                    homeworkList={homeworkList}
                    homework_id={hw.homework_id}
                  />
                ),
              },
            });
          }}
        >
          <Text className="text-sm text-[#305495] font-semibold underline ml-2">
            Submission Students Lists
          </Text>
        </TouchableOpacity>
      </View>

      {/* View Homework Button */}
      <TouchableOpacity
        className="bg-green-600 rounded-full px-5 py-3 flex-row items-center justify-center mb-4"
        onPress={hw.upload_homework ? () => handleDownload(hw.upload_homework) : null}
      >
        <Icon name="visibility" size={18} color="#fff" />
        <Text className="text-white font-semibold text-sm ml-2">View Homework</Text>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View className="flex-row justify-between items-center">
        <Text className="text-white font-semibold text-sm bg-[#305495] px-4 py-2 rounded-md">
          Action
        </Text>
        <View className="gap-2">
          <TouchableOpacity
            className="bg-yellow-500 px-4 py-2 rounded-full mb-2"
            onPress={() => handleEdit(hw.homework_id)}
          >
            <Text className="text-white font-semibold text-sm">✏️ Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-600 px-4 py-2 rounded-full"
            onPress={() => handleDelete(hw.homework_id)}
          >
            <Text className="text-white font-semibold text-sm">🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ))
) : (
  <View className="flex-1 items-center justify-center">
    <Text className="text-gray-500 text-lg">No Homework found</Text>
  </View>
)}

    </ScrollView>
  );
};

export default AllHomeworkList;
