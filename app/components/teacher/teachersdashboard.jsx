import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import Header from "./../commanComponents/header";

const TeachersDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const TeacherMap = [
    { id: "1", name: "Alice Johnson" },
    { id: "2", name: "Bob Smith" },
    { id: "3", name: "Charlie Brown" },
    { id: "4", name: "David Wilson" },
  ];
  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-gray-100">
      {/* Custom Header */}
      <Header title="Teacher Dashboard" onMenuPress={() => setIsOpen(true)} />
      {/* Page Content */}
      <View className="p-4">
        <Text className="text-lg text-gray-700">
          Welcome to the teacher dashboard. Use the menu to navigate.
        </Text>
      </View>

      {/* Side Menu */}
      {isOpen && (
        <View className="absolute left-0 bottom-0 top-12 h-full w-[70%] bg-[#7b9cdb] p-4 shadow-lg z-50 flex flex-col justify-between">
          {/* Close button */}
          <View className="items-end mb-4">
            <AntDesign
              onPress={() => setIsOpen(false)}
              name="close"
              size={24}
              color="black"
            />
          </View>

          {/* Main menu options */}
          <View className="flex-grow">
            <Text className="text-xl font-semibold text-black mb-4">
              Teacher Menus
            </Text>
            <TouchableOpacity className="bg-gray-200 p-3 rounded-md mb-3">
              <Text className="text-black font-semibold text-center">
                Teacher Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-200 p-3 rounded-md mb-3">
              <Text className="text-black font-semibold text-center">
                Student Lists
              </Text>
            </TouchableOpacity>
            {/* Student Attendance Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(
                  activeSection === "attendance" ? null : "attendance"
                )
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <Text className="text-black font-semibold text-center">
                Student Attendance
              </Text>
            </TouchableOpacity>
            {activeSection === "attendance" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={TeacherMap}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity className="bg-[#e3eaf7] rounded-lg p-4 mb-3">
                      <Text className="text-lg text-black">{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            {/* Student Attendance Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(
                  activeSection === "studyMaterial" ? null : "studyMaterial"
                )
              }
              className="bg-gray-200 p-3 rounded-md mb-5"
            >
              <Text className="text-black font-semibold text-center">
                Study Material
              </Text>
            </TouchableOpacity>
            {/* Student List */}
            {activeSection === "studyMaterial" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={TeacherMap}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity className="bg-[#e3eaf7] rounded-lg p-4 mb-3">
                      <Text className="text-lg text-black">{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            // Results
            <TouchableOpacity
              onPress={() =>
                setActiveSection(activeSection === "results" ? null : "results")
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <Text className="text-black font-semibold text-center">
                Results
              </Text>
            </TouchableOpacity>
            {activeSection === "results" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={TeacherMap}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity className="bg-[#e3eaf7] rounded-lg p-4 mb-3">
                      <Text className="text-lg text-black">{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            {/* Student Attendance Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(
                  activeSection === "progress" ? null : "progress"
                )
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <Text className="text-black font-semibold text-center">
                Progress
              </Text>
            </TouchableOpacity>
            {/* Student List */}
            {activeSection === "progress" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={TeacherMap}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity className="bg-[#e3eaf7] rounded-lg p-4 mb-3">
                      <Text className="text-lg text-black">{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            {/* Student Attendance Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(
                  activeSection === "studentsRequest" ? null : "studentsRequest"
                )
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <Text className="text-black font-semibold text-center">
                See Students Request
              </Text>
            </TouchableOpacity>
            {/* Student List */}
            {activeSection === "studentsRequest" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={TeacherMap}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity className="bg-[#e3eaf7] rounded-lg p-4 mb-3">
                      <Text className="text-lg text-black">{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            {/* Student Attendance Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(activeSection === "salary" ? null : "salary")
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <Text className="text-black font-semibold text-center">
                Salary
              </Text>
            </TouchableOpacity>
            {/* Student List */}
            {activeSection === "salary" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={TeacherMap}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity className="bg-[#e3eaf7] rounded-lg p-4 mb-3">
                      <Text className="text-lg text-black">{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            {/* Student Attendance Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(activeSection === "leaves" ? null : "leaves")
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <Text className="text-black font-semibold text-center">
                Leaves
              </Text>
            </TouchableOpacity>
            {/* Student List */}
            {activeSection === "leaves" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={TeacherMap}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity className="bg-[#e3eaf7] rounded-lg p-4 mb-3">
                      <Text className="text-lg text-black">{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            {/* Student Attendance Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(activeSection === "events" ? null : "events")
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <Text className="text-black font-semibold text-center">
                Events
              </Text>
            </TouchableOpacity>
            {/* Student List */}
            {activeSection === "events" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={TeacherMap}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity className="bg-[#e3eaf7] rounded-lg p-4 mb-3">
                      <Text className="text-lg text-black">{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            {/* Student Attendance Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(
                  activeSection === "complaints" ? null : "complaints"
                )
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <Text className="text-black font-semibold text-center">
                Complaints
              </Text>
            </TouchableOpacity>
            {/* Student List */}
            {activeSection === "complaints" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={TeacherMap}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity className="bg-[#e3eaf7] rounded-lg p-4 mb-3">
                      <Text className="text-lg text-black">{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>

          {/* Logout fixed at bottom */}
          <TouchableOpacity className="bg-[#f1a621] p-3 rounded-md mt-4">
            <Text className="text-black font-semibold text-center">Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TeachersDashboard;
