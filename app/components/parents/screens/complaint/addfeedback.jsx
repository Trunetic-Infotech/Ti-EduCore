import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import {API_URL} from '@env'
import axios from "axios";
import { useSelector } from "react-redux";


const addfeedback = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription]=useState("")

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };


  const user=useSelector((state) => state.auth.user)
       const handleSubmit = async(e) => {

             const formatted =date.toISOString().slice(0,19).replace('T', ' ');

              const formData = {
                user_name: user.parents_name,
                phone_number: user.phone_number,
                complaint_date:formatted,
                description,
                admin_id: user.admin_id,
                parent_id: user.id,
              };
              console.log("Submitted Data:", formData);
              // You can now send formData to an API or process it further
              try {
                const response  = await axios.post( `${API_URL}/feedback/add`,
                  formData
                )
                if(response.data.success){
                        // console.log(result.data.message);
                        Alert.alert(response.data.message);
                      }else{
                        Alert.alert(response.data.message);
                      }
              } catch (error) {
                Alert.alert(error.response?.data?.message || "Something went wrong!");
              }
            };



  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-white border-2 border-[#305495] rounded-2xl p-5 space-y-5 shadow-md">
        <Text className="text-center text-2xl font-bold text-[#305495]">
          Add FeedBack
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="font-semibold text-gray-700 mb-1">User Name</Text>
            <TextInput

            value={user ? user.parents_name : "loading"}
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Class Name"
            />
          </View>

          <View>
            <Text className="font-semibold text-gray-700 mb-1">
              Contact No
            </Text>
            <TextInput

            value={user ? user.phone_number : "loading"}
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Teacher Name"
            />
          </View>

       

          <View>
            <Text className="font-semibold text-gray-700 mb-1">Date</Text>
            <TouchableOpacity
              // onPress={() => setShowPicker(true)}
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
            onChangeText={setDescription}
              className="border border-[#305495] rounded-lg p-3 bg-white"
              placeholder="Enter Description"
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




export default addfeedback;