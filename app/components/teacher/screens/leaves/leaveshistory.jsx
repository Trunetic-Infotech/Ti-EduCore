import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo, Feather } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL } from '@env';


const leaveshistory = () => {

    const [allLeaves, setAllLeaves] = useState([]);

  const user = useSelector((state) => state.auth.user)

  const getAllLeaves = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(`${API_URL}/leave/request/get/single/leave/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log(response)
      if (response.data && response.data.data) {
        Alert.alert("Success",response.data.message)
        setAllLeaves(response.data.data)
      } else {
        Alert.alert("Error",response.data.message)
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error",error.response?.data?.message || "Something went wrong!");
    }
  }

  const deleteLeaveRequest = async (id) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.delete(`${API_URL}/leave/request/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data.success) {
        Alert.alert("Success",response.data.message)
        getAllLeaves()
      } else {
        Alert.alert("Error",response.data.message)
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error",error.response?.data?.message || "Something went wrong!");
    }
  }

  useEffect(() => {
    getAllLeaves();
  }, [])

  const leaves = [
    { id: '1', leavetypee: 'Pooja', reason: 'Personal reason', leavetaken: '4', appliedon: '25/02/25', time: '2025-04-25T18' },
    { id: '1', leavetypee: 'Pooja', reason: 'Personal reason', leavetaken: '4', appliedon: '25/02/25', time: '2025-04-25T18' },
    { id: '1', leavetypee: 'Pooja', reason: 'Personal reason', leavetaken: '4', appliedon: '25/02/25', time: '2025-04-25T18' },
    { id: '1', leavetypee: 'Pooja', reason: 'Personal reason', leavetaken: '4', appliedon: '25/02/25', time: '2025-04-25T18' },
    { id: '1', leavetypee: 'Pooja', reason: 'Personal reason', leavetaken: '4', appliedon: '25/02/25', time: '2025-04-25T18' },
    { id: '1', leavetypee: 'Pooja', reason: 'Personal reason', leavetaken: '4', appliedon: '25/02/25', time: '2025-04-25T18' },
  ];
  return (
    <ScrollView className="flex-1 bg-gray-100 p-4" nestedScrollEnabled={true}>

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
      {allLeaves.map((request, index) => (
        <View
          key={index}
          className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-200"
        >
          {/* Card */}
          <View className="bg-white rounded-xl shadow-md p-4 space-y-3">

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">ID</Text>
              <Text className="font-semibold text-gray-800">{request.teacher_id}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Leave Type</Text>
              <Text className="font-semibold text-gray-800">{request.leave_type}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Reason</Text>
              <Text className="font-semibold text-gray-800">{request.reason}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Leaves Taken</Text>
              <Text className="font-semibold text-yellow-600">{request.taken_leaves}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Applied On</Text>
              <Text className="font-semibold text-yellow-600">{request.applied_on},{request.time}</Text>
            </View>

            <TouchableOpacity className="mt-4 bg-[#f1a621] rounded-xl py-2 px-4 items-center">
              <Text className="text-white font-bold">Status</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}


    </ScrollView>
  )
}

export default leaveshistory