import { Alert, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "@env";
import { useEffect, useState } from 'react';
import ViewResults from './ViewResults';

const CurrentYearResults = ({ setSelectedComponent }) => {
  const user = useSelector((state) => state.auth.user);
  const [allprogress, setAllProgress] = useState([]);
  const [progressId, setProgressId] = useState('');

  const getSingleStudentAllExamResults = async () => {
    try {
      const token = await SecureStore.getItemAsync("token"); // await here

      const response = await axios.get(`${API_URL}/students/progress/single-student/all/progress/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      
      if (response.data && response.data.data) {
        setAllProgress(response.data.data);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    getSingleStudentAllExamResults();
  }, []);

  return (
    <ScrollView className="p-4 bg-gray-100 min-h-full">
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

      {/* Dynamic Cards */}
      {allprogress.map((item, index) => (
        <View key={item.id || index} className="bg-white rounded-xl shadow-md p-4 space-y-3 mb-4">
          <View className='flex-row justify-center gap-3'>
            <Text className="text-gray-500 font-medium">Exam:</Text>
            <Text className="font-bold text-gray-800">{item.exam_name}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500 font-medium">Roll No</Text>
            <Text className="font-semibold text-gray-800">{item.roll_number}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500 font-medium">Student Name</Text>
            <Text className="font-semibold text-gray-800">{item.student_name}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500 font-medium">Marks Obtained</Text>
            <Text className="font-semibold text-gray-800">{item.marks_obtained}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500 font-medium">Total Marks</Text>
            <Text className="font-semibold text-gray-800">{item.total_marks}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500 font-medium">Percentage</Text>
            <Text className="font-semibold text-gray-800">{item.percentage}%</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500 font-medium">Grade</Text>
            <Text className={`font-semibold ${item.grade === 'F' ? 'text-red-500' : 'text-green-600'}`}>
              {item.grade}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500 font-medium">Remarks</Text>
            <Text className="font-semibold text-yellow-600">{item.remarks}</Text>
          </View>

          <TouchableOpacity onPress={()=>{
            
            setSelectedComponent({
                subitem: {
                  component: (
                    <ViewResults
                    progressId={item.id}
                    />
                  ),
                },
              });
          }} className="mt-4 bg-[#f1a621] rounded-xl py-2 px-4 items-center">
            <Text className="text-white font-bold">View Result</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default CurrentYearResults;
