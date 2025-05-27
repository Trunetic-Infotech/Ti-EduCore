import { Text, View, ScrollView, Alert } from 'react-native'
import { useSelector } from 'react-redux'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL } from '@env';
import { useEffect, useState } from 'react';

const ViewAnswers = () => {
  const data = [
    {
      question: "Question1",
      answer: "Answer1",
      answered_by: "Pooja",
    },
    {
      question: "Question2",
      answer: "Answer2",
      answered_by: "Pooja",
    },
    {
      question: "Question3",
      answer: "Answer3",
      answered_by: "Pooja",
    },
    {
      question: "Question4",
      answer: "Answer4",
      answered_by: "Pooja",
    },
    {
      question: "Question5",
      answer: "Answer5",
      answered_by: "Pooja",
    }
  ]

  const [questions, setQuestions] = useState([]);
  const user = useSelector((state)=> state.auth.user);

  const getAllQuestions = async()=>{
    try {
      const token = await SecureStore.getItemAsync('token');

      const response = await axios.get(`${API_URL}/students/askquestions/get-ask-questions/students/${user.id}`, {
        headers: {
          Authorization:  `Bearer ${token}`,
        }
      })
      // console.log(response);
      if(response.data && response.data.data){
        setQuestions(response.data.data);
      }else{
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Internal Server Error");
    }
  }

  useEffect(()=>{
    getAllQuestions()
  },[])

  return (
   <ScrollView className="flex-1 bg-gray-100">
  <View className="items-center p-4">
    <Text className="text-2xl font-bold text-[#305495] mb-4">View Answers</Text>

    {Array.isArray(questions) && questions.length > 0 ? (
      questions.map((item, index) => (
        <View
          key={index}
          className="bg-white rounded-xl shadow-md p-4 mb-4 w-full"
        >
          <Text className="text-sm text-gray-500 mb-2">Question:</Text>
          <Text className="text-base font-medium text-gray-800 mb-2">{item.question_text}</Text>

          <Text className="text-sm text-gray-500 mb-2">Answer:</Text>
          <Text className="text-base text-gray-800 mb-2">
            {item.answer_text || "Not answered yet"}
          </Text>

          <Text className="text-sm text-gray-500 mb-1">Answered By:</Text>
          <Text className="text-base text-gray-800">
            {item.answer_text ? item.teacher_Name : "-"}
          </Text>
        </View>
      ))
    ) : (
      <Text className="text-center text-gray-500 mt-4">No questions available</Text>
    )}
  </View>
</ScrollView>

  )
}

export default ViewAnswers