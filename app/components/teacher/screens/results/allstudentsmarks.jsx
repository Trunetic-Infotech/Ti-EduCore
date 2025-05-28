import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store'
import { API_URL } from '@env';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ViewResults from './../../../students/screens/results/ViewResults';
const allstudentsmarks = ({setSelectedComponent}) => {

 const user = useSelector((state)=>state.auth.user);
  const [allprogress, setAllProgress] = useState([]);
  const getExamResults = async()=>{
    try {
      const token = await SecureStore.getItem("token");

      const response = await axios.get(`${API_URL}/students/progress/all/subclass/progress/${user.id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // console.log(response)
      if(response.data && response.data.data){  // Use response.data.data
        setAllProgress(response.data.data);
      } else {
        Alert.alert(response.data.message);
      }
      
     
    } catch (error) {
      console.log(error);
            Alert.alert(error.response?.data?.message || "Something went wrong!");
    }
  }

  useEffect(()=>{
    getExamResults()
  },[])

  return (
    <ScrollView className="flex-1 bg-gray-100">

    <View className="p-4 bg-gray-100 min-h-full">
      {/* Search Input */}
      <View className="items-center justify-center relative mb-4">
        <TextInput
          className="p-2 pl-10 border border-[#305495] rounded-xl w-[75%] bg-white"
          placeholder="Search...."
        />
        <Feather
          name="search"
          size={20}
          color="gray"
          style={{ position: 'absolute', left: '14%', zIndex: 1 }}
        />
      </View>

      {/* Card */}
      <View className="bg-white rounded-xl shadow-md p-4 space-y-3">
       {allprogress.map((progress, index) => {
  return (
    <View key={index} className="mb-6 border-b border-gray-200 pb-4">
      <View className="flex-row justify-between">
        <Text className="text-gray-500 font-medium">Roll No</Text>
        <Text className="font-semibold text-gray-800">{progress.roll_number}</Text>
      </View>

      <View className="flex-row justify-between">
        <Text className="text-gray-500 font-medium">Student Name</Text>
        <Text className="font-semibold text-gray-800">{progress.student_name}</Text>
      </View>

      <View className="flex-row justify-between">
        <Text className="text-gray-500 font-medium">Marks Obtained</Text>
        <Text className="font-semibold text-gray-800">{Math.round(progress.marks_obtained)}</Text>
      </View>

      <View className="flex-row justify-between">
        <Text className="text-gray-500 font-medium">Total Marks</Text>
        <Text className="font-semibold text-gray-800">{Math.round(progress.total_marks)}</Text>
      </View>

      <View className="flex-row justify-between">
        <Text className="text-gray-500 font-medium">Percentage</Text>
        <Text className="font-semibold text-gray-800">{progress.percentage + "%"}</Text>
      </View>

      <View className="flex-row justify-between">
        <Text className="text-gray-500 font-medium">Grade</Text>
        <Text className="font-semibold text-red-500">{progress.grade}</Text>
      </View>

      <View className="flex-row justify-between">
        <Text className="text-gray-500 font-medium">Remarks</Text>
        <Text className="font-semibold text-yellow-600">{progress.remarks}</Text>
      </View>

      <TouchableOpacity className="mt-4 bg-[#f1a621] rounded-xl py-2 px-4 items-center" onPress={() => {setSelectedComponent(<ViewResults  progressId={progress.id}/>);}}>
        <Text className="text-white font-bold">View Result</Text>
      </TouchableOpacity>
    </View>
  );
})}

      </View>
    </View>
</ScrollView>
  )
}


export default allstudentsmarks