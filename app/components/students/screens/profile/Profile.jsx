import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import defaultProfile from "../../../../../assets/images/profile.jpg";
import Icon from "react-native-vector-icons/Ionicons";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const data = [
    {
      label: "Student Roll No",
      value: user ? user.roll_number : "Loading...",
    },
    {
      label: "Student Name",
      value: user ? user.student_name : "Loading...",
    },
    {
      label: "Contact No.",
      value: user ? user.phone_number : "Loading...",
    },
    {
      label: "GR No",
      value: user ? user.admission_id : "Loading...",
    },
    {
      label: "Email ID",
      value: user ? user.email : "Loading...",
    },
    {
      label: "Date Of Birth",
      value: user ? user.date_of_birth : "Loading...",
    },
    {
      label: "Leaving Certificate",
      value: "Data",
    },
    {
      label: "Aadhar Card Number",
      value: user.date_of_birth
        ? new Date(user.date_of_birth).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "Loading...",
    },
    {
      label: "Admission Date",
      value: user.admission_date
        ? new Date(user.admission_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "Loading...",
    },
    {
      label: "Current Class",
      value: user ? user.class_name : "Loading...",
    },
    {
      label: "Sub Class",
      value: user ? user.division : "Loading...",
    },
    {
      label: "Status",
      value: user ? user.status : "Loading...",
    },
    {
      label: "Address",
      value: user ? user.address : "Loading...",
    },
  ];

  // console.log(user.images);
  // console.log(user);


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

          <View className="items-center gap-2 mb-4 relative">
            <Text className="font-bold">Profile Picture</Text>
            <Image
              className="rounded-full h-[200px] w-[200px]"
              source={user.images ? { uri: user.images } : defaultProfile}
            />
            <TouchableOpacity className="absolute bottom-[-4] right-[30%]">
            
                <Icon name="add-circle" size={56} color="black" />
              
            </TouchableOpacity>
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
