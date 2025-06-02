import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "@env";
import { useSelector } from "react-redux";

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

const studentsquestions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answerText, setAnswerText] = useState(""); // for input value
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestionsId, setSelectedQuestionsId] = useState(null);

  const user = useSelector((state) => state.auth.user);

  const filteredStudents = questions.filter((student) =>
    student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAllQuestions = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${API_URL}/students/askquestions/get-ask-questions/${user.id}?admin_id=${user.admin_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.qnas);
      if (response.data && response.data.qnas) {
        setQuestions(response.data.qnas);
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.response?.data?.message || "Something went wrong!");
    }
  };
  // console.log(isOpen);
  // console.log(selectedQuestionsId);

  const handleAnswer = async (id) => {
    try {
      const token = await SecureStore.getItemAsync("token");

      const response = await axios.patch(
        `${API_URL}/students/askquestions/update-ask-questions/${id}`,
        { answer_text: answerText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        Alert.alert("Submitted!", response.data.message);
        getAllQuestions();
        setSelectedQuestionsId(null);
        setAnswerText("");
        setIsOpen(false); // ✅ ensure it's here
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  return (
    <View className="flex-1 bg-gray-100 p-4 relative items-center justify-center">
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
            No Questions found.
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
                {student.student_name}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Student ID: </Text>
                {student.roll_number}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Class: </Text>
                {student.class_name}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Contact: </Text>
                {student.phone_number}
              </Text>

              <Text className="text-sm mb-1 mt-2">
                <Text className="font-medium text-[#305495]">Complaint: </Text>
                {student.question_text}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Answer: </Text>
                {student.answer_text || "Pending response..."}
              </Text>

              <Text className="text-sm mb-3">
                <Text className="font-medium text-[#305495]">
                  Complaint Date:{" "}
                </Text>
                {student.Complaint_date}
              </Text>

              {student.answer_text ? (
                ""
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setIsOpen(true);
                    setSelectedQuestionsId(student.id);
                  }}
                  className={`w-full items-center ${
                    index % 2 === 0 ? "bg-[#f1a621]" : "bg-[#305495]"
                  } rounded-md p-2`}
                >
                  <Text
                    className={`font-bold ${
                      index % 2 === 0 ? "" : "text-white"
                    }`}
                  >
                    Answer the Question
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>

      {isOpen && (
        <View className="absolute z-10 w-[90%] max-w-md h-[50%] top-[25%] left-[5%] bg-white rounded-2xl shadow-2xl p-4">
          <TextInput
            value={answerText}
            onChangeText={setAnswerText}
            className="w-full h-[70%] bg-gray-100 rounded-xl p-3 text-base"
            placeholder="Write your answer here..."
            multiline
            textAlignVertical="top"
          />

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={() => {
                // submit logic here
                handleAnswer(selectedQuestionsId);
              }}
              className="bg-blue-500 px-4 py-2 rounded-xl"
            >
              <Text className="text-white font-semibold">Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsOpen(false);
                setAnswerText("");
              }}
              className="bg-gray-400 px-4 py-2 rounded-xl"
            >
              <Text className="text-white font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default studentsquestions;
