import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import ViewVideoLectures from './ViewVideoLectures';

const VideoLectures = ({
  setSelectedComponent,
  subjects,
  setSubject_id,
  setSubject_name,
}) => {
  return (
    <ScrollView>
    <View className="p-2 gap-4">
      <Text className="text-center font-bold text-3xl text-[#305495]">
        Subjects
      </Text>
      {subjects.map((subject, index) => (
        <TouchableOpacity
          onPress={() => {
            setSubject_id(subject.id);
            setSubject_name(subject.subject_name);
            // console.log("Heee",subject.id);
            
            setSelectedComponent({
              subitem: {
                component: (
                  <ViewVideoLectures
                    subject_id={subject.id}
                    subject_name={subject.subject_name}
                  />
                ),
              },
            });
          }}
          key={index}
          className="p-2 py-4 border border-[#305495] flex-row items-center justify-center gap-4"
        >
          <Text className="text-center font-bold text-2xl">
            {subject.subject_name}
          </Text>
          <Feather name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      ))}
    </View>
    </ScrollView>
  )
}

export default VideoLectures