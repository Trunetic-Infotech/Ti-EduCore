import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./../commanComponents/header";
import Home from "./home";

import Studentprofile from "./screens/profile/studentprofile";
import Teacherprofile from "./screens/profile/teacherprofile";
import Attendence from "./screens/student/attendence";

import Timetable from "./screens/exam/timetable";
import Studentcertificates from "./screens/progress/studentcertificates";
import Otherrecords from "./screens/progress/otherrecords";
import Feesstructure from "./screens/feesbilling/feesstructure";
import Feesrecord from "./screens/feesbilling/feesrecord";
import Payfees from "./screens/feesbilling/payfees";
import Feesduehistory from "./screens/feesbilling/feesdue";
import Addcomplaint from "./screens/complaint/addcomplaint";
import Addfeedback from "./screens/complaint/addfeedback";
import Result from "./screens/results/studentresults";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/features/authSlice";

import Maps from "./screens/map/maps";
import { set } from "lodash";
import { useRouter } from "expo-router";

const parentsdashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const router = useRouter();


 
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");

  // result
  const [teacher_id, setTeacher_id] = useState(null);
  const [progressId, setProgressId] = useState("");

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {

      const userId = await SecureStore.getItemAsync("userId");
      const token = await SecureStore.getItemAsync("token");
     
      console.log(API_URL, `/parents/profile/${userId}`);
      const response = await axios.get(`${API_URL}/parents/profile/${userId}`, {
        headers: {
          Authorization:`Bearer ${token}`,
        },
      });
     
        dispatch(setUser(response.data.parent));
        // Alert.alert("True", "User profile Set")

      
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Internal Server Error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Student Data

  const fetchStudentData = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${API_URL}/parents/get-student/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data.profile,'by');
      if (response.data && response.data.profile) {
        setStudents(response.data.profile);
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (user) {
      fetchStudentData();
    }
  }, [user]);


  const [selectedDriverId, setSelectedDriverId] = useState(null);

