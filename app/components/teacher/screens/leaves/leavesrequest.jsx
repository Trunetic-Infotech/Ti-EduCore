import { API_URL } from '@env';
import { Feather } from '@expo/vector-icons';
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const leavesrequest = () => {
  // const [date, setDate] = useState(new Date());
  // const [showPicker, setShowPicker] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null)
  const user = useSelector((state) => state.auth.user);

  const [reason, setReason] = useState("");

  const [taken_leaves, setTaken_Leaves] = useState("");
  const requestLeave = async () => {


    const days = Number(taken_leaves);
    if (!selectedLeave || !taken_leaves || !reason.trim()) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }
    if (isNaN(days) || days <= 0) {
      Alert.alert('Invalid Input', 'Number of days must be a positive number.');
      return;
    }
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.post(
        `${API_URL}/leave/request/add-leave`,
        {
          teacher_id: user.id,
          leave_type: selectedLeave,
          taken_leaves: Number(taken_leaves),
          reason,
          admin_id: user.admin_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.data.success) {
        Alert.alert("Success", response.data.message);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong!");
    }
  };




  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }



  };
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-white border-2 border-[#305495] rounded-2xl p-5 space-y-5 shadow-md">
        <Text className="text-center text-2xl font-bold text-[#305495]">
          Request a Leave
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="font-semibold text-gray-700 mb-1">Teacher Id</Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter  Teacher ID"
              value={user.id.toString()}
              editable={false}
            />
          </View>

          <View>
            <Text className="font-semibold text-gray-700 mb-1">Teacher Name</Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Name"
              value={user.teacher_Name}
              editable={false}
            />
          </View>

          <View>
            <Text className="font-semibold text-gray-700 mb-1">Leave Type</Text>
            <View className="border border-[#305495] rounded-lg p-3 bg-white">
              <TouchableOpacity
                onPress={() => setIsOpen(!isOpen)}
                className="flex-row items-center justify-between border border-gray-300 rounded px-3 py-2"
                activeOpacity={1}

              >
                <Text>{selectedLeave ? selectedLeave : "select a type"}


                </Text>
                <Feather name="chevron-down" size={20} color="#6B7280" />
              </TouchableOpacity>

            </View>
            {isOpen && (
              <View className="mt-2 border border-[#305495] rounded-lg bg-white">
                {["Personal Reason", "Village Leave", "Medical Leave", "Emergency"].map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      setSelectedLeave(item);
                      setIsOpen(false);
                    }}
                    className="p-2 border-b border-gray-200"
                  >
                    <Text className="text-gray-800">{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}


          </View>

          <View>
            <Text className="font-semibold text-gray-700 mb-1">Number of Days</Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter number of days"
              keyboardType="numeric"
              value={taken_leaves}
              onChangeText={setTaken_Leaves}
            />
          </View>



          <View>
            <Text className="font-semibold text-gray-700 mb-1">
              Reason
            </Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Description"
              multiline
              numberOfLines={4}
              style={{ minHeight: 100, textAlignVertical: "top" }}
              value={reason}
              onChangeText={setReason}
            />
          </View>
        </View>

        <TouchableOpacity onPress={requestLeave} className="bg-[#305495] rounded-xl py-3 mt-3 items-center">
          <Text className="text-white font-bold text-lg">Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default leavesrequest