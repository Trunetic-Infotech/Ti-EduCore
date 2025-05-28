import { Alert, Text, TextInput, TouchableOpacity, View , ScrollView} from "react-native";
import * as SecureStore from "expo-secure-store"; // Correct usage
import { Feather } from "@expo/vector-icons";
import { API_URL } from "@env";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ViewResults from "../../../students/screens/results/ViewResults";

// import { getItem } from 'expo-secure-store';

const studentresults = ({setProgressId, setSelectedComponent}) => {
  const [result, setResult] = useState([]);

  const user = useSelector((state) => state.auth.user);

  // console.log(result,"hello");

  const getStudentsResult = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${API_URL}/parents/get-students-result/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data, "hello");
      if (response.data && response.data.data) {
        setResult(response.data.data);
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (user) {
      getStudentsResult();
    }
  }, [user]);

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
          style={{ position: "absolute", left: "14%", zIndex: 1 }}
        />
      </View>

      {/* Card */}
      {result.length > 0 ? (
        result.map((result, index) => (
          <View
            key={index}
            className="bg-white rounded-xl shadow-md p-4 space-y-3 mb-4"
          >
             <View className='flex-row justify-center gap-3'>
            <Text className="text-gray-500 font-medium">Exam:</Text>
            <Text className="font-bold text-gray-800">{result.exam_name}</Text>
          </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Roll No</Text>
              <Text className="font-semibold text-gray-800">
                {result.roll_number}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Student Name</Text>
              <Text className="font-semibold text-gray-800">
                {result.student_name}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Marks Obtained</Text>
              <Text className="font-semibold text-gray-800">
                {result.marks_obtained}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Total Marks</Text>
              <Text className="font-semibold text-gray-800">
                {result.total_marks}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Percentage</Text>
              <Text className="font-semibold text-gray-800">
                {result.percentage}%
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Grade</Text>
              <Text className="font-semibold text-red-500">{result.grade}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Remarks</Text>
              <Text className="font-semibold text-yellow-600">
                {result.remarks}
              </Text>
            </View>

            <TouchableOpacity className="mt-4 bg-[#f1a621] rounded-xl py-2 px-4 items-center">
              <Text
                onPress={() => {
                  setProgressId(result.id);
                  setSelectedComponent(<ViewResults progressId={result.id}/>);
                }}
                className="text-white font-bold"
              >
                View Result
              </Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text className="text-center text-gray-500">
          Loading or No results found
        </Text>
      )}
    </ScrollView>
  );
};

export default studentresults;
