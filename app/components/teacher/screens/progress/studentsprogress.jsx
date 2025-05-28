import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import { useSelector } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL } from '@env';

const demoStudents = [
  {
    Students_ID: "1",
    Students_name: "Amar Bhaieeeee",
    class: "10",
    Divison: "A",
    Submit_date: "2025-06-10",
    total_days: "30",
    Presend_Days: "25",
    Absent_Days: "5",
    Attendance: "83.33%",
  },
  {
    Students_ID: "2",
    Students_name: "Rahul Sharma",
    class: "9",
    Divison: "B",
    Submit_date: "2025-06-11",
    total_days: "28",
    Presend_Days: "27",
    Absent_Days: "1",
    Attendance: "96.42%",
  },
  {
    Students_ID: "3",
    Students_name: "Sana Khan",
    class: "10",
    Divison: "A",
    Submit_date: "2025-06-09",
    total_days: "30",
    Presend_Days: "30",
    Absent_Days: "0",
    Attendance: "100%",
  },
];

const StudentsProgress = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredStudents = progress.filter(student =>
  (student.student_name || '').toLowerCase().includes(searchTerm.toLowerCase())
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
          <Text className="text-center text-gray-500 italic ">No students found.</Text>
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
                {prog.total_days}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Absent Days: </Text>
                {prog.total_absent}
              </Text>

              <Text className="text-sm mb-3">
                <Text className="font-medium text-[#305495]">Attendance: </Text>
                <Text
                  className={`font-bold ${
                    parseFloat(prog.attendance_perecentage) >= 90
                      ? "text-green-600"
                      : parseFloat(prog.attendance_perecentage) >= 75
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {prog.Attendance}
                </Text>
              </Text>

              <Text className="text-xs text-gray-600 italic">
                Last Updated: {prog.Submit_date}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default StudentsProgress;
