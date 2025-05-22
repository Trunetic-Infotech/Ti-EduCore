import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

const demoEvents = [
  {
    Students_name: "Science Fair",
    Submit_date: "2025-06-10",
    Students_ID: "1",
    Subject: "Maths",
    Home_description: "Annual science fair showcasing student projects.",
    status: "Pending",
  },
  {
    Students_name: "Sports Day",
    Submit_date: "2025-06-15",
    Students_ID: "2",
    Subject: "Physical Education",
    Home_description: "Outdoor sports competitions and activities.",
    status: "Pending",
  },
  {
    Students_name: "Art Exhibition",
    Submit_date: "2025-06-20",
    Students_ID: "3",
    Subject: "Art",
    Home_description: "Display of student artworks and live art sessions.",
    status: "Completed",
  },
];

const HomeworkProgress = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = demoEvents.filter(event =>
    event.Students_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Search Bar */}
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

      {/* Event Cards */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredEvents.length === 0 ? (
          <Text className="text-center text-gray-500 italic">No events found.</Text>
        ) : (
          filteredEvents.map((event, index) => (
            <View
              key={index}
              className={`rounded-xl p-6 mb-6 ${
                index % 2 === 0 ? "bg-blue-100" : "bg-orange-200"
              }`}
            >
              <Text className="text-xl font-semibold text-[#305495] mb-2">
                Students ID: {event.Students_ID}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Students Name: </Text>
                {event.Students_name}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Subject: </Text>
                {event.Subject}
              </Text>

              <Text className="text-sm mb-1">
                <Text className="font-medium text-[#305495]">Description: </Text>
                {event.Home_description}
              </Text>

              <Text className="text-sm mb-3">
                <Text className="font-medium text-[#305495]">Submit Date: </Text>
                {event.Submit_date}
              </Text>

              <View className="mt-1">
                <Text className="text-base font-bold text-[#305495]">
                  Status:{" "}
                  <Text
                    className={`${
                      event.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {event.status}
                  </Text>
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default HomeworkProgress;