useEffect(() => {
  if (students && students.length > 0) {
    const selectedId = parseInt(studentId);
    const student = students.find((s) => s.id === selectedId);

    if (student) {
      setSelectedDriverId(student.driver_id);
    } else {
      setSelectedDriverId(students[0].driver_id);
    }
  }
}, [studentId, students]);


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

  const Profile = [
    {
      id: "1",
      name: "Student Profile",
      subitem: {
        key: "studentprofile",
        component: (
          <Studentprofile
            
            studentId={studentId}
            
          />
        ),
      },
    },

    {
      id: "2",
      name: "Teacher Profile",
      subitem: {
        key: "teacherprofile",
        component: <Teacherprofile  teacher_id={teacher_id} />,
      },
    },
  ];

  const StudentAttendence = [
    {
      id: "1",
      name: "Attendance",
      subitem: {
        key: "attendance",
        component: <Attendence studentId={studentId} students={students} />,
      },
    },
  ];

  const ExamTimeTable = [
    {
      id: "1",
      name: "Time Table",
      subitem: {
        key: "timetable",
        component: <Timetable students={students} studentId={studentId} />,
      },
    },
  ];

  const ProgressReport = [
    {
      id: "1",
      name: "Student Certificates",
      subitem: {
        key: "studentcertificates",
        component: <Studentcertificates />,
      },
    },
    {
      id: "2",
      name: "Other Records",
      subitem: {
        key: "otherrecords",
        component: <Otherrecords />,
      },
    },
  ];

  const FeesBilling = [
    {
      id: "1",
      name: "Fees Structure",
      subitem: {
        key: "feesstructure",
        component: <Feesstructure students={students} />,
      },
    },
    {
      id: "2",
      name: "Fees Record",
      subitem: {
        key: "feesrecord",
        component: <Feesrecord />,
      },
    },
    {
      id: "3",
      name: "Pay Fees",
      subitem: {
        key: "payfees",
        component: <Payfees />,
      },
    },

    {
      id: "3",
      name: "Fees Due History",
      subitem: {
        key: "feesduehistory",
        component: <Feesduehistory />,
      },
    },
  ];

  const Complaint = [
    {
      id: "4",
      name: "Add Complaint",
      subitem: {
        key: "addcomplaint",
        component: <Addcomplaint />,
      },
    },
    {
      id: "2",
      name: "Add Feedback",
      subitem: {
        key: "addfeedback",
        component: <Addfeedback />,
      },
    },
  ];
  const Map = [
    {
      id: "1",
      name: "Map",
      subitem: {
        key: "map",
        component: <Maps  selectedId={selectedDriverId} />,
      },
    },
  ];


  const handleLogOut =  async()=>{
    try {
      const response = await axios.post(`${API_URL}/admin/logout`,
        {withCredentials: true}
      )

      if(response.data.success){
        
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('userId');
        Alert.alert("Logout Successfull", "User Logout Successfull");
        router.push('/');
       
      }else{
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Logout Failed");
    }
  }

  useEffect(()=>{
    console.log(teacher_id)
  },[teacher_id])
 

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-gray-100">
      {/* Custom Header */}
      <Header title="Parent Dashboard" onMenuPress={() => setIsOpen(true)} />
      {/* Page Content */}
      <View className="p-4 flex-1">
        {selectedComponent ? (
          selectedComponent
        ) : (
          // Default content
          <View>
            <Home studentId={studentId} setSelectedComponent={setSelectedComponent}  students={students} setStudentId={setStudentId} setTeacher_id={setTeacher_id}/>
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
              Parent Menus
            </Text>

            {/* Home Button */}
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-md mb-3"
              onPress={() => {
                setSelectedComponent(<Home studentId={studentId} setSelectedComponent={setSelectedComponent} students={students} setStudentId={setStudentId} setTeacher_id={setTeacher_id} />);
                setIsOpen(false);
              }}
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Home
                </Text>
              </View>
            </TouchableOpacity>
            {/* 
Student Profile Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(activeSection === "profile" ? null : "profile")
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Profile
                </Text>
              </View>
            </TouchableOpacity>

            {activeSection === "profile" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={Profile}
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
                  activeSection === "attendence" ? null : "attendence"
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
            {activeSection === "attendence" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={StudentAttendence}
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

            {/* Student Result Toggle Button */}
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-md mb-3"
              onPress={() => {
                setSelectedComponent(
                  <Result studentId={studentId} setProgressId={setProgressId} setSelectedComponent={setSelectedComponent} />
                );
                setIsOpen(false);
              }}
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Result
                </Text>
              </View>
            </TouchableOpacity>

            {/* 
            Exam Time Table Toggle Button */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(
                  activeSection === "timetable" ? null : "timetable"
                )
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Exam Time Table
                </Text>
              </View>
            </TouchableOpacity>

            {activeSection === "timetable" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={ExamTimeTable}
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
            {/* Parent Progress Toggle Button */}

            <TouchableOpacity
              onPress={() =>
                setActiveSection(
                  activeSection === "progressreport" ? null : "progressreport"
                )
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Progress Report
                </Text>
              </View>
            </TouchableOpacity>

            {activeSection === "progressreport" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={ProgressReport}
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
            {/* Fees Biiling */}
            <TouchableOpacity
              onPress={() =>
                setActiveSection(
                  activeSection === "feesbilling" ? null : "feesbilling"
                )
              }
              className="bg-gray-200 p-3 rounded-md mb-3"
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Fees Billing
                </Text>
              </View>
            </TouchableOpacity>

            {activeSection === "feesbilling" && (
              <View className="bg-gray-100 p-3 rounded-md">
                <FlatList
                  data={FeesBilling}
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

            {/* Complaint Toggle Button */}

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
                  data={Complaint}
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
            {/* // Map */}
            <TouchableOpacity
              className="bg-gray-200 p-3 rounded-md mb-3"
              onPress={() => {
                setSelectedComponent(<Maps selectedId={selectedDriverId} />);
                setIsOpen(false);
              }}
            >
              <View>
                <Text className="text-black font-semibold text-center">
                  Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Logout fixed at bottom */}
          <TouchableOpacity onPress={handleLogOut} className="bg-[#f1a621] p-3 rounded-md mt-4">
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

export default parentsdashboard;
