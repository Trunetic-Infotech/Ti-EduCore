import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

const timetable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <View>
      <View>
        <Text className="font-bold text-xl">Select Student:</Text>
        <View className="mt-1">
          <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            className="flex-row items-center border border-[#305495] rounded-xl p-2 bg-white"
          >
            <Text className="text-black text-md font-bold ">
              {" "}
              {selectedStudent ? selectedStudent : "--selecte A Student--"}{" "}
            </Text>
            <Feather
              name="chevron-down"
              size={20}
              color="#305495"
              className="ml-2"
            />
          </TouchableOpacity>
        </View>
      </View>

      {isOpen ? (
        <View className="bg-white rounded-xl shadow-md p-4 space-y-3 gap-2 ">
          <Text
            onPress={() => {
              setSelectedStudent("Amar");
              setIsOpen(false);
            }}
            className="font-bold"
          >
            Amar
          </Text>

          <Text
            onPress={() => {
              setSelectedStudent("Vaibhav");
              setIsOpen(false);
            }}
            className="font-bold"
          >
          
            Vaibhav
          </Text>

          <Text 
          onPress={() => {setSelectedStudent("Akshay");
            setIsOpen(false);
          }}
          
          className="font-bold"> Akshay</Text>
          <Text 
          onPress={() => {
            setSelectedStudent("Asad");
            setIsOpen(false);
          }}
          
          className="font-bold">Asad</Text>
        </View>
      ) : (
        ""
      )}
    </View>
  );
};

export default timetable;
