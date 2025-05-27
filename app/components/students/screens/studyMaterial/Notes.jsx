import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import SubjectNotes from "./SubjectNotes";
import { ScrollView } from "react-native";

const Notes = ({
  setSelectedComponent,
  subjects,
  setSubject_id,
  setSubject_name,
}) => {
  // console.log("All Subjects",subjects);

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
                    <SubjectNotes
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
  );
};

export default Notes;
