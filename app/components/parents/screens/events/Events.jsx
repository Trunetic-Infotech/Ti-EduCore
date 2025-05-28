import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Linking, Alert } from "react-native";
import { useSelector } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL } from '@env';



const Events = () => {
   const [allEvents, setAllEvents] = useState([]);
   const user = useSelector((state)=> state.auth.user);


  const [searchTerm, setSearchTerm] = useState("");

  
  const filteredEvents = allEvents.filter(event =>
    event.events_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  
  useEffect(()=>{
    getEvents()
  },[])
  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Search bar */}
      <View className="flex-row items-center mb-6 space-x-3">
        <TextInput
          className="flex-1 border-2 border-[#305495] rounded-xl p-3 text-[#305495]"
          placeholder="Search an Event"
          placeholderTextColor="#305495"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Text className="text-gray-500 text-2xl">🔍</Text>
      </View>

      {/* Event cards */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredEvents.length === 0 ? (
          <Text className="text-center text-gray-500 italic">No events found.</Text>
        ) : (
          filteredEvents.map((event, index) => (
            <View
              key={index}
              className={`rounded-xl p-6 mb-6 ${index % 2 === 0 ? "bg-blue-100" : "bg-orange-200"
                }`}
            >
              <Text className="text-xl font-semibold text-[#305495] mb-2">
                {event.events_name}
              </Text>
             <Text className="text-sm mb-1">
  <Text className="font-medium text-[#305495]">Date: </Text>
  {new Date(event.events_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</Text>

<Text className="text-sm mb-1">
  <Text className="font-medium text-[#305495]">Star t Time: </Text>
  {new Date(`1970-01-01T${event.start_time}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })}
</Text>

              <Text className="text-sm mb-3">
                <Text className="font-medium text-[#305495]">Description: </Text>
                {event.description}
              </Text>

              <TouchableOpacity
                onPress={() => Linking.openURL(event.images)}
                className="flex-row items-center space-x-1"
              >
                <Text className="text-[#305495] text-base underline">👁 View</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

export default Events