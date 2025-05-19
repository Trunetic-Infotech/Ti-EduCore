import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./../commanComponents/header";
import Home from "./home";
import AllAttendanceList from "./screens/attendance/allattendancelist";
import TakeAttendance from "./screens/attendance/takeattendance";
import UploadAttendance from "./screens/attendance/uploadattendance";
import AddComplaints from "./screens/complaints/addComplaints";
import Addevents from "./screens/events/addevents";
import ALlevents from "./screens/events/allevents";
import Leavehistory from "./screens/leaves/leaveshistory";
import Leaverequest from "./screens/leaves/leavesrequest";
import Homeworkprogress from "./screens/progress/homeworkprogress";
import Labattendance from "./screens/progress/labattendance";
import Studentsprogress from "./screens/progress/studentsprogress";
import Allstudentsmarks from "./screens/results/allstudentsmarks";
import Createresult from "./screens/results/createresult";
import Uploadmerks from "./screens/results/uploadmerks";
import Uploadpaperpdf from "./screens/results/uploadpaperpdf";
import Verifymerks from "./screens/results/verifymerks";
import Salarylist from "./screens/salary/salarylist";
import Studentlist from "./screens/student/studentslist";
import Studentsproblem from "./screens/studentsrequest/studentsproblem";
import Studentsquestions from "./screens/studentsrequest/studentsquestions";
import Allhomeworklist from "./screens/studyMaterial/allhomeworklist";
import Allstudymaterial from "./screens/studyMaterial/allstudymaterial";
import Allvideoleacture from "./screens/studyMaterial/allvideoleacture";
import Createsubject from "./screens/studyMaterial/createsubject";
import Uploadhomework from "./screens/studyMaterial/uploadhomework";
import Uploadnotes from "./screens/studyMaterial/uploadnotes";
import Uploadvideoleacture from "./screens/studyMaterial/uploadvideoleacture";
import Studentslist from "./screens/student/studentslist";
import Profile from "./screens/profile/profile";
const TeachersDashboard = () => {
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

  const TeacherAttendance = [
    {
      id: "1",
      name: "Take Attendance",
      subitem: {
        key: "attendance",
        component: <TakeAttendance />,
      },
    },
    {
      id: "2",
      name: "All Attendance",
      subitem: {
        key: "allAttendance",
        component: <AllAttendanceList />,
      },
    },
    {
      id: "3",
      name: "Upload Attendance",
      subitem: {
        key: "uploadAttendance",
        component: <UploadAttendance />,
      },
    },
  ];

  const studyMetrialMap = [
    {
      id: "1",
      name: "All Homework",
      subitem: {
        key: "allHomework",
        component: <Allhomeworklist />,
      },
    },
    {
      id: "2",
      name: "All Study Material",
      subitem: {
        key: "allstudyMaterial",
        component: <Allstudymaterial />,
      },
    },
    {
      id: "3",
      name: "Study Material",
      subitem: {
        key: "studyMaterial",
        component: <Allhomeworklist />,
      },
    },
    {
      id: "4",
      name: "All video Leacture",
      subitem: {
        key: "allvideoLeacture",
        component: <Allvideoleacture />,
      },
    },
    {
      id: "5",
      name: "Create Subject",
      subitem: {
        key: "createsubject",
        component: <Createsubject />,
      },
    },
    {
      id: "6",
      name: "Upload Homework",
      subitem: {
        key: "uploadhomework",
        component: <Uploadhomework />,
      },
    },
    {
      id: "7",
      name: "Upload Notes",
      subitem: {
        key: "uploadnotes",
        component: <Uploadnotes />,
      },
    },
    {
      id: "8",
      name: "Upload Video Leacture",
      subitem: {
        key: "uploadvideoleacture",
        component: <Uploadvideoleacture />,
      },
    },
  ];

  const resultsMap = [
    {
      id: "1",
      name: "All Students Marks",
      subitem: {
        key: "allstudentsmarks",
        component: <Allstudentsmarks />,
      },
    },
    {
      id: "2",
      name: "Verify Merks",
      subitem: {
        key: "verifymerks",
        component: <Verifymerks />,
      },
    },
    {
      id: "3",
      name: "Upload Merks",
      subitem: {
        key: "uploadmerks",
        component: <Uploadmerks />,
      },
    },
    {
      id: "4",
      name: "Create Result",
      subitem: {
        key: "createresult",
        component: <Createresult />,
      },
    },
    {
      id: "5",
      name: "upload Paper Pdf",
      subitem: {
        key: "uploadpaperpdf",
        component: <Uploadpaperpdf />,
      },
    },
  ];

  const progressMap = [
    {
      id: "1",
      name: "Homework Progress",
      subitem: {
        key: "homworkprogress",
        component: <Homeworkprogress />,
      },
    },
    {
      id: "2",
      name: "Students Progress",
      subitem: {
        key: "studentsprogress",
        component: <Studentsprogress />,
      },
    },
    {
      id: "3",
      name: "Lab Attendance",
      subitem: {
        key: "labattendance",
        component: <Labattendance />,
      },
    },
  ];

  const EventsMap = [
    {
      id: "1",
      name: "Events",
      subitem: {
        key: "events",
        component: <Addevents />,
      },
    },
    {
      id: "2",
      name: "Events",
      subitem: {
        key: "allevents",
        component: <ALlevents />,
      },
    },
  ];

  const studentsRequestMap = [
    {
      id: "1",
      name: "Students Problems",
      subitem: {
        key: "studentsrequest",
        component: <Studentsproblem />,
      },
    },
    {
      id: "2",
      name: "Students Questions",
      subitem: {
        key: "studentsquestions",
        component: <Studentsquestions />,
      },
    },
  ];

  const salaryMap = [
    {
      id: "1",
      name: "Salary List",
      subitem: {
        key: "salary",
        component: <Salarylist />,
      },
    },
  ];
  const leaveMaps = [
    {
      id: "1",
      name: "Leave Request ",
      subitem: {
        key: "leaverequest",
        component: <Leaverequest />,
      },
    },
    {
      id: "2",
      name: "Leave History",
      subitem: {
        key: "leaveshistory",
        component: <Leavehistory />,
      },
    },
  ];

  const complaintsMap = [
    {
      id: "1",
      name: "complaints",
      subitem: {
        key: "complaints",
        component: <AddComplaints />,
      },
    },
  ];

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-gray-100">
      {/* Custom Header */}
      <Header title="Teacher Dashboard" onMenuPress={() => setIsOpen(true)} />
      {/* Page Content */}
      <View className="p-4 flex-1">
        {selectedComponent ? (
          selectedComponent
        ) : (
          // Default content
          <View>
            <Home />
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
              Teacher Menus
            </Text>
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-md mb-3"
              onPress={() => {
                setSelectedComponent(Home);
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
                setSelectedComponent(Profile);
                setIsOpen(false);
              }}
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Teacher Profile
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedComponent(Studentslist);
                setIsOpen(false);
              }}
              className="bg-gray-200 p-3 rounded-md mb-5"
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Students List
                </Text>
              </View>
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
              <View>
                <Text className="text-black font-semibold text-center">
                  Student Attendance
                </Text>
              </View>
            </TouchableOpacity>
            {activeSection === "attendance" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={TeacherAttendance}
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
            {/* Student studey material Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(
                  activeSection === "studyMaterial" ? null : "studyMaterial"
                )
              }
              className="bg-gray-200 p-3 rounded-md mb-5"
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Study Material
                </Text>
              </View>
            </TouchableOpacity>
            {/* Student List */}
            {activeSection === "studyMaterial" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={studyMetrialMap}
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
            {/* Student Results Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(
                  activeSection === "resul ts" ? null : "results"
                )
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Results
                </Text>
              </View>
            </TouchableOpacity>
            {activeSection === "results" && (
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
              <View>
                <Text className="text-black font-semibold text-center">
                  Progress
                </Text>
              </View>
            </TouchableOpacity>
            {/* Student List */}
            {activeSection === "progress" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={progressMap}
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
            {/* Student Attendance Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(
                  activeSection === "studentsRequest" ? null : "studentsRequest"
                )
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  See Students Request
                </Text>
              </View>
            </TouchableOpacity>
            {/* Student List */}
            {activeSection === "studentsRequest" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={studentsRequestMap}
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
            {/* Student Attendance Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(activeSection === "salary" ? null : "salary")
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Salary
                </Text>
              </View>
            </TouchableOpacity>
            {/* Student List */}
            {activeSection === "salary" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={salaryMap}
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
            {/* Student Attendance Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(activeSection === "leaves" ? null : "leaves")
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Leaves
                </Text>
              </View>
            </TouchableOpacity>
            {/* Student List */}
            {activeSection === "leaves" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={leaveMaps}
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
            {/* Student Attendance Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(activeSection === "events" ? null : "events")
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Events
                </Text>
              </View>
            </TouchableOpacity>
            {/* Student List */}
            {activeSection === "events" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={EventsMap}
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
            {/* Student Attendance Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(
                  activeSection === "complaints" ? null : "complaints"
                )
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Complaints
                </Text>
              </View>
            </TouchableOpacity>
            {/* Student List */}
            {activeSection === "complaints" && (
              <View className="bg-gray-100 p-3 rounded-md">
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
          </View>

          {/* Logout fixed at bottom */}
          <TouchableOpacity className="bg-[#f1a621] p-3 rounded-md mt-4">
            <View>
              <Text className="text-black font-semibold text-center">
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TeachersDashboard;
