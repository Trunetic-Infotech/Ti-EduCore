import React from "react";
import { View, Text, ScrollView } from "react-native";

const demoClassTimeTable = [
  {
    exam_name: "Mid Term Exam",
    exam_schedule: `Math | 2025-06-01 | 9:00 AM - 12:00 PM\nScience | 2025-06-03 | 10:00 AM - 1:00 PM\nEnglish | 2025-06-05 | 11:00 AM - 2:00 PM`,
  },
];

const demoWholeExamTT = [
  {
    exam_name: "Annual Exam",
    exam_schedule: `History | 2025-07-01 | 9:00 AM - 12:00 PM\nGeography | 2025-07-03 | 10:00 AM - 1:00 PM`,
  },
];

const TimeTable = () => {
  const renderCard = (data) => {
    if (data.length === 0) return null;

    return data.map((exam, index) => (
      <View
        key={index}
        className="bg-white rounded-2xl shadow-md mx-4 mb-6 border border-gray-200"
      >
        {/* Card Header */}
        <View className="bg-blue-600 rounded-t-2xl px-4 py-3">
          <Text className="text-white text-lg font-bold tracking-wide uppercase">
            {exam.exam_name}
          </Text>
        </View>

        {/* Schedule Body */}
        <View className="px-4 py-3 bg-white">
          {exam.exam_schedule.split("\n").map((schedule, i) => {
            const [subject, date, time] = schedule.split(" | ");
            return (
              <View
                key={`${index}-${i}`}
                className="mb-3 p-3 rounded-xl bg-gray-100"
              >
                <Text className="text-gray-800 font-semibold text-base">
                  {subject}
                </Text>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-gray-600 text-sm">{date}</Text>
                  <Text className="text-gray-600 text-sm">{time}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    ));
  };

  return (
    <ScrollView className="bg-gray-100 flex-1 pt-6">
      {demoClassTimeTable.length === 0 && demoWholeExamTT.length === 0 ? (
        <Text className="text-center text-gray-500 italic mt-10">
          No Exam Timetable Available
        </Text>
      ) : (
        <>
          {renderCard(demoClassTimeTable)}
          {renderCard(demoWholeExamTT)}
        </>
      )}
    </ScrollView>
  );
};

export default TimeTable;
