import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CardCoponets from "../commanComponents/CardCoponets";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "@env";
import { ScrollView } from "react-native";
import Attendence from "./screens/student/attendence";
import Events from "./screens/events/Events";

const home = ({ studentId,setSelectedComponent,students, setStudentId, setTeacher_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState([null]);
   const [pressedItem, setPressedItem] = useState(null);
   const [pending_homeworks, setPending_Homeworks] = useState([]);
  const [timeTable, setTimeTable] = useState([]);


  const user = useSelector((state) => state.auth.user);


  const getPendingHomework = async () => {
    try {
      const token = SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${
          API_URL
        }/homework/student/get-pending-homework?subclass_id=${
          selectedStudent.subclass_id
        }&id=${selectedStudent.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response);
      if (response.data.success) {
        setPending_Homeworks(response.data.pendingHomeworks);
        // Alert.alert(response.data.message);
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  const getTimeTable = async () => {
    try {
      const token = SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${
          API_URL
        }/class-timetable/get-timetable?subclass_id=${
          selectedStudent.subclass_id
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      if (response.data?.success) {
        setTimeTable(response.data.class_timetable);
        // Alert.alert("Success",
        //   response.data.message || "Timetable Retrieved successfully!"
        // );
      } else {
        Alert.alert("Error",response.data.message || "Failed to retrieve timetable.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Internal Server Error");
    }
  };

   // Group by day_of_week
  const groupByDay = (data) => {
    return data.reduce((acc, curr) => {
      if (!acc[curr.day_of_week]) acc[curr.day_of_week] = [];
      acc[curr.day_of_week].push(curr);
      return acc;
    }, {});
  };

  const grouped = groupByDay(timeTable);



  useEffect(()=>{
    if(students && students.length > 0){
      setSelectedStudent(students[0]);
      setStudentId(students[0].id);
      setTeacher_id(students[0].teacher_id);
    }
  },[students])


  useEffect(() => {
    if (selectedStudent && selectedStudent.id && selectedStudent.subclass_id) {
      getPendingHomework();
      getTimeTable();
    }
  }, [selectedStudent]);


  

  return (
    <ScrollView>
      <View className="gap-4  flex-row flex-wrap relative">
        <CardCoponets
          name={user ? user.parents_name : "loading"}
          className="w-full"
        />

        <TouchableOpacity>
          <View>
            <View className="   bg-[#F5F1F1]  border border-[#305495] items-center justify-center p-4 rounded-xl w-[45vw]   ">
              <Text>Select A Student:</Text>
              <View className="mt-1">
                <TouchableOpacity
                  onPress={() => setIsOpen(!isOpen)}
                  className="flex-row items-center border border-[#305495] rounded-xl p-2 bg-white"
                >
                  <Text className="text-black text-sm font-bold ">
                    {selectedStudent ? selectedStudent.student_name : "--Select A Student--"}
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
              <View className="absolute top-20 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-md p-4 z-50 w-[200px]">
                {Array.isArray(students) &&
                  students.map((student, index) => (
                    <Pressable
                      key={index}
                      onPress={() => {
                        setSelectedStudent(student);
                        setStudentId(student.id);
                        setTeacher_id(student.teacher_id);
                        setIsOpen(false);
                      }}
                      onPressIn={() => setPressedItem(index)}
                      onPressOut={() => setPressedItem(null)}
                      className={`p-2 rounded-lg ${
                        pressedItem === index ? "bg-blue-200" : "bg-white"
                      }`}
                    >
                      <Text className="text-black">{student.student_name}</Text>
                    </Pressable>
                  ))}
              </View>
            ) : (
              ""
            )}
          </View>
        </TouchableOpacity>

        <CardCoponets name={selectedStudent.class_name} data="Class" className="w-[48%]  z-[-10]" />
        <CardCoponets name={selectedStudent.division} data="Class" className="w-[48%] z-[-1] " />

        <CardCoponets onPress={()=>{
          setSelectedComponent(<Attendence students={students} studentId={selectedStudent.id} />)
        }} name="View Attendance" className="w-[48%]  z-[-1]" />

        <CardCoponets name="Pay Fees" className="w-[48%] z-[-1]" />
        <CardCoponets onPress={()=>{
          setSelectedComponent(<Events />)
        }} name="Events" className="w-[48%] z-[-1]" />
        <CardCoponets name="Pending Homeworks" className="w-full" />
        <View className='w-full gap-4'>
          {pending_homeworks && pending_homeworks.length > 0 ? (
                    pending_homeworks.map((pHW, index) => (
                      <TouchableOpacity
                        
                        key={index}
                        className="bg-white border border-[#305495] rounded-xl p-4 shadow-md"
                        style={styles.box}
                      >
                        <View className="flex-row justify-between mb-1">
                          <Text className="font-medium text-gray-700">Subject:</Text>
                          <Text className="text-gray-600 font-bold">{pHW.subject}</Text>
                        </View>
        
                        <View className="flex-row justify-between mb-1">
                          <Text className="font-medium text-gray-700">Teacher:</Text>
                          <Text className="text-gray-600 font-bold">{pHW.teacher_Name}</Text>
                        </View>
        
                        <View className="flex-row justify-between mb-1">
                          <Text className="font-medium text-gray-700">
                            Description:
                          </Text>
                          <Text className="text-gray-600 font-bold">{pHW.description}</Text>
                        </View>
        
                        <View className="flex-row justify-between mb-1">
                          <Text className="font-medium text-gray-700">Status:</Text>
                          <Text className="text-red-500 font-semibold">
                            {pHW.status === "pending" ? "Pending" : ""}
                          </Text>
                        </View>
        
                        <View className="flex-row justify-between">
                          <Text className="font-medium text-gray-700">Last Date:</Text>
                          <Text className="text-gray-600 font-bold">
                            {new Date(pHW.submission_date).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text className="text-center text-gray-500 italic">
                      No Homework Available
                    </Text>
                  )}
        </View>
        <View className='w-full gap-2 mt-2'>
          {Object.entries(grouped).map(([day, slots]) => (
                    <View key={day} className={`mb-6`}>
                      <Text className={`text-xl font-bold mb-2 text-blue-800`}>
                        📅 {day}
                      </Text>
                      {slots
                        .sort((a, b) => a.start_time.localeCompare(b.start_time))
                        .map((slot) => (
                          <View
                            key={slot.id}
                            className={`bg-white p-3 mb-2 rounded-lg shadow`}
                          >
                            <Text className={`text-base text-gray-800`}>
                              {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}{" "}
                              | {slot.subject_name.trim()} - {slot.teacher_Name.trim()}
                            </Text>
                          </View>
                        ))}
                    </View>
                  ))}
        </View>
      </View>

      {/* Form */}
      <View></View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  box: {
    // boxShadow: '0px 8px 6px rgba(48, 84, 149, 0.2)'
    boxShadow:
      "-6px 10px 15px rgba(48, 84, 149, 0.2),6px 10px 15px rgba(48, 84, 149, 0.2),0px 12px 18px rgba(48, 84, 149, 0.2)",
  },
});

export default home;
