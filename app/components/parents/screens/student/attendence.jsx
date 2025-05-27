import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const attendence = () => {
  return (
    <View>
      <SafeAreaView>
      <View className='items-center gap-8'>
        <Text className="text-[#305495] text-2xl text-center font-bold text-shadow">
          Student Attendance
        </Text>
        
        <View className='w-[90vw] h-[10vh] bg-gray-300 rounded-xl p-6 flex-row gap-6'>
            <FontAwesome5 name="user-graduate" size={24} color="#305495" className='my-4'/>
         <View>
           <Text className='text-gray-700 text-xl'>Student Name</Text>
          <Text className='text-2xl font-bold'>Amar Kalel</Text>
         </View>
       
        </View>

        <View className='w-[90vw] h-[10vh] bg-gray-300 rounded-xl p-6 flex-row gap-6'>
            <FontAwesome5 name="chalkboard-teacher" size={24} color="#305495" className='my-4'/>
         <View>
           <Text className='text-gray-700 text-xl'>Class </Text>
          <Text className='text-2xl font-bold'>7</Text>
         </View>
       
        </View>

        <View className='w-[90vw] h-[10vh] bg-gray-300 rounded-xl p-6 flex-row gap-6'>
            <Ionicons name="layers-sharp" size={24} color="#305495" className='my-4'/>
         <View>
           <Text className='text-gray-700 text-xl'>Division</Text>
          <Text className='text-2xl font-bold'>B</Text>
         </View>
       
        </View>


        <View className="bg-white rounded-xl shadow-md p-4 space-y-3 w-[80vw]">
                
        
          <View className="flex-row justify-between">
                  <Text className="text-gray-500 font-medium"> Name</Text>
                  <Text className="font-semibold text-gray-800">Asad Shaikh</Text>
            </View>

                
           <View className="flex-row justify-between">
                  <Text className="text-gray-500 font-medium"> Date</Text>
                  <Text className="font-semibold text-gray-800">22/05/2025</Text>
            </View>
        
          <View className="flex-row justify-between">
                  <Text className="text-gray-500 font-medium">Day</Text>
                  <Text className="font-semibold text-gray-800">Monday</Text>
            </View>
        
          <View className="flex-row justify-between">
                  <Text className="text-gray-500 font-medium">Status</Text>
                  <Text className="font-semibold text-gray-800">Present</Text>
          </View>
        
        </View>
        


      </View>
      </SafeAreaView>
  
    </View>
  )
}

export default attendence