import axios from 'axios';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';
import { API_URL } from '@env';

const AddFeedback = () => {
  const user = useSelector((state)=> state.auth.user);

  const [description, setDescription] = useState("");
  const today = new Date().toISOString().split("T")[0];
      const [date, setDate] = useState(today);


  const addfeedback = async()=>{
    const formData = {
                user_name: user.student_name,
                phone_number: user.phone_number,
                complaint_date: date,
                description,
                admin_id: user.admin_id,
                student_id: user.id,
              };
              console.log("Submitted Data:", formData);
              // You can now send formData to an API or process it further
              try {
                const response  = await axios.post( `${API_URL}/feedback/add`,
                  formData
                )
                if(response.data.success){
                        // console.log(result.data.message);
                        Alert.alert("FeedBack Submitted!",response.data.message);
                      }else{
                        Alert.alert("Error",response.data.message);
                      }
              } catch (error) {
                Alert.alert("Error",error.response?.data?.message || "Something went wrong!");
              }
  }

  return (
    <View className='justify-center h-full p-4'>
          <View className='items-center bg-gray-200 px-2 py-4 rounded-md gap-4 ' style={styles.box}>
            <Text className='text-2xl font-bold'>Add FeedBack</Text>
            <View className='w-full items-center gap-4'>
              <View className='w-[75%] gap-2' >
                <Text className='font-bold'>UserName</Text>
                <TextInput value={user ? user.student_name : "Loading..."} className='p-4 rounded-md border-2 border-[#305495] w-full '></TextInput>
              </View>
              <View className='w-[75%] gap-2'>
                <Text className='font-bold'>Contact No</Text>
                <TextInput value={user ? user.phone_number : "Loading..."} className='p-4 rounded-md border-2 border-[#305495] w-full '></TextInput>
              </View>
              <View className='w-[75%] gap-2'>
                <Text className='font-bold'>Feedback </Text>
                <TextInput onChangeText={(text)=> setDescription(text)} placeholder='Enter Feedback' className='p-4 rounded-md border-2 border-[#305495] w-full '></TextInput>
              </View>
            </View>
    
            <TouchableOpacity onPress={addfeedback} className='bg-[#f1a621] w-[75%] items-center p-2 rounded-md'>
              <Text className='font-bold'>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
  )
}

const styles = StyleSheet.create({
  box: {
    shadowColor: '#305495',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // for Android shadow
  },
});

export default AddFeedback