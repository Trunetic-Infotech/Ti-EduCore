import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import Header from "./../commanComponents/header";
import Home from "./screens/home/Home";
import Profile from "./screens/profile/Profile";
import Homework from "./screens/studyMaterial/Homework";
import SubmitHomework from "./screens/studyMaterial/SubmitHomework";
import Notes from "./screens/studyMaterial/Notes";
import VideoLectures from "./screens/studyMaterial/VideoLectures";
import CurrentYearResults from "./screens/results/CurrentYearResults";
import PreviousYearResults from "./screens/results/PreviousYearResults";
import TimeTable from "./screens/Exam/TimeTable";
import Events from "./screens/events/Events";
import Library from "./screens/Library/Library";
import AddComplaints from "./screens/Complaints/AddComplaints";
import AddFeedback from "./screens/Complaints/AddFeedback";
import AskQuestions from "./screens/RequestTickets/AskQuestions";
import ViewAnswers from "./screens/RequestTickets/ViewAnswers";
import Supports from "./screens/RequestTickets/Supports";
import { useRouter } from "expo-router";

const studentsdashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  

  useEffect(() => {
    const backAction = () => {
      if (selectedComponent) {
        setSelectedComponent(null); // go back to dashboard
        return true; // prevent default back behavior
      }
      return false; // allow default behavior (exit screen)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [selectedComponent]);

  const studyMaterial = [
    {
      id: "1",
      name: "Homework",
      subitem: {
        key: "homework",
        component: <Homework />,
      },
    },
    {
      id: "2",
      name: "Submit Homework",
      subitem: {
        key: "submitHomework",
        component: <SubmitHomework />,
      },
    },
    {
      id: "3",
      name: "Notes",
      subitem: {
        key: "notes",
        component: <Notes />,
      },
    },
    {
      id: "4",
      name: "Video Lectures",
      subitem: {
        key: "videoLectures",
        component: <VideoLectures />,
      },
    },
  ];

  const resultsMap = [
    {
      id: "1",
      name: "Current Year results",
      subitem: {
        key: "currentYearResult",
        component: <CurrentYearResults />,
      },
    },
    {
      id: "2",
      name: "Previous Year results",
      subitem: {
        key: "previousYearResult",
        component: <PreviousYearResults />,
      },
    },
  ];

  const ExamsMap = [
    {
      id: "1",
      name: "TimeTable",
      subitem: {
        key: "timetable",
        component: <TimeTable />,
      },
    },
  ];

  const complaintsMap = [
    {
      id: "1",
      name: "Add Complaints",
      subitem: {
        key: "addComplaints",
        component: <AddComplaints />
      }
    },
    {
      id: "2",
      name: "Add Feedback",
      subitem: {
        key: "addFeedback",
        component: <AddFeedback />
      }
    },
  ]

  const requestTickets = [
    {
      id: "1",
      name: "Ask Questions",
      subitem: {
        key: "askQuestions",
        component: <AskQuestions />
      }
    },
    {
      id: "2",
      name: "View Answers",
      subitem: {
        key: "viewAnswers",
        component: <ViewAnswers />
      }
    },
    {
      id: "3",
      name: "Support",
      subitem: {
        key: "support",
        component: <Supports />
      }
    },
  ]

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-gray-100">
      {/* Custom Header */}
      <Header title="Student Dashboard" onMenuPress={() => setIsOpen(true)} />
      {/* Page Content */}
      <View className=" flex-1">
        {selectedComponent ? (
          selectedComponent
        ) : (
          // Default content
          <View>
            <CurrentYearResults />
            {/* <Home /> */}
          </View>
        )}
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
              Student Menus
            </Text>
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-md mb-3"
              onPress={() => {
                setSelectedComponent(<Home />);
                setIsOpen(false);
              }}
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Home
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-md mb-3"
              onPress={() => {
                setSelectedComponent(<Profile />);
                setIsOpen(false);
              }}
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Profile
                </Text>
              </View>
            </TouchableOpacity>
            {/* -- */}
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-md mb-3"
              onPress={() =>
                setActiveSection(
                  activeSection === "studyMaterial" ? null : "studyMaterial"
                )
              }
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Study Material
                </Text>
              </View>
            </TouchableOpacity>
            {activeSection === "studyMaterial" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={studyMaterial}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedComponent(item.subitem.component);
                        setIsOpen(false); // Close the side menu after selection (optional)
                      }}
                      className="bg-[#e3eaf7] rounded-lg p-4 mb-3"
                    >
                      <View>
                        <Text className="text-lg text-black">{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}

            {/* -- */}
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-md mb-3"
              onPress={() =>
                setActiveSection(
                  activeSection === "resultMap" ? null : "resultMap"
                )
              }
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Results
                </Text>
              </View>
            </TouchableOpacity>
            {activeSection === "resultMap" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={resultsMap}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedComponent(item.subitem.component);
                        setIsOpen(false); // Close the side menu after selection (optional)
                      }}
                      className="bg-[#e3eaf7] rounded-lg p-4 mb-3"
                    >
                      <View>
                        <Text className="text-lg text-black">{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}

            {/* -- */}
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-md mb-3"
              onPress={() =>
                setActiveSection(
                  activeSection === "ExamsMap" ? null : "ExamsMap"
                )
              }
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Exams
                </Text>
              </View>
            </TouchableOpacity>
            {activeSection === "ExamsMap" && (
              <View className="bg-gray-100 p-3 rounded-md ">
                <FlatList
                  data={ExamsMap}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedComponent(item.subitem.component);
                        setIsOpen(false); // Close the side menu after selection (optional)
                      }}
                      className="bg-[#e3eaf7] rounded-lg p-4 mb-3"
                    >
                      <View>
                        <Text className="text-lg text-black">{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}

            {/* -- */}
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-md mb-3"
              onPress={() => {
                setSelectedComponent(<Events />);
                setIsOpen(false);
              }}
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Events
                </Text>

                
              </View>
            </TouchableOpacity>

                {/* -- */}
                <TouchableOpacity
              className="bg-gray-200 p-3 rounded-md mb-3"
              onPress={() => {
                setSelectedComponent(<Library />);
                setIsOpen(false);
              }}
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Library
                </Text>

                
              </View>
            </TouchableOpacity>

            {/* -- */}
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-md mb-3"
              onPress={() =>
                setActiveSection(
                  activeSection === "complaintsMap" ? null : "complaintsMap"
                )
              }
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Complaints
                </Text>
              </View>
            </TouchableOpacity>
            {activeSection === "complaintsMap" && (
              <View className="bg-gray-100 p-3 rounded-md ">
                <FlatList
                  data={complaintsMap}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedComponent(item.subitem.component);
                        setIsOpen(false); // Close the side menu after selection (optional)
                      }}
                      className="bg-[#e3eaf7] rounded-lg p-4 mb-3"
                    >
                      <View>
                        <Text className="text-lg text-black">{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}

            {/* -- */}
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-md mb-3"
              onPress={() =>
                setActiveSection(
                  activeSection === "requestTickets" ? null : "requestTickets"
                )
              }
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Request Tickets
                </Text>
              </View>
            </TouchableOpacity>
            {activeSection === "requestTickets" && (
              <View className="bg-gray-100 p-3 rounded-md ">
                <FlatList
                  data={requestTickets}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedComponent(item.subitem.component);
                        setIsOpen(false); // Close the side menu after selection (optional)
                      }}
                      className="bg-[#e3eaf7] rounded-lg p-4 mb-3"
                    >
                      <View>
                        <Text className="text-lg text-black">{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default studentsdashboard;
