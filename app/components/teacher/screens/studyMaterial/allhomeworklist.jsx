import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

const students = [
  {
    id: "1",
    name: "Asad Shaikh",
    phone: "9876543210",
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere neque odit voluptas harum nemo pariatur.",
    Date: "12-08-2023",
    downloadLink: "https://example.com/homework1.pdf",
  },
  {
    id: "2",
    name: "Pooja Verma",
    phone: "9123456789",
    Description: "Test Homework",
    Date: "12-08-2023",
    downloadLink: "https://example.com/homework2.pdf",
  },
];

const AllHomeworkList = () => {
  const handleDownload = (url) => Linking.openURL(url);
  const handleEdit = (id) => console.log(`Edit clicked for ${id}`);
  const handleDelete = (id) => console.log(`Delete clicked for ${id}`);

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-200">
        <Text className="text-lg font-bold text-[#305495]">All Homework List</Text>
      </View>

      {students.map((item) => (
        <View
          key={item.id}
          className="bg-white p-4 mb-4 rounded-2xl shadow-md border border-gray-200"
        >
          <Text className="text-lg font-bold text-[#305495] mb-1">
            Student Name: {item.name}
          </Text>

          <Text className="text-sm text-gray-800 mb-1">
            Description: {item.Description}
          </Text>

          <Text className="text-sm text-gray-700 mb-1">
            Submission Date: {item.Date}
          </Text>

          <Text className="text-sm text-gray-700 mb-2">Room No: N/A</Text>

          {/* Submission List Link */}
          <View className="flex-row items-center mb-4">
            <Icon name="link" size={18} color="#305495" />
            <TouchableOpacity onPress={() => handleDownload(item.downloadLink)}>
              <Text className="text-sm text-[#305495] font-semibold underline ml-2">
                Submission Students Lists
              </Text>
            </TouchableOpacity>
          </View>

          {/* View Homework Button */}
          <TouchableOpacity
            className="bg-green-600 rounded-full px-5 py-3 flex-row items-center justify-center mb-4"
            onPress={() => handleDownload(item.downloadLink)}
          >
            <Icon name="visibility" size={18} color="#fff" />
            <Text className="text-white font-semibold text-sm ml-2">
              View Homework
            </Text>
          </TouchableOpacity>

          {/* Action Buttons */}
          <View className="flex-row justify-between items-center">
            <Text className="text-white font-semibold text-sm bg-[#305495] px-4 py-2 rounded-md">
              Action
            </Text>

            <View className="gap-2">
              <TouchableOpacity
                className="bg-yellow-500 px-4 py-2 rounded-full mb-2"
                onPress={() => handleEdit(item.id)}
              >
                <Text className="text-white font-semibold text-sm">✏️ Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-600 px-4 py-2 rounded-full"
                onPress={() => handleDelete(item.id)}
              >
                <Text className="text-white font-semibold text-sm">🗑️ Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default AllHomeworkList;
