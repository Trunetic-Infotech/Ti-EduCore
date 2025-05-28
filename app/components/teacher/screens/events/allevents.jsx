import { API_URL } from '@env';
import { Entypo, Feather } from '@expo/vector-icons';
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const allevents = () => {
  const [allEvents, setAllEvents] = useState([]);

  const user = useSelector((state) => state.auth.user);
  // console.log(user.admin_id)
  const getEvents = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");

      const response = await axios.get(`${API_URL}/events/get/list/${user.admin_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.data && response.data.events) {
        setAllEvents(response.data.events);
      } else {
        Alert.alert("Error",response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error",error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    getEvents()
  }, [])

  
useEffect(() => {
  console.log("Fetched Events: ", allEvents);
}, [allEvents]);

  const events = [
    { id: '1', name: 'Pooja', date: '25/02/25', starttime: '2025-04-25T18:30:00.000Z', description: 'Hello Everyone' },
    { id: '1', name: 'Pooja', date: '25/02/25', starttime: '2025-04-25T18:30:00.000Z', description: 'Hello Everyone' },
    { id: '1', name: 'Pooja', date: '25/02/25', starttime: '2025-04-25T18:30:00.000Z', description: 'Hello Everyone' },
    { id: '1', name: 'Pooja', date: '25/02/25', starttime: '2025-04-25T18:30:00.000Z', description: 'Hello Everyone' },
    { id: '1', name: 'Pooja', date: '25/02/25', starttime: '2025-04-25T18:30:00.000Z', description: 'Hello Everyone' },
    { id: '1', name: 'Pooja', date: '25/02/25', starttime: '2025-04-25T18:30:00.000Z', description: 'Hello Everyone' },
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
      {allEvents.map((item,index) => (
        <View
          key={index}
          className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-200"
        >
          {/* Card */}


          <View className="flex-row justify-between">
            <Text className="text-gray-500 font-medium">Event Name</Text>
            <Text className="font-semibold text-gray-800">{item.events_name}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500 font-medium">Event Date</Text>
            <Text className="font-semibold text-gray-800">{item.events_date}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500 font-medium">Event Start Time</Text>
            <Text className="font-semibold text-gray-800">{item.start_time}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500 font-medium">Event Description</Text>
            <Text className="font-semibold text-yellow-600">{item.description}</Text>
          </View>
          <TouchableOpacity className="mt-4 bg-[#f1a621] rounded-xl gap-2 py-2 px-4 items-center flex-row justify-center space-x-2">
            <Text className="text-white font-bold">View Event Image </Text>
            <Entypo name="eye" size={24} color="white" />
          </TouchableOpacity>
        </View>

      ))}


    </ScrollView>
  )
}

export default allevents