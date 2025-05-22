import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CardCoponets from "../../../commanComponents/CardCoponets";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import Events from "../events/Events";
import SubmitHomework from "../studyMaterial/SubmitHomework";

const Home = ({ setSelectedComponent, studyMaterial, EventsMap }) => {
  const router = useRouter();
  // console.log(studyMaterial[1]);

  const user = useSelector((state) => state.auth.user);

  const [pending_homeworks, setPending_Homeworks] = useState([]);
  const [timeTable, setTimeTable] = useState([]);
  const [pendingHw, setPendingHw] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const getPendingHomeworks = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");

      const response = await axios.get(
        `${API_URL}/homework/student/get-pending-homework?subclass_id=${user.subclass_id}&id=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);

      if (response.data && response.data.pendingHomeworks) {
        setPending_Homeworks(response.data.pendingHomeworks);
      } else {
        Alert.alert("No Homeworks Found", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Internal Server Error");
    }
  };

  const getTimeTable = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");

      const response = await axios.get(
        `${API_URL}/class-timetable/get-timetable?subclass_id=${user.subclass_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      if (response.data && response.data.class_timetable) {
        setTimeTable(response.data.class_timetable);
      } else {
        Alert.alert("Error", "Failed To Retrieve TimeTable");
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

  useEffect(() => {
    if (user && user.subclass_id && user.id) {
      getPendingHomeworks();
      getTimeTable();
    }
  }, [user]);

  useEffect(() => {
    if (isClicked) {
     
        setSelectedComponent({ subitem: { component: <SubmitHomework pendingHw={pendingHw}/> } })
      
        setIsClicked(false);
      }
    
      // setSelectedComponent(studyMaterial[1]);
    
  }, [isClicked]);

  return (
    <ScrollView>
      <View className={`p-2 gap-4`}>
        <CardCoponets name={user ? user.student_name : "Loading..."} />
        <View className="flex-row w-full justify-between">
          <CardCoponets
            name={user ? user.class_name : "Loading..."}
            data="Class"
            className="w-[48%]"
          />
          <CardCoponets
            name={user ? user.division : "Loading..."}
            data="Division"
            className="w-[48%]"
          />
        </View>
        <CardCoponets
          onPress={() => {
            setSelectedComponent(EventsMap[0]);
            // console.log("hi");
          }}
          name="Events"
        />
        <View className="gap-4 ">
          <CardCoponets name="Homeworks" />
          {pending_homeworks && pending_homeworks.length > 0 ? (
            pending_homeworks.map((pHW, index) => (
              <TouchableOpacity
                onPress={() => {
                  setIsClicked(true);
                  setPendingHw(pHW);
                  console.log(pHW);
                }}
                key={index}
                className="bg-white border border-[#305495] rounded-xl p-4 shadow-md"
                style={styles.box}
              >
                <View className="flex-row justify-between mb-1">
                  <Text className="font-medium text-gray-700">Subject:</Text>
                  <Text className="text-gray-600">{pHW.subject}</Text>
                </View>

                <View className="flex-row justify-between mb-1">
                  <Text className="font-medium text-gray-700">Teacher:</Text>
                  <Text className="text-gray-600">{pHW.teacher_Name}</Text>
                </View>

                <View className="flex-row justify-between mb-1">
                  <Text className="font-medium text-gray-700">
                    Description:
                  </Text>
                  <Text className="text-gray-600">{pHW.description}</Text>
                </View>

                <View className="flex-row justify-between mb-1">
                  <Text className="font-medium text-gray-700">Status:</Text>
                  <Text className="text-red-500 font-semibold">
                    {pHW.status === "pending" ? "Pending" : ""}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="font-medium text-gray-700">Last Date:</Text>
                  <Text className="text-gray-600">
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

export default Home;
