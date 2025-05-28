import { View, Text, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";
import axios from "axios";

const feesstructure = ({students}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pressedItem, setPressedItem] = useState(null); // Track which item is being pressed
  const [selectedStudent, setSelectedStudent] = useState(null);

  // const students = ["Amar", "Akbar", "Anthony", "Amit"];


  const [selectedClassId, setSelectedClassId] = useState('');
  const [feeStructure, setFeeStructure] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalFees, setTotalFees] = useState(0);

  // Auto-select class_id if only one student exists
  useEffect(() => {
    if (students.length === 1) {
      const onlyStudent = students[0];
      setSelectedClassId(onlyStudent.class_id);
      fetchFeeStructure(onlyStudent.class_id);
    }
  }, [students]);

  const fetchFeeStructure = async (classId) => {
    if (!classId) return;

    try {
      setIsLoading(true);
      const token = SecureStore.getItemAsync('token');
      const res = await axios.get(
        `${API_URL}/class/fees/get/fees-strucrture/${classId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data?.data);
      
      if (res.data?.data) {
        setFeeStructure(res.data.data);
        setTotalFees(res.data.totalFees || 0);
      } else {
        setFeeStructure([]);
        setTotalFees(0);
        Alert.alert("Error", res.data.message || "No fees Structure Found")
      }
    } catch (error) {
      console.error('Failed to fetch fee structure:', error);
      setFeeStructure([]);
      setTotalFees(0);
      Alert.alert("Error", "Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <View>
        <Text className="font-bold text-xl">Select Student:</Text>
        <View className="mt-1">
          <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            className="flex-row items-center border border-[#305495] rounded-xl p-2 bg-white"
          >
            <Text className="text-black text-md font-bold">{selectedStudent ? selectedStudent.student_name : "--Select A Student--" }  </Text>
            <Feather
              name="chevron-down"
              size={20}
              color="#305495"
              className="ml-2"
            />
          </TouchableOpacity>
        </View>
      </View>

      {isOpen && (
        <View className="bg-white rounded-xl shadow-md p-2 mt-2">
          {students.map((student, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setSelectedStudent(student);
                fetchFeeStructure(student.class_id)
                setIsOpen(false);
              }}
              onPressIn={() => setPressedItem(index)}
              onPressOut={() => setPressedItem(null)}
              className={`p-2 rounded-lg ${
                pressedItem === index ? "bg-blue-200" : "bg-white"
              }`}
            >
              <Text className="font-bold text-black">{student.student_name}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <View className="mt-6 w-[90vw] mx-auto">
  <Text className="text-xl font-bold text-[#305495] mb-3">
    Fee Structure
  </Text>

  {feeStructure.length === 0 ? (
    <Text className="text-gray-500 text-center">No fee structure found.</Text>
  ) : (
    feeStructure.map((item, index) => (
      <View
        key={item.id}
        className="bg-white rounded-xl shadow-md p-4 mb-3 flex-row justify-between items-center"
      >
        <Text className="text-base font-semibold text-gray-800">
          {item.structure_name}
        </Text>
        <Text className="text-base font-bold text-green-600">
          ₹ {parseFloat(item.amount).toFixed(2)}
        </Text>
      </View>
    ))
  )}

  {feeStructure.length > 0 && (
    <View className="bg-blue-100 rounded-xl p-4 mt-4 flex-row justify-between items-center">
      <Text className="text-lg font-bold text-[#305495]">Total Fees</Text>
      <Text className="text-lg font-bold text-[#305495]">
        ₹ {parseFloat(totalFees).toFixed(2)}
      </Text>
    </View>
  )}
</View>


    </View>
  );
};

export default feesstructure;
