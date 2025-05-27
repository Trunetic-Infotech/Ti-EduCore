import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import Header from "./../commanComponents/header";
import Home from "../students/screens/home/Home"
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
import * as SecureStore from 'expo-secure-store'
import axios from "axios";
import { API_URL } from '@env';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/features/authSlice";

const studentsdashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [subjects, setSubjects] = useState([]);
  const [subject_id, setSubject_id] = useState(null)
  const [subject_name, setSubject_name] = useState(null)
  const user = useSelector((state)=> state.auth.user);


  const fetchUser = async()=>{
    try {
      const userId = await SecureStore.getItemAsync('userId');
      const token = await SecureStore.getItemAsync('token');
      // console.log(userId);
      // console.log(token);
      console.log(API_URL);
      
      const response = await axios.get(`${API_URL}/student/profile/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      if(response.data.success){
        dispatch(setUser(response.data.user))
        // Alert.alert("True", "User profile Set")
      }else{
        Alert.alert("No user Found", response.data.message)
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Internal Server Error");
    }
  }


  const getSubject = async()=>{
    try {
      const token = await SecureStore.getItemAsync("token")
          const response = await axios.get(`${API_URL}/class/subject/get-all-class?class_id=${user.class_id}`,{
            headers: {
              Authorization : `Bearer ${token}`
            }
          })
          console.log("All the Subjects",response)
          if(response.data && response.data.AllSubject){
            setSubjects(response.data.AllSubject)
          }else{
            Alert.alert("Error",response.data.message);
          }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Internal Server Error");
    }
  }
  useEffect(()=>{
    fetchUser();
    getSubject();
  },[])

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
  

  
  const EventsMap = [
    {
      id: "1",
      name: "Events",
      subitem: {
        key: "Events",
        component: <Events/>,
      }
    }
  ]

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
        component: <Notes setSelectedComponent={setSelectedComponent} getSubject={getSubject} subjects={subjects} setSubject_id={setSubject_id} setSubject_name={setSubject_name} />,
      },
    },
    {
      id: "4",
      name: "Video Lectures",
      subitem: {
        key: "videoLectures",
        component: <VideoLectures setSelectedComponent={setSelectedComponent} getSubject={getSubject} subjects={subjects} setSubject_id={setSubject_id} setSubject_name={setSubject_name}/>,
      },
    },
  ];
  useEffect(()=>{
    console.log("Hello",selectedComponent);
    
  },[selectedComponent])

  const resultsMap = [
    {
      id: "1",
      name: "Current Year results",
      subitem: {
        key: "currentYearResult",
        component: <CurrentYearResults setSelectedComponent={setSelectedComponent}/>,
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

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-gray-100">
      {/* Custom Header */}
      <Header title="Student Dashboard" onMenuPress={() => setIsOpen(true)} />
      {/* Page Content */}
      <View className=" flex-1">
        {selectedComponent ? (
    selectedComponent?.subitem?.component
        ) : (
          // Default content
          <View>
            <Home setSelectedComponent={setSelectedComponent} studyMaterial={studyMaterial} EventsMap={EventsMap}/>
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
                setSelectedComponent({ subitem: { component: <Home /> } });
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
                setSelectedComponent({ subitem: { component: <Profile fetchUser={fetchUser}/> } });
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
                        setSelectedComponent({ subitem: { component: item.subitem.component } });
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
                        setSelectedComponent({ subitem: { component: item.subitem.component } });
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
                        setSelectedComponent({ subitem: { component: item.subitem.component } });
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
                setSelectedComponent({ subitem: { component: <Events /> } });
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
                setSelectedComponent({ subitem: { component: <Library /> } });
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
                        setSelectedComponent({ subitem: { component: item.subitem.component } });
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
                        setSelectedComponent({ subitem: { component: item.subitem.component } });
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

export default studentsdashboard;
