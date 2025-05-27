import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";
import axios from "axios";

const takeattendance = () => {
  const user = useSelector((state) => state.auth.user);
  const [status, setStatus] = useState("Absent");
  const [students, setStudents] = useState([]);
   const [attendance, setAttendance] = useState({});
  const [attendanceDate, setAttendanceDate] = useState(() => {
    // Default to today's date in YYYY-MM-DD format
    return new Date().toISOString().split("T")[0];
  });

  const getClassStudents = async () => {
    try {
      const subclass_id = user.subclass_id;
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${API_URL}/teacher/get-class-students/${subclass_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.students) {
        setStudents(response.data.students);
      } else {
        Alert.alert("No student data received.");
      }
    } catch (error) {
      Alert.alert("Failed to fetch students.");
    }
  };

 
  const markAttendance = async (studentId, newStatus) => {
    try {
      setStatus(newStatus);
      const teacher_id = user.id;
      const token = await SecureStore.getItemAsync("token");

      const payload = {
        student: studentId,
        status: newStatus,
        teacher_id,
        attendance_date: attendanceDate,
      };

      const response = await axios.post(
        `${API_URL}/attendance/marks-attendance`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from backend:", response.data); // ✅ log this

      if (response.data.success) {
  setAttendance((prev) => ({ ...prev, [studentId]: newStatus }));
  Alert.alert("Success", response.data.message);
} else {
  Alert.alert("Failed", response.data.message);
}
} catch (error) {
  if (error.response) {
    console.log("Error Response Data:", error.response.data);
    console.log("Error Status:", error.response.status);

    // ✅ Show backend message in the alert
    Alert.alert("Error", error.response.data.message || "Could not mark attendance.");
  } else {
    console.log("Unexpected Error:", error.message);
    Alert.alert("Error", "Could not mark attendance.");
  }
}
  }

  useEffect(() => {
    getClassStudents();
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {students.map((item) => (
        <View
          key={item.id}
          className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-200"
        >
          <Text className="text-lg font-bold text-[#305495] mb-1">
            {item.student_name}
          </Text>
          <Text className="text-sm text-gray-700">
            Student ID: {item.roll_number}
          </Text>
          <Text className="text-sm text-gray-700 mb-3">
            Email: {item.email}
          </Text>

          <View className="flex-row justify-between">
            <View className="justify-center ">
              <TouchableOpacity className="bg-[#305495] p-4 rounded-md text-center ">
                <Text className="text-white font-semibold text-sm">
                  Attendance
                </Text>
              </TouchableOpacity>
            </View>

            <View className="gap-2">
              <TouchableOpacity
                className="bg-[#f1a621] hover:bg-[#da9f3b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#da9f3b]  transition duration-150 ease-in-out"
                onPress={() => markAttendance(item, "present")}
              >
                <Text className="text-white font-semibold text-sm">
                  Present
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-[#305495] hover:bg-[#284479] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#284479] transition duration-150 ease-in-out"
                  
                onPress={() => markAttendance(item, "absent")}
              >
                <Text className="text-white font-semibold text-sm">Absent</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default takeattendance
