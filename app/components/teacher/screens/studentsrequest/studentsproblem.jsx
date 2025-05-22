import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";

const demoStudents = [
  {
    Students_ID: "1",
    Students_name: "Amar Bhai",
    class: "10",
    Questions: "Why is the library closed on weekends?",
    Complaint_date: "2025-06-10",
    Contact: "9876543210",
    Ansewar: "",
    status: "Answer",
  },
  {
    Students_ID: "2",
    Students_name: "Rahul Sharma",
    class: "9",
    Questions: "No water in the boys' washroom",
    Complaint_date: "2025-06-10",
    Contact: "9876543211",
    Ansewar: "Issue resolved. Maintenance completed.",
    status: "Solve",
  },
  {
    Students_ID: "3",
    Students_name: "Sana Khan",
    class: "10",
    Questions: "Projector not working in classroom 10A",
    Complaint_date: "2025-06-10",
    Contact: "9876543212",
    Ansewar: "Technician scheduled to fix it by Monday.",
    status: "Solve",
  },
];

const Studentsproblem = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = demoStudents.filter(student =>
    student.Students_name.toLowerCase().includes(searchTerm.toLowerCase())
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

      {/* Complaints List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredStudents.length === 0 ? (
          <Text className="text-center text-gray-500 italic">
            No complaints found.
          </Text>
        ) : (
          filteredStudents.map((student, index) => (
            <View
              key={index}
              className={`rounded-xl p-6 mb-6 ${
                index % 2 === 0 ? "bg-blue-100" : "bg-orange-200"
              }`}
            >
              <Text className="text-xl font-semibold text-[#305495] mb-2">
                {student.Students_name}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Student ID: </Text>
                {student.Students_ID}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Class: </Text>
                {student.class}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Contact: </Text>
                {student.Contact}
              </Text>

              <Text className="text-sm mb-1 mt-2">
                <Text className="font-medium text-[#305495]">Complaint: </Text>
                {student.Questions}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Answer: </Text>
                {student.Ansewar || "Pending response..."}
              </Text>

              <Text className="text-sm mb-3">
                <Text className="font-medium text-[#305495]">Complaint Date: </Text>
                {student.Complaint_date}
              </Text>

              <Text className="text-base font-bold">
                Status:{" "}
                <Text
                  className={`${
                    student.status.toLowerCase() === "solve"
                      ? "text-green-700"
                      : "text-yellow-700"
                  }`}
                >
                  {student.status}
                </Text>
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Studentsproblem;
