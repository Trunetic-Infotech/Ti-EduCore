import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

const HomeWorks = () => {
  const [pending_homeworks, setPending_Homeworks] = useState([
    {
      subject: "Mathematics",
      teacher_Name: "Mr. Sharma",
      description: "Complete exercise 5.1 and 5.2",
      status: "pending",
      submission_date: "2025-05-25T00:00:00Z",
    },
    {
      subject: "Science",
      teacher_Name: "Mrs. Kapoor",
      description: "Prepare notes on Chapter 4",
      status: "pending",
      submission_date: "2025-05-26T00:00:00Z",
    },
  ]);

  const [selectedHomework, setSelectedHomework] = useState(null);

  return (
    <ScrollView className="p-4 ">
      {pending_homeworks && pending_homeworks.length > 0 ? (
        pending_homeworks.map((pHW, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedHomework(pHW);
              console.log(pHW);
            }}
            className="bg-white border border-[#305495] rounded-xl p-4 mb-4 shadow"
          >
            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold text-gray-700">Subject:</Text>
              <Text className="text-gray-600">{pHW.subject}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold text-gray-700">Teacher:</Text>
              <Text className="text-gray-600">{pHW.teacher_Name}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold text-gray-700">Description:</Text>
              <Text className="text-gray-600">{pHW.description}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold text-gray-700">Status:</Text>
              <Text className="text-red-600 font-bold">
                {pHW.status === "pending" ? "Pending" : ""}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="font-semibold text-gray-700">Last Date:</Text>
              <Text className="text-gray-600">
                {new Date(pHW.submission_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text className="text-center text-gray-400 italic">
          No Homework Available
        </Text>
      )}
    </ScrollView>
  );
};

export default HomeWorks;
