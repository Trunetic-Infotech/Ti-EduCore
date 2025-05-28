import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import defaultProfile from "../../../../../assets/images/profile.jpg";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "@env";


const StudentProfile = ({student_id}) => {

  
  const [details, setDetails] = useState(null);

  const fetchUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");

      const response = await axios.get(`${API_URL}/student/profile/${student_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setDetails(response.data.user);
      } else {
        Alert.alert("No user Found", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Internal Server Error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const data = [
    { label: "Student Roll No", value: details?.roll_number || "Loading..." },
    { label: "Student Name", value: details?.student_name || "Loading..." },
    { label: "Contact No.", value: details?.phone_number || "Loading..." },
    { label: "GR No", value: details?.admission_id || "Loading..." },
    { label: "Email ID", value: details?.email || "Loading..." },
    {
      label: "Date Of Birth",
      value: details?.date_of_birth
        ? new Date(details.date_of_birth).toLocaleDateString("en-GB")
        : "Loading...",
    },
    {
      label: "Leaving Certificate",
      value: details?.leaving_certificate || "Not Available",
    },
    {
      label: "Aadhar Card Number",
      value: details?.aadhar_card_number || "Not Available",
    },
    {
      label: "Admission Date",
      value: details?.admission_date
        ? new Date(details.admission_date).toLocaleDateString("en-GB")
        : "Loading...",
    },
    { label: "Current Class", value: details?.class_name || "Loading..." },
    { label: "Sub Class", value: details?.division || "Loading..." },
    { label: "Status", value: details?.status || "Loading..." },
    { label: "Address", value: details?.address || "Loading..." },
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      ListHeaderComponent={
        <View className="p-2">
          <View className="items-center m-2">
            <Text className="text-2xl font-bold text-[#305495]">
              Student Profile
            </Text>
          </View>

          <View className="items-center gap-2 mb-4">
            <Text className="font-bold">Profile Picture</Text>
            <Image
              className="rounded-full h-[200px] w-[200px]"
              source={
                details?.images
                  ? { uri: details.images }
                  : defaultProfile}
                  
            />
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <View className="gap-2" style={{ flex: 1, margin: 8 }}>
          <Text className="text-center text-gray-500">{item.label}</Text>
          <Text className="text-center font-bold">{item.value}</Text>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default StudentProfile;
