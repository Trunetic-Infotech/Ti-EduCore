import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";
import axios from "axios";
import { ScrollView } from "react-native"; 
import { Linking } from 'react-native';

const Homework = () => {
  const [homeworks, setHomeworks] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const getHomework = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${API_URL}/homework/get-homework/subclass/${user.subclass_id}/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Hello", response.data.HomeworkData);
      if (response.data && response.data.HomeworkData) {
        setHomeworks(response.data.HomeworkData);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Internal Server Error");
    }
  };

  useEffect(() => {
    getHomework();
  }, []);
  return (
    <ScrollView>
      <View className="p-2 gap-2">
        <View className="flex-row items-center justify-center relative">
          <TextInput
            placeholder="Search..."
            className="w-[75%] border border-[#305495] rounded-xl pl-10 pr-4 py-2 text-[16px]"
            style={styles.box}
          />
          {/* Search Icon inside the input on the left */}
          <Feather
            name="search"
            size={20}
            color="gray"
            style={{
              position: "absolute",
              left: "14%",
              zIndex: 1,
            }}
          />
        </View>

        <View>
          {homeworks.length > 0
            ? homeworks.map((hw, index) => (
                <View
                  key={index}
                  className="p-4 m-2 border border-[#305495] rounded-xl"
                >
                  <View className="gap-2">
                    <View className="flex-row gap-3">
                      <Text>Subject Name : </Text>
                      <Text>{hw.subject}</Text>
                    </View>
                    <View className="flex-row gap-3">
                      <Text>Description :</Text>
                      <Text className="w-72 " numberOfLines={2} ellipsizeMode="tail">{hw.description}</Text>
                    </View>
                    <View className="flex-row gap-3">
                      <Text>Assigned Date :</Text>
                      <Text>{hw.upload_date}</Text>
                    </View>
                    <View className="flex-row gap-3">
                      <Text>Last Date :</Text>
                      <Text>{hw.submission_date}</Text>
                    </View>

                    <View className="flex-row justify-between">
                      <TouchableOpacity onPress={()=>{
                        Linking.openURL(`${hw.upload_homeWork}`)
                      }} className="bg-[#305495] p-2 rounded-xl">
                        <Text className='text-white'>View HomeWork</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{
                        if(hw.submission_file !== "Not Submitted"){
                          Linking.openURL(`${hw.submission_file}`)
                        }else{
                          Alert.alert("No Submission Found!", "Homework not submitted");
                        }
                      }} className="bg-[#f1a621] p-2 rounded-xl">
                        <Text>View Submission</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            : <Text>No Homework Assigned</Text>}
        </View>
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

export default Homework;
