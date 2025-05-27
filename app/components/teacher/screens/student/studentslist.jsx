import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";
import StudentProfile from "./StudentProfile";


const StudentList = ({setSelectedComponent}) => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const user = useSelector((state) => state.auth.user);
 

  const fetchStudents = async (page = 1) => {
    try {
      const token = await SecureStore.getItemAsync("token");

      const response = await axios.get(
        `${API_URL}/student/teacher/profile/${user.subclass_id}?page=${page}&limit=${studentsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.Students) {
        setStudents(response.data.Students);
        setTotalPages(response.data.totalPages || 1);
      } else {
        Alert.alert("Notice", response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong!"
      );
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCall = (phone_number) => Linking.openURL(`tel:${phone_number}`);
  const handleEmail = (email) => Linking.openURL(`mailto:${email}`);

useEffect(() => {
  fetchStudents(currentPage);
}, [currentPage]); // 👈 this ensures the data refetches when page changes

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {students.map((item) => (
        <View
          key={item.id}
          className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-200"
        >
          <Text className="text-lg font-bold text-[#305495] mb-1">
          Student Name :  {item.student_name}
          </Text>
          <Text className="text-sm text-gray-700">
            Class: {user.class_name}
          </Text>
          <Text className="text-sm text-gray-700">
            Division: {item.division}
          </Text>
          <Text className="text-sm text-gray-700">
            Phone: {item.phone_number}
          </Text>
          <Text className="text-sm text-gray-700 mb-3">
            Email: {item.email}
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="bg-green-500 px-4 py-2 rounded-full"
              onPress={() => handleCall(item.phone_number)}
            >
              <Text className="text-white font-semibold text-sm">Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-500 px-4 py-2 rounded-full"
              onPress={() => handleEmail(item.email)}
            >
              <Text className="text-white font-semibold text-sm">Email</Text>
            </TouchableOpacity>
         <TouchableOpacity
  className="bg-gray-800 px-4 py-2 rounded-full"
  onPress={() =>
    // router.push({
    //   pathname:  "./StudentProfile",
    //   params: { student_id: item.id },
    // })
    setSelectedComponent(<StudentProfile student_id={item.id} />)
  }
>
              <Text className="text-white font-semibold text-sm">View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View className="flex flex-row justify-center items-center mt-6 space-2">
        {/* Prev Button */}
        <TouchableOpacity
          className={`px-4 py-2 rounded-md ${
            currentPage === 1 ? "bg-gray-300" : "bg-[#305495]"
          } `}
          disabled={currentPage === 1}
          onPress={() => handlePageChange(currentPage - 1)}
        >
          <Text
            className={`text-sm font-semibold ${
              currentPage === 1 ? "text-gray-600" : "text-white"
            }`}
          >
            Prev
          </Text>
        </TouchableOpacity>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePageChange(index + 1)}
            className={`px-3 py-2 rounded-md border ${
              currentPage === index + 1
                ? "bg-[#305495] text-white border-[#305495]"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          >
            <Text className="text-sm">{index + 1}</Text>
          </TouchableOpacity>
        ))}

        {/* Next Button */}
        <TouchableOpacity
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages ? "bg-gray-300" : "bg-[#305495]"
          } `}
          disabled={currentPage === totalPages}
          onPress={() => handlePageChange(currentPage + 1)}
        >
          <Text
            className={`text-sm font-semibold ${
              currentPage === totalPages ? "text-gray-600" : "text-white"
            }`}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StudentList;
