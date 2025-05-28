import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "@env";

const StudentsProgress = () => {
  const [progress, setProgress] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const studentsPerPage = 12;

  const user = useSelector((state) => state.auth.user);

  const getStudentAttendanceProgress = async (page = 1) => {
    try {
      const token = await SecureStore.getItem("token");

      const response = await axios.get(
        `${API_URL}/attendance/get-subclass-student-progress/attendance?page=${page}&limit=${studentsPerPage}&class_id=${user.class_id}&subclass_id=${user.subclass_id}&admin_id=${user.admin_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.data) {
        setProgress(response.data.data);
        setTotalPages(response.data.totalPages || 1);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    getStudentAttendanceProgress();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    getStudentAttendanceProgress(newPage);
  };

  const filteredStudents = progress.filter((student) =>
    (student.student_name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Search Bar */}
      <View className="flex-row items-center mb-6 space-x-3">
        <TextInput
          className="flex-1 border-2 border-[#305495] rounded-xl p-3 text-[#305495]"
          placeholder="Search by Student Name"
          placeholderTextColor="#305495"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Text className="text-gray-500 text-2xl">🔍</Text>
      </View>

      {/* Student Attendance Cards */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredStudents.length === 0 ? (
          <Text className="text-center text-gray-500 italic">No students found.</Text>
        ) : (
          filteredStudents.map((prog, index) => (
            <View
              key={index}
              className={`rounded-xl p-6 mb-6 ${
                index % 2 === 0 ? "bg-blue-100" : "bg-orange-200"
              }`}
            >
              <Text className="text-xl font-semibold text-[#305495] mb-2">
                {prog.student_name}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Student ID: </Text>
                {prog.roll_number}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Class: </Text>
                {prog.class_name} - {prog.division}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Total Days: </Text>
                {prog.total_days}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Present Days: </Text>
                {prog.total_present}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Absent Days: </Text>
                {prog.total_absent}
              </Text>

              <Text className="text-sm mb-3">
                <Text className="font-medium text-[#305495]">Attendance: </Text>
                <Text
                  className={`font-bold ${
                    parseFloat(prog.attendance_percentage) >= 90
                      ? "text-green-600"
                      : parseFloat(prog.attendance_percentage) >= 75
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {prog.attendance_percentage}%
                </Text>
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <View className="flex-row justify-between items-center mt-4">
          <TouchableOpacity
            disabled={currentPage === 1}
            onPress={() => handlePageChange(currentPage - 1)}
          >
            <Text
              className={`text-blue-600 text-lg ${
                currentPage === 1 ? "opacity-30" : "opacity-100"
              }`}
            >
              ◀ Prev
            </Text>
          </TouchableOpacity>

          <Text className="text-gray-700">
            Page {currentPage} of {totalPages}
          </Text>

          <TouchableOpacity
            disabled={currentPage === totalPages}
            onPress={() => handlePageChange(currentPage + 1)}
          >
            <Text
              className={`text-blue-600 text-lg ${
                currentPage === totalPages ? "opacity-30" : "opacity-100"
              }`}
            >
              Next ▶
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default StudentsProgress;
