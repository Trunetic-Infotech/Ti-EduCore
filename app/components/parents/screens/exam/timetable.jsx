import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { API_URL } from "@env";
import axios from "axios";
import { useSelector } from "react-redux";

const timetable = ({ students }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [pressedItem, setPressedItem] = useState(null); // Track which item is being pressed
  const [classTimeTable, setclassTimeTable] = useState([]);
  const [classId, setclassId]= useState(null)

  console.log(students[0], "hello");

  //   const students = [
  //   { name: "Amar", id: "1" },
  //   { name: "Vaibhav", id: "2" },
  //   { name: "Akshay", id: "3" },
  //   { name: "Asad", id: "4" },
  // ];

  const user = useSelector((state) => state.auth.user);

  // const getExamTimeTable = async (id) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       `${API_URL}/exam/get-exam-time-table/${id}?admin_id=${user.admin_id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log(response, "hello");
  //     if (response.data.success) {
  //       setclassTimeTable(response.data.class_exams);
  //       setWholeExamTT(response.data.whole_school_exams);
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   getExamTimeTable();
  // }, []);

  useEffect(() => {
    setclassId ();

  }, [])

  return (
    <View>
      <View>
        <Text className="font-bold text-xl">Select Student:</Text>
        <View className="mt-1">
          <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            className="flex-row items-center border border-[#305495] rounded-xl p-2 bg-white"
          >
            <Text className="text-black text-md font-bold ">
              {" "}
              {selectedStudent ? selectedStudent : "--selecte A Student--"}{" "}
            </Text>

            <Feather
              name="chevron-down"
              size={20}
              color="#305495"
              className="ml-2"
            />
          </TouchableOpacity>
        </View>
      </View>

      {isOpen ? (
        <View className="bg-white rounded-xl shadow-md p-4 space-y-3 gap-2 ">
          {students.map((student, index) => (
            <View>
              <Pressable
                key={index}
                onPress={() => {
                  setSelectedStudent(student.student_name);
                  setIsOpen(false);
                }}
                onPressIn={() => setPressedItem(index)}
                onPressOut={() => setPressedItem(null)}
                className={`p-2 rounded-lg ${
                  pressedItem === index ? "bg-blue-200" : "bg-white"
                }`}
              >
                <Text>{student.student_name}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : (
        ""
      )}

      {classTimeTable.length > 0 && (
        <View className="mt-6">
          <Text className="font-bold text-lg mb-2">Final Term</Text>
          {classTimeTable.map((exam, index) => (
            <View
              key={index}
              className="bg-white rounded-lg p-4 mb-2 shadow-md space-y-2"
            >
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Subject:</Text>
                <Text className="font-semibold">{exam.subject}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Date:</Text>
                <Text className="font-semibold">{exam.Date}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Time:</Text>
                <Text className="font-semibold">{exam.time}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default timetable;
