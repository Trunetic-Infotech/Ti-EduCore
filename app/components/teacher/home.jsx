import { View, Text, ScrollView, Alert } from "react-native";
import CardCoponets from "../commanComponents/CardCoponets";
import TimeTable from './screens/timetable/timetable';
import HomeWorks from "./screens/homework/homeWorks";
import { useSelector } from "react-redux";
import AllAttendanceList from "./screens/attendance/allattendancelist";
import Takeattendance from "./screens/attendance/takeattendance";
import StudentList from "./screens/student/studentslist";
import Allevents from "./screens/events/allevents";
import Allstudentsmarks from "./screens/results/allstudentsmarks";
import Leavesrequest from "./screens/leaves/leavesrequest";
import AddComplaints from "./screens/complaints/addComplaints";
import * as SecureStore from 'expo-secure-store'
import { API_URL } from '@env';
import axios from "axios";
import { useEffect, useState } from "react";

const home = ({setSelectedComponent,setHomework_id, getHomeworkAndSubmissions, homeworkList, homework_id}) => {
  const user = useSelector((state) => state.auth.user);
  const [count, setCount] = useState(null); // Default loading state

  const [homeworkData, setHomeworkData] = useState([]);
  const [timeTable, setTimeTable] = useState([]);

   const getTotalStudents = async () => {
    if (!user?.subclass_id) return; // Ensure subclass_id is available before API call

    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${API_URL}/teacher/total-students/${
          user.subclass_id
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.totalStudents !== undefined) {
        setCount(response.data.totalStudents); // ✅ Ensure correct key
      } else {
        Alert.alert("Error",response.data.message || "Failed to fetch students.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error",error.response?.data?.message || "Something went wrong!");
    }
  };

  const getHomeworkData = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${API_URL}/homework/teacher/homework-count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data && response.data.data) {
        setHomeworkData(response.data.data);
      } else {
        Alert.alert("Error",response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error",error.response?.data?.message || "Something went wrong!");
    }
  };

  const getTeacherTimeTable = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${API_URL}/class-timetable/get-teacher-timetable`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data?.success) {
        setTimeTable(response.data.teacher_timetable);
        
      } else {
        Alert.alert("Error",response.data.message || "Failed to retrieve timetable.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something Went Wrong!!");
    }
  };

   useEffect(() => {
    getTotalStudents();
  }, [user]); 

  useEffect(() => {
    getTeacherTimeTable();
  }, []);

  useEffect(() => {
  const fetchData = async () => {
    await getHomeworkData();
    await getHomeworkAndSubmissions();
  };

  fetchData();
}, []);


  return (
    <ScrollView>
      <View className="w-full gap-4">
        <CardCoponets name={user.teacher_Name} />

        {/* Wrap grid */}
        <View className="flex-row flex-wrap justify-between mt-4 gap-2">
          <CardCoponets name={user ? user.class_name : "Loading..." } data="Class" className="w-[48%]" />
          <CardCoponets name={user ? user.division : "Loading..." } data="Division" className="w-[48%]" />
          <CardCoponets name={count === null ? "-" : count} data="Total Students" className={`w-[48%] `} />
          <CardCoponets onPress={()=> setSelectedComponent(<Takeattendance />)} name="Take Attendance" className="w-[48%]" />
          <CardCoponets onPress={()=> setSelectedComponent(<StudentList setSelectedComponent={setSelectedComponent}/>)} name="Students List" className="w-[48%]" />
          <CardCoponets onPress={()=> setSelectedComponent(<Allevents/>)} name="Events" className="w-[48%]" />
          <CardCoponets onPress={()=> setSelectedComponent(<Allstudentsmarks/>)} name="Results" className="w-[48%]" />
          <CardCoponets onPress={()=> setSelectedComponent(<Leavesrequest/>)} name="Request Leave" className="w-[48%]" />
        </View>

        {/* Extra cards */}
        <CardCoponets onPress={()=> setSelectedComponent(<AddComplaints/>)} name="Add Complaint" />
        <CardCoponets name="HomeWorks" />

        {/* Text Message */}
        <View className="mt-4">
         <HomeWorks homeworkData={homeworkData} count={count} setSelectedComponent={setSelectedComponent} setHomework_id={setHomework_id} getHomeworkAndSubmissions={getHomeworkAndSubmissions} homeworkList={homeworkList} homework_id={homework_id}/>
        </View>
      </View>
      <View className="mt-4">

     <TimeTable timeTable={timeTable}/>
      </View>
    </ScrollView>
  );
};

export default home;
