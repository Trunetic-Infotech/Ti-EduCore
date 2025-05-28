import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import StudentSubmissions from "./StudentSubmissions";

const HomeWorks = ({
  homeworkData,
  count,
  setSelectedComponent,
  setHomework_id,
  getHomeworkAndSubmissions,
  homework_id,
  homeworkList,
}) => {
  // const [selectedHomework, setSelectedHomework] = useState(null);

  // useEffect(()=>{
  //   sethomeworkData(homeworkData);
  // },[])

  return (
    <ScrollView className="p-4 ">
      {homeworkData && homeworkData.length > 0 ? (
        homeworkData.map((pHW, index) => (
          <TouchableOpacity
            key={index}
            onPress={async () => {
              const selectedId = pHW.homework_id;
              setHomework_id(selectedId);
              // await getHomeworkAndSubmissions(); 
              const hw = homeworkList.find(
                (hw) => hw.homework_id === selectedId
              );
              if (hw) {
                setSelectedComponent(
                  <StudentSubmissions
                    homeworkList={homeworkList}
                    homework_id={selectedId}
                  />
                );
              }
            }}
            className="bg-white border border-[#305495] rounded-xl p-4 mb-4 shadow"
          >
            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold text-gray-700">Subject:</Text>
              <Text className="text-gray-600">{pHW.subject}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold text-gray-700">Homework:</Text>
              <Text className="text-gray-600">{pHW.description}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold text-gray-700">Submitted:</Text>
              <Text className="text-gray-600">{pHW.submission_count}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold text-gray-700">Remaining:</Text>
              <Text className="text-red-600 font-bold">
                {count - pHW.submission_count}
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
