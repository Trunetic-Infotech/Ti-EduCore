import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Modal, Pressable, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store'
import axios from "axios";
import { API_URL } from '@env';

const StudentList = () => {
    const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(5);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  //  const [student, setStudent] = useState([]);

  const user = useSelector((state) => state.auth.user);

  const student = [
    { id: '1', name: 'Asad Shaikh', class: '1', division: 'A', phone: '9876543210', email: 'asad@example.com' },
    { id: '2', name: 'Pooja Verma', class: '2', division: 'B', phone: '9123456789', email: 'pooja@example.com' },
    { id: '3', name: 'Rahul Kumar', class: '3', division: 'C', phone: '9988776655', email: 'rahul@example.com' },
    { id: '4', name: 'Sneha Patil', class: '4', division: 'A', phone: '9871234560', email: 'sneha@example.com' },
    { id: '5', name: 'Anjali Singh', class: '5', division: 'B', phone: '9123987654', email: 'anjali@example.com' },
    { id: '6', name: 'Rohit Sharma', class: '6', division: 'C', phone: '9012345678', email: 'rohit@example.com' },
    // Add more if needed
  ];

  const totalPage = Math.ceil(students.length / studentsPerPage);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
 const currentStudents = students;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSelectPerPage = (value) => {
    setStudentsPerPage(value);
    setCurrentPage(1);
    setDropdownVisible(false);
  };

  

  const getStudentsDetails = async (page = 1, limit = studentsPerPage) => {
    const token =await SecureStore.getItemAsync("token");
    try {
      const response = await axios.get(
        `${API_URL}/student/driver/student/profile/${user.id}?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.Students)

      if (response.data && response.data.Students) {
       setStudents(response.data.Students);
        setTotalPages(response.data.totalPages ||1);
      } else {
        Alert.alert.error(response.data.message || "No students found");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      Alert.alert.error(errorMessage);
    }
  };
useEffect(() => {
  getStudentsDetails(currentPage, studentsPerPage);
}, [currentPage, studentsPerPage]);


  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">


      {/* Student cards */}
      {currentStudents.map((student,index) => (
        <View
          key={index}
          className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-200"
        >
          <Text className="text-lg font-bold text-[#305495] mb-1">Roll No:  {student.roll_number}</Text>
          <Text className="text-lg font-bold text-[#305495] mb-1">Student: {student.student_name}</Text>
          <Text className="text-sm text-gray-700">Class: {student.class_Name}</Text>
          <Text className="text-sm text-gray-700">Division: {student.division}</Text>
           <Text className="text-sm text-gray-700">Parents Name: {student.parents_name}</Text>
          <Text className="text-sm text-gray-700">Phone: {student.phone_number}</Text>
          <Text className="text-sm text-gray-700 mb-3">Address: {student.address}</Text>
        </View>
      ))}

      {/* Pagination controls */}
      <View className="flex-row items-center justify-center mt-4 space-x-2 mb-8">
        <TouchableOpacity
          onPress={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded  ${
            currentPage === 1 ? 'bg-gray-300' : 'bg-gray-200'
          }`}
        >
          <Text className="text-sm">Previous</Text>
        </TouchableOpacity>

        {[...Array(totalPages)].map((_, i) => (
          <TouchableOpacity
            key={i + 1}
            onPress={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? 'bg-blue-700'
                : 'bg-gray-200'
            }`}
          >
            <Text className={currentPage === i + 1 ? 'text-white' : 'text-black'}>
              {i + 1}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-200'
          }`}
        >
          <Text className="text-sm">Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StudentList;