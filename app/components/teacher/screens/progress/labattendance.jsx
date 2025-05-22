import { View, Text,ScrollView,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'



const students = [
  { id: '1', name: 'Asad Shaikh', class: '1', division: 'A', phone: '9876543210', email: 'asad@example.com' },
  { id: '2', name: 'Pooja Verma', class: '2', division: 'B', phone: '9123456789', email: 'pooja@example.com' },
  { id: '3', name: 'Rahul Kumar', class: '3', division: 'C', phone: '9988776655', email: 'rahul@example.com' },
  { id: '4', name: 'Sneha Patil', class: '4', division: 'A', phone: '9871234560', email: 'sneha@example.com' },
  { id: '5', name: 'Anjali Singh', class: '5', division: 'B', phone: '9123987654', email: 'anjali@example.com' },
  { id: '6', name: 'Rohit Sharma', class: '6', division: 'C', phone: '9012345678', email: 'rohit@example.com' },
];
const labattendance = () => {
    const [attendance, setAttendance] = useState({});

      const markAttendance = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  return (
      <ScrollView className="flex-1 bg-gray-100 p-4">
         {students.map((item) => (
           <View
             key={item.id}
             className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-200"
           >
             <Text className="text-lg font-bold text-[#305495] mb-1">{item.name}</Text>
             <Text className="text-sm text-gray-700">Class: {item.class}</Text>
             <Text className="text-sm text-gray-700">Division: {item.division}</Text>
             <Text className="text-sm text-gray-700">Phone: {item.phone}</Text>
             <Text className="text-sm text-gray-700 mb-3">Email: {item.email}</Text>
   
             <View className="flex-row justify-between">
              <View className="justify-center ">

               <TouchableOpacity
                 className="bg-[#305495] p-4 rounded-md text-center ">
                 <Text className="text-white font-semibold text-sm">Attendance</Text>
               </TouchableOpacity>
                   </View>

              <View className="gap-2">
                  <TouchableOpacity
              className={`px-4 py-2 rounded-full ${
                attendance[item.id] === 'present' ? 'bg-green-600' : 'bg-gray-300'
              }`}
              onPress={() => markAttendance(item.id, 'present')}
            >
              <Text className="text-white font-semibold text-sm">Present</Text>
            </TouchableOpacity>
   
               <TouchableOpacity
              className={`px-4 py-2 rounded-full ${
                attendance[item.id] === 'absent' ? 'bg-red-600' : 'bg-gray-300'
              }`}
              onPress={() => markAttendance(item.id, 'absent')}
            >
              <Text className="text-white font-semibold text-sm">Absent</Text>
            </TouchableOpacity>
                 </View>
             </View>
           </View>
         ))}
       </ScrollView>
  )
}


export default labattendance