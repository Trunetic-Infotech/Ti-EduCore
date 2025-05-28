import { View, Text, Image, FlatList, ScrollView } from "react-native";
import React, { use } from "react";
import { useSelector } from "react-redux";
import defaultProfile from "../../../../../assets/images/profile.jpg";
const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const data = [
    {
      label: "Teacher Id",
      value: user ? user.teacher_id : "Loading...",
    },
    {
      label: "Teacher Name",
      value: user ? user.teacher_Name : "Loading...",
    },
    {
      label: "Contact No.",
      value: user ? user.phone_number : "Loading...",
    },
    {
      label: "Email ID",
      value: user ? user.email : "Loading...",
    },
    {
      label: "Paid Leave",
      value: user ? user.paid_leaves : "Loading...",
    },
    {
      label: "Pan card",
      value: user ? user.pan_card : "Loading...",
    },
    {
      label: "Aadhar Card Number",
      value: user ? user.aadhaar_number : "Loading...",
    },
    {
      label: "Date Of Joining",
      value: user?.date_of_join
        ? new Date(user.date_of_join).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "Loading...",
    },
    {
      label: "Subject Teacher",
      value: user ? user.subject : "Loading...",
    },
    {
      label: "Salary",
      value: user ? user.salary : "Loading...",
    },
    {
      label: " Experiance",
      value: user ? user.experience : "Loading...",
    },
    {
      label: "Experiance Letter",
      value: user
        ? user.experience_letter
          ? "Provided"
          : "Not Provided"
        : "N/A",
    },
    {
      label: "Address",
      value: user ? user.address : "Loading...",
    },
    {
      label: "Role",
      value: user ? (user.Role ? user.Role : "Teacher ") : "Loading...",
    },
    {
      label: "Status",
      value: user ? (user.status ? "Active" : "Inactive") : "Loading...",
    },
  ];

  // console.log(data);

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      ListHeaderComponent={
        <View className="p-2">
          <View className="items-center m-2">
            <Text className="text-2xl font-bold text-[#305495]">
              Teacher Profile
            </Text>
          </View>

          <View className="items-center gap-2 mb-4">
            <Text className="font-bold">Profile Picture</Text>
            <Image
              className="rounded-full h-[200px] w-[200px]"
              source={user.images ? { uri: user.images } : defaultProfile}
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
      contentContainerStyle={{ paddingBottom: 20 }} // for spacing at the bottom
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Profile;
