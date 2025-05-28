import { View, Text, Image, FlatList, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {API_URL} from '@env'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import defaultProfile from "../../../../../assets/images/profile.jpg"

const studentprofile = ({studentId}) => {

  const user = useSelector((state) => state.auth.user)

  const [student, setStudent] = useState([]);
  console.log(studentId);
  

  const getStudentData = async()=>{
    try {
      const token =await SecureStore.getItemAsync("token");
      const response = await axios.get(`${API_URL}/student/profile/${studentId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log(response)

      if(response.data && response.data.user){
        setStudent(response.data.user);
      }else{
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.response?.data?.message || " Something went wrong!");
    }
  }

  useEffect(()=>{
    getStudentData()
  },[])

  
 

console.log("hello",student)
  const data = [
    {
      label: "Student Roll No",
      value: student ? student.roll_number: "loading"
    },
    {
      label: "Student Name",
      value: student ? student.student_name : "loading"
    },
    {
      label: "Contact No.",
      value: student ? student.phone_number : "loading"
    },
    {
      label: "GR No",
      value: student ? student.admission_id : "loading"
    },
    {
      label: "Email ID",
      value: student ? student.email :"loading"
    },
    {
      label: "Date Of Birth",
      value: student ? student.date_of_birth : "loading"
    },
    {
      label: "Leaving Certificate",
      value: "Data"
    }, 
    {
      label: "Aadhar Card Number",
      value: student ? student.aadhaar_number :"loading"
    }, 
    {
      label: "Admission Date",
      value: student ? student.admission_date :"loading"
    },
    {
      label: "Current Class",
      value: student ? student.class_name : "loading"
    },
    {
      label: "Sub Class",
      value: student ? student.subclass_id : "loading"
    },
    {
      label: "Status",
      value: student ? student.status : "loading"
    },
    {
      label: "Address",
      value: student ? student.address : "loading"
    }, 
    
  ]

  // console.log(data);

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      ListHeaderComponent={
        <View className='p-2'>
          <View className='items-center m-2'>
            <Text className="text-2xl font-bold text-[#305495]">Student Profile</Text>
          </View>

          <View className='items-center gap-2 mb-4'>
            <Text className='font-bold'>Profile Picture</Text>
            <Image
              className='rounded-full h-[200px] w-[200px]'
              source={require("../../../../../assets/images/profile.jpg")}
            />
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <View className='gap-2' style={{ flex: 1, margin: 8 }}>
          <Text className='text-center text-gray-500'>{item.label}</Text>
          <Text className='text-center font-bold'>{item.value}</Text>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }} // for spacing at the bottom
      showsVerticalScrollIndicator={false}
    />
    
  )
}

export default studentprofile;