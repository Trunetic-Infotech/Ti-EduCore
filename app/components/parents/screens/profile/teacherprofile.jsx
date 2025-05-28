import { View, Text, Image, FlatList, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import {API_URL} from '@env'

const teacherprofile = ({teacher_id}) => {

  const [teacher, setTeacher] = useState("");


  const user = useSelector ((state) => state.auth.user)

  console.log(teacher_id)

    const getTeacher = async()=>{
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(`${API_URL}/parents/get-teacher/${teacher_id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log(response.data.profile);

      if(response.data && response.data.profile){
        setTeacher(response.data.profile);
      }else{
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.response?.data?.message || " Something went wrong!");
    }
  }

  useEffect(()=>{
    getTeacher();
  },[])

  const data = [
   
    {
      label: "Teacher Name",
      value: teacher ? teacher.teacher_Name : "loading"
    },
    {
      label: "Contact No.",
      value: teacher ? teacher.phone_number : "loading"
    },
  
    {
      label: "Date Of Join",
      value: teacher ? teacher.date_of_join : "loading"
    },
    {
      label: "Experiance",
      value: teacher ? teacher.experience : "loading"
    }, 
   
  
    {
      label: "Current Class",
      value: teacher ? teacher.class_name : "loading"
    },
    {
      label: "Division",
      value: teacher ? teacher.division : "loading"
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
            <Text className="text-2xl font-bold text-[#305495]">Teacher Profile</Text>
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
        <View className='gap-1' style={{ flex: 1, margin: 8 }}>
          <Text className='text-center text-gray-500'>{item.label}</Text>
          <Text className='text-center font-bold'>{item.value}</Text>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }} // for spacing at the bottom
      showsVerticalScrollIndicator={false}
    />
    
  )
}



export default teacherprofile