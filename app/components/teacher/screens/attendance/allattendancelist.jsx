import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const students = [
  {
    id: "1",
    name: "Asad Shaikh",
    phone: "9876543210",
    class: "1",
    division: "A",
    Date: "2023-08-01",
    status: "Present",
  },
  {
    id: "2",
    name: "Pooja Verma",
    phone: "9876543210",
    class: "1",
    division: "A",
    Date: "2023-08-01",
    status: "Absent",
  },
  {
    id: "3",
    name: "Rahul Kumar",
    phone: "9876543210",
    class: "1",
    division: "A",
    Date: "2023-08-01",
    status: "Absent",
  },
  {
    id: "4",
    name: "Sneha Patil",
    phone: "9876543210",
    class: "1",
    division: "A",
    Date: "2023-08-01",
    status: "Present",
  },
  {
    id: "5",
    name: "Anjali Singh",
    phone: "9876543210",
    class: "1",
    division: "A",
    Date: "2023-08-01",
    status: "Present",
  },
  {
    id: "6",
    name: "Rohit Sharma",
    phone: "9876543210",
    class: "1",
    division: "A",
    Date: "2023-08-01",
    status: "Present",
  },
];

const AllAttendanceList = () => {
  const [showAttendance, setShowAttendance] = useState(() => {
    // Initialize attendance from initial student status
    const initial = {};
    students.forEach((student) => {
      initial[student.id] = student.status.toLowerCase(); // present/absent
    });
    return initial;
  });

  const markAttendance = (id, status) => {
    setShowAttendance((prev) => ({ ...prev, [id]: status }));
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {students.map((item) => {
        const currentStatus = showAttendance[item.id];
        return (
          <View
            key={item.id}
            className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-200"
          >
            <Text className="text-lg font-bold text-[#305495] mb-1">
              {item.name}
            </Text>
            <Text className="text-sm text-gray-700">Phone: {item.phone}</Text>
            <Text className="text-sm text-gray-700">Class: {item.class}</Text>
            <Text className="text-sm text-gray-700">
              Division: {item.division}
            </Text>
            <Text className="text-sm text-gray-700">Date: {item.Date}</Text>
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
                onPress={() => markAttendance(item.id, "present")}
              >
                <Text className="text-white font-semibold text-sm">
                  Mark Present
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`px-4 py-2 rounded-full ${
                  currentStatus === "absent" ? "bg-red-600" : "bg-gray-300"
                }`}
                onPress={() => markAttendance(item.id, "absent")}
              >
                <Text className="text-white font-semibold text-sm">
                  Mark Absent
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
