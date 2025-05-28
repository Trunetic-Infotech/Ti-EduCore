import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

// Timetable Component
const Timetable = ({ timeTable }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Group by day_of_week
  const groupByDay = (data) => {
    return data.reduce((acc, curr) => {
      if (!acc[curr.day_of_week]) acc[curr.day_of_week] = [];
      acc[curr.day_of_week].push(curr);
      return acc;
    }, {});
  };

  const grouped = groupByDay(timeTable);

  // Define proper weekday order
  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1D4ED8" />
        <Text className="mt-2 text-blue-700">Loading timetable...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="p-2 gap-4">
        {dayOrder
          .filter((day) => grouped[day]) // Only render days that exist in data
          .map((day) => (
            <View key={day} className="mb-6">
              <Text className="text-xl font-bold mb-2 text-blue-800">
                📅 {day}
              </Text>
              {grouped[day]
                .sort((a, b) => a.start_time.localeCompare(b.start_time))
                .map((slot) => (
                  <View
                    key={slot.id}
                    className="bg-white p-3 mb-2 rounded-lg shadow"
                  >
                    <Text className="text-base text-gray-800">
                      {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}{" "}
                      | {slot.subject_name.trim()} - {slot.teacher_Name.trim()}
                    </Text>
                  </View>
                ))}
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

export default Timetable;
