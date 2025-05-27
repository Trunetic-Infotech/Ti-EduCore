import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Linking } from "react-native";

const demoEvents = [
  {
    events_name: "Science Fair",
    events_date: "2025-06-10",
    start_time: "10:00 AM",
    images: "https://example.com/image1.jpg",
    description: "Annual science fair showcasing student projects.",
  },
  {
    events_name: "Sports Day",
    events_date: "2025-06-15",
    start_time: "09:00 AM",
    images: "https://example.com/image2.jpg",
    description: "Outdoor sports competitions and activities.",
  },
  {
    events_name: "Art Exhibition",
    events_date: "2025-06-20",
    start_time: "11:00 AM",
    images: "https://example.com/image3.jpg",
    description: "Display of student artworks and live art sessions.",
  },
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = demoEvents.filter(event =>
    event.events_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
                {event.events_date}
              </Text>
              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Start Time: </Text>
                {event.start_time}
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