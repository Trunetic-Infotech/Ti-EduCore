import { API_URL } from '@env';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from "react-redux";



const addComplaints = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [contactNo, setContactNo] = useState(user.phone_number);
  const today = new Date().toISOString().split("T")[0];

  const [description, setDescription] = useState("");
  const [userName, setUserName] = useState(user.teacher_Name);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };


  const handleSubmit = async (e) => {
    const formData = {
      user_name: userName,
      phone_number: contactNo,
      complaint_date: date.toISOString().split("T")[0],
      description,
      admin_id: user.admin_id,
      teacher_id: user.id,
    };
    console.log("Submitted Data:", formData);
    // You can now send formData to an API or process it further
    try {
      const response = await axios.post(`${API_URL}/complaint/add`,
        formData
      )
      if (response.data.success) {
        // console.log(result.data.message);
        Alert.alert("Success", response.data.message);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong!");
    }
  };




  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-white border-2 border-[#305495] rounded-2xl p-5 space-y-5 shadow-md">
        <Text className="text-center text-2xl font-bold text-[#305495]">
          Complaints Form
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="font-semibold text-gray-700 mb-1">Username</Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter  Username"
              value={userName}
              onChangeText={setUserName}
            />
          </View>

          <View>
            <Text className="font-semibold text-gray-700 mb-1">
              Contact
            </Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Contact No"
              value={contactNo}
              onChangeText={setContactNo}
            />
          </View>


          <View>
            <Text className="font-semibold text-gray-700 mb-1">Date</Text>
            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              className="border border-[#305495] rounded-lg p-3 bg-gray-50"
            >
              <Text className="text-gray-700">{date.toDateString()}</Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </View>

          <View>
            <Text className="font-semibold text-gray-700 mb-1">
              Description
            </Text>
            <TextInput
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={{ minHeight: 100, textAlignVertical: "top" }}
            />
          </View>
        </View>

        <TouchableOpacity onPress={handleSubmit} className="bg-[#305495] rounded-xl py-3 mt-3 items-center">
          <Text className="text-white font-bold text-lg">Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default addComplaints