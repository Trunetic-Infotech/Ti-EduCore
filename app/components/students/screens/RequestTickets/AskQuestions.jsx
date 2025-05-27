import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useSelector } from 'react-redux'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL } from '@env';

const AskQuestions = () => {
  const user = useSelector((state)=> state.auth.user);

  const today = new Date();

  const [question, setQuestion] = useState("");

  const formattedDate = today.toISOString().split('T')[0];

  const askQuestions = async()=>{
    try {
      const token = await SecureStore.getItemAsync("token");

      const response = await axios.post(`${API_URL}/students/askquestions/create-ask-questions`,{
        student_id: user.id,
        question_text: question,
        subclass_id: user.subclass_id,
        admin_id: user.admin_id
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      console.log(response);

      if(response.data.success){
        Alert.alert("Question Submitted", response.data.message);
        setQuestion("");
      }else{
        Alert.alert("Error", response.data.message);
      }
      
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Internal Server Error");
      
    }
  }
 

  return (
    <View className="items-center justify-center  h-full p-3 ">
          <View className="bg-white border-2   border-[#305495] p-4 gap-4">
            <Text className="font-bold text-center text-2xl">Ask Questions</Text>
    
            <View className="flex-row flex-wrap justify-center gap-2 items-center">
              <View className='w-[48%] items-center gap-2'>
                <Text className='font-bold text-gray-600'>Class</Text>
                <TextInput value={user ? user.class_name : "Loading...."} className='border border-[#305495] w-full rounded-md p-4'  ></TextInput>
              </View>
              <View className='w-[48%] items-center gap-2'>
                <Text className='font-bold text-gray-600'>Division</Text>
                <TextInput value={user ? user.division : "Loading..."} className='border border-[#305495] w-full rounded-md p-4' ></TextInput>
              </View>
              <View className='w-[48%] items-center gap-2'>
                <Text className='font-bold text-gray-600'>Contact No</Text>
                <TextInput value={user ? user.phone_number: "Loading..."} className='border border-[#305495] w-full rounded-md p-4' ></TextInput>
              </View>
              <View className='w-[48%] items-center gap-2'>
                <Text className='font-bold text-gray-600'>Date</Text>
                <TextInput value={formattedDate} className='border border-[#305495] w-full rounded-md p-4' ></TextInput>
              </View>
              <View className='w-full items-center'>
                <Text className='font-bold text-gray-600'>Question</Text>
                <TextInput onChangeText={(text)=> setQuestion(text)}  className='border border-[#305495] w-full rounded-md p-4' placeholder='Question'></TextInput>
              </View>
            </View>
    
            <TouchableOpacity onPress={askQuestions} className="items-center bg-[#f1a621] p-3 rounded-xl">
              <Text className="font-bold">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
  )
}

export default AskQuestions