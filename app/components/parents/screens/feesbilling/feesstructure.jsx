import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

const feesstructure = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pressedItem, setPressedItem] = useState(null); // Track which item is being pressed
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = ["Amar", "Akbar", "Anthony", "Amit"];

  return (
    <View>
      <View>
        <Text className="font-bold text-xl">Select Student:</Text>
        <View className="mt-1">
          <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            className="flex-row items-center border border-[#305495] rounded-xl p-2 bg-white"
          >
            <Text className="text-black text-md font-bold">{selectedStudent ? selectedStudent : "--Select A Student--" }  </Text>
            <Feather
              name="chevron-down"
              size={20}
              color="#305495"
              className="ml-2"
            />
          </TouchableOpacity>
        </View>
      </View>

      {isOpen && (
        <View className="bg-white rounded-xl shadow-md p-2 mt-2">
          {students.map((name, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setSelectedStudent(name);
                setIsOpen(false);
              }}
              onPressIn={() => setPressedItem(index)}
              onPressOut={() => setPressedItem(null)}
              className={`p-2 rounded-lg ${
                pressedItem === index ? "bg-blue-200" : "bg-white"
              }`}
            >
              <Text className="font-bold text-black">{name}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default feesstructure;
