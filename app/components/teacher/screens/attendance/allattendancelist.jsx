import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL } from '@env';
import axios from "axios";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";

const AllAttendanceList = () => {
  const user = useSelector((state) => state.auth.user);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [students, setStudents] = useState([]);

  const getAttendance = async (date) => {
    try {
      const subclass_id = user.subclass_id;
      const token = await SecureStore.getItem("token");
      const formattedDate = date.toISOString().split("T")[0];

      const response = await axios.get(
        `${API_URL}/attendance/get-class-attendance/${subclass_id}?date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.data?.length > 0) {
        setStudents(response.data.data);
      } else {
        Alert.alert("Info", "No attendance recorded for this date.");
      }

    } catch (error) {
      console.error("Error fetching attendance:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    getAttendance(selectedDate);
  }, [selectedDate]);

  const updateAttendance = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "present" ? "absent" : "present";
      const token = await SecureStore.getItem("token");

      const response = await axios.put(
        `${API_URL}/attendance/update-attendance/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

        if (response.data.success) {
      Alert.alert("Success", response.data.message || "Updated successfully.");
      getAttendance(selectedDate); // Refresh with current date
    } else {
      Alert.alert("Update Failed", response.data.message || "Could not update.");
    }
  } catch (error) {
    console.error("Update Error:", error);
    Alert.alert("Error", error.response?.data?.message || "Something went wrong.");
  }
};

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {students.map((item) => {
        const currentStatus = item.status?.toLowerCase(); // ✅ FIXED

        return (
          <View
            key={item.id}
            className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-200"
          >
            <Text className="text-lg font-bold text-[#305495] mb-1">
              {item.student_name}
            </Text>
            <Text className="text-sm text-gray-700">Student ID: {item.roll_number}</Text>
            <Text className="text-sm text-gray-700">Gmail: {item.email}</Text>
            <Text className="text-sm text-gray-700">
              Date: {new Date(item.attendance_date).toLocaleDateString("en-CA")}
            </Text>
            <Text
              className={`text-sm font-semibold mt-2 ${
                currentStatus === "present" ? "text-green-600" : "text-red-500"
              }`}
            >
              Status: {currentStatus === "present" ? "Present" : "Absent"}
            </Text>

            <View className="flex-row justify-between items-center mt-3">
              <TouchableOpacity
                className={`px-4 py-2 rounded-full ${
                  currentStatus === "present" ? "bg-green-600" : "bg-gray-300"
                }`}
                onPress={() => updateAttendance(item.attendance_id, currentStatus)}
              >
                <Text className="text-white font-semibold text-sm">
                  Mark As Present
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`px-4 py-2 rounded-full ${
                  currentStatus === "absent" ? "bg-red-600" : "bg-gray-300"
                }`}
                onPress={() => updateAttendance(item.attendance_id, currentStatus)}
              >
                <Text className="text-white font-semibold text-sm">
                  Mark As Absent
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default AllAttendanceList;
