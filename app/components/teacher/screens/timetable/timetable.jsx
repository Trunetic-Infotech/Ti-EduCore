import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

// Dummy reusable card component
const CardCoponets = ({ name, data, className }) => (
  <View
    className={`bg-white p-4 rounded-lg shadow-md ${className}`}
    style={{ marginBottom: 8 }}
  >
    {data && <Text className="text-gray-500 text-sm mb-1">{data}</Text>}
    <Text className="text-lg font-semibold text-gray-800">{name}</Text>
  </View>
);

const Timetable = () => {
  const [loading, setLoading] = useState(true);
  const [timeTable, setTimeTable] = useState([]);

  // Dummy user data
  const user = {
    student_name: "John Doe",
    class_name: "10th Grade",
    division: "A",
  };

  // Dummy timetable data
  const dummyData = [
    {
      id: "1",
      day_of_week: "Monday",
      start_time: "09:00",
      end_time: "10:00",
      subject_name: "Math",
      teacher_Name: "Mr. Smith",
    },
    {
      id: "2",
      day_of_week: "Monday",
      start_time: "10:00",
      end_time: "11:00",
      subject_name: "English",
      teacher_Name: "Ms. Johnson",
    },
    {
      id: "3",
      day_of_week: "Tuesday",
      start_time: "09:00",
      end_time: "10:00",
      subject_name: "Science",
      teacher_Name: "Mr. Lee",
    },
    {
      id: "4",
      day_of_week: "Wednesday",
      start_time: "11:00",
      end_time: "12:00",
      subject_name: "History",
      teacher_Name: "Mrs. Davis",
    },
  ];

  const groupByDay = (data) => {
    return data.reduce((acc, curr) => {
      if (!acc[curr.day_of_week]) acc[curr.day_of_week] = [];
      acc[curr.day_of_week].push(curr);
      return acc;
    }, {});
  };

  const grouped = groupByDay(timeTable);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setTimeTable(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

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
        <CardCoponets name={user.student_name} />

        <View className="flex-row w-full justify-between">
          <CardCoponets name={user.class_name} data="Class" className="w-[48%]" />
          <CardCoponets name={user.division} data="Division" className="w-[48%]" />
        </View>

        {Object.entries(grouped).map(([day, slots]) => (
          <View key={day} className="mb-6">
            <Text className="text-xl font-bold mb-2 text-blue-800">📅 {day}</Text>
            {slots
              .sort((a, b) => a.start_time.localeCompare(b.start_time))
              .map((slot) => (
                <View
                  key={slot.id}
                  className="bg-white p-3 mb-2 rounded-lg shadow"
                >
                  <Text className="text-base text-gray-800">
                    {slot.start_time} - {slot.end_time} |{" "}
                    {slot.subject_name} - {slot.teacher_Name}
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
