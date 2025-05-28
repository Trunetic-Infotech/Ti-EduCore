import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import defaultProfile from "../../../../../assets/images/profile.jpg";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from 'expo-secure-store'
import axios from "axios";
import { API_URL } from '@env';

const Profile = ({fetchUser}) => {
  const user = useSelector((state) => state.auth.user);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);


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

  const openImagePicker = async () => {
  try {
    console.log("Hiiii");

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("Permission result:", permission);

    if (permission.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ still valid for now
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Image Picker result:", result);

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log("Selected image URI:", uri);
      setSelectedImage(uri);
    }
  } catch (error) {
    console.error("Image Picker error:", error);
    alert("Something went wrong while selecting an image.");
  }
};


  const pictureUpload = async () => {
  const filename = selectedImage.split('/').pop();
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image`;

  const formData = new FormData();
  formData.append("images", {
    uri: selectedImage,
    name: filename,
    type: type,
  });

  try {
     setUploading(true);
    const token = await SecureStore.getItemAsync("token");

    const response = await axios.patch(`${API_URL}/student/upload/images/${user.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        console.log(`⬆ Upload Progress: ${Math.round((progressEvent.loaded * 100) / progressEvent.total)}%`);
      },
    });

    if (response.data.success) {
      Alert.alert("Upload Successful!", response.data.message);
      fetchUser();
    } else {
      Alert.alert("Error", response.data.message);
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Internal Server Error");
  }
  finally {
    setUploading(false); 
  }
};


  useEffect(()=>{
    pictureUpload();
  },[selectedImage])

  // console.log(user.images);
  // console.log(user);

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      ListHeaderComponent={
        <View className="p-2">
          <View className="items-center m-2 relative">
            
            <Text className="text-2xl font-bold text-[#305495]">
              Student Profile
            </Text>

            <TouchableOpacity className='bg-[#305495] rounded-md p-2 absolute right-0'>
              <Text className='text-white font-bold'>Edit</Text>
            </TouchableOpacity>
          </View>

          <View className="items-center gap-2 mb-4 relative">
            <Text className="font-bold">Profile Picture</Text>
             {uploading ? (
    <View className="h-[200px] w-[200px] rounded-full justify-center items-center bg-gray-200">
      <ActivityIndicator size="large" color="#305495" />
    </View>
  ) : (
    <>
      <Image
        className="rounded-full h-[200px] w-[200px]"
        source={user.images ? { uri: user.images } : defaultProfile}
      />
      <TouchableOpacity
        onPress={openImagePicker}
        className="absolute bottom-[-4] right-[30%]"
      >
        <Icon name="add-circle" size={56} color="black" />
      </TouchableOpacity>
    </>
  )}
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
