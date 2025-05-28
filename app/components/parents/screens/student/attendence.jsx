import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "@env";
import { ScrollView } from "react-native";

const attendence = ({studentId, students }) => {

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAttendance = async () => {
    try {
      const token = SecureStore.getItemAsync("token");
  
      if (!token) {
        toast.error("Authorization token not found. Please log in again.");
        return;
      }
  
      if (!studentId) {
        toast.error("Student ID is missing.");
        return;
      }
      
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/attendance/get-student-attendance/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.attendance);
      
      if (response.data.success) {
        setAttendance(response.data.attendance || []);
      } else {
        Alert.alert("Error",response.data.message || "Failed to fetch attendance.");
      }
    } catch (error) {
      console.error("Attendance fetch error:", error);
      Alert.alert("Error",error.response?.data?.message || "Something went wrong while fetching attendance.");
    }finally {
      setLoading(false);
    }
  };


  const selectedStudent = students.find(
    (student) => student.id.toString() === studentId?.toString()
  );

  useEffect(() => {
    if (studentId) {
      getAttendance();
    } 
  }, [studentId]);

  return (
    <View>
      <SafeAreaView>
      <View className='items-center gap-8'>
        <Text className="text-[#305495] text-2xl text-center font-bold text-shadow">
          Student Attendance
        </Text>
        
        <View className='w-[90vw] h-[10vh] bg-gray-300 rounded-xl p-6 flex-row gap-6'>
            <FontAwesome5 name="user-graduate" size={24} color="#305495" className='my-4'/>
         <View>
           <Text className='text-gray-700 text-xl'>Student Name</Text>
          <Text className='text-2xl font-bold'>{selectedStudent ? selectedStudent.student_name : "No Student Selected."}</Text>
         </View>
       
        </View>

        <View className='w-[90vw] h-[10vh] bg-gray-300 rounded-xl p-6 flex-row gap-6'>
            <FontAwesome5 name="chalkboard-teacher" size={24} color="#305495" className='my-4'/>
         <View>
           <Text className='text-gray-700 text-xl'>Class </Text>
          <Text className='text-2xl font-bold'>{selectedStudent ? selectedStudent.class_name : "No Student Selected."}</Text>
         </View>
       
        </View>

        <View className='w-[90vw] h-[10vh] bg-gray-300 rounded-xl p-6 flex-row gap-6'>
            <Ionicons name="layers-sharp" size={24} color="#305495" className='my-4'/>
         <View>
           <Text className='text-gray-700 text-xl'>Division</Text>
          <Text className='text-2xl font-bold'>{selectedStudent ? selectedStudent.division : "No Student Selected"}</Text>
         </View>
       
        </View>


        <ScrollView className="w-full mt-4 mb-16">
  {attendance.length === 0 ? (
    <Text className="text-gray-500 text-center mt-4">No attendance records found.</Text>
  ) : (
    attendance.map((record, index) => {
      const dateObj = new Date(record.attendance_date);
      const formattedDate = dateObj.toLocaleDateString("en-GB"); // DD/MM/YYYY
      const dayOfWeek = dateObj.toLocaleDateString("en-GB", { weekday: "long" });

      return (
        <View
          key={index}
          className="bg-white rounded-xl shadow-md p-4 space-y-3 w-[80vw] mb-4 mx-auto"
        >
          <View className="flex-row justify-between">
            <Text className="text-gray-500 font-medium">Name</Text>
            <Text className="font-semibold text-gray-800">
              {record.student_name}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500 font-medium">Date</Text>
            <Text className="font-semibold text-gray-800">
              {formattedDate}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500 font-medium">Day</Text>
            <Text className="font-semibold text-gray-800">
              {dayOfWeek}
            </Text>
          </View>

          <View className="w-full mt-2 ">
            
            <Text
              className={`font-semibold p-2 text-center rounded-md ${
                record.status === "Present" ? "bg-green-400" : "bg-red-400"
              }`}
            >
              {record.status}
            </Text>
          </View>
        </View>
      );
    })
  )}
</ScrollView>

        


      </View>
      </SafeAreaView>
  
    </View>
  )
}

export default attendence