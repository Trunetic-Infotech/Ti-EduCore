import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";

const StudentSubmissions = ({ homeworkList, homework_id }) => {
  const homework = homeworkList.find((hw) => hw.homework_id === homework_id);

  if (!homework) {
    return (
      <View className="p-4">
        <Text className="text-gray-500 text-center">Homework not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-2 text-[#305495]">
        {homework.subject} - Student Submissions
      </Text>

      <Text className="text-gray-700 mb-1">Description: {homework.description}</Text>

      <Text className="text-gray-700 mb-4">
        Submission Deadline:{" "}
        {homework.submission_date
          ? new Date(homework.submission_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })
          : "N/A"}
      </Text>

      {homework.student_submissions.length > 0 ? (
        <View className="space-y-4">
          {homework.student_submissions.map((student, index) => (
            <View
              key={index}
              className="bg-white rounded-xl p-4 border border-gray-300 shadow-sm"
            >
              <Text className="text-base font-semibold text-[#305495] mb-2">
                👤 {student.student_name}
              </Text>

              <Text className="text-sm text-gray-700 mb-1">
                Submission Date:{" "}
                {student.submission_date
                  ? new Date(student.submission_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })
                  : "N/A"}
              </Text>

              <Text className="text-sm text-gray-700 mb-2">
                Status:{" "}
                <Text
                  className={`font-bold ${
                    student.submission_status === "Approved"
                      ? "text-green-600"
                      : student.submission_status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {student.submission_status}
                </Text>
              </Text>

              {student.submission_file ? (
                <TouchableOpacity
                  className="bg-blue-500 px-4 py-2 rounded-full mt-2"
                  onPress={() => Linking.openURL(student.submission_file)}
                >
                  <Text className="text-white text-sm font-semibold text-center">
                    📎 View File
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text className="text-gray-500">No file submitted</Text>
              )}
            </View>
          ))}
        </View>
      ) : (
        <Text className="text-gray-500 mt-4 text-center">No submissions yet.</Text>
      )}
    </ScrollView>
  );
};



export default StudentSubmissions