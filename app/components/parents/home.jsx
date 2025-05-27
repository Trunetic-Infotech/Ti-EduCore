import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import CardCoponets from "../commanComponents/CardCoponets";

const home = ({ students, setStudentId, setTeacher_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState([null]);
   const [pressedItem, setPressedItem] = useState(null);


  const user = useSelector((state) => state.auth.user);


  useEffect(()=>{
    if(students && students.length > 0){
      setSelectedStudent(students[0]);
      setStudentId(students[0].id);
      setTeacher_id(students[0].teacher_id);
    }
  },[students])


  

  return (
    <View>
      <View className="gap-4  flex-row flex-wrap relative">
        <CardCoponets
          name={user ? user.parents_name : "loading"}
          className="w-full"
        />

        <TouchableOpacity>
          <View>
            <View className="   bg-[#F5F1F1]  border border-[#305495] items-center justify-center p-4 rounded-xl w-[180px]   ">
              <Text>Select A Student:</Text>
              <View className="mt-1">
                <TouchableOpacity
                  onPress={() => setIsOpen(!isOpen)}
                  className="flex-row items-center border border-[#305495] rounded-xl p-2 bg-white"
                >
                  <Text className="text-black text-sm font-bold ">
                    {selectedStudent ? selectedStudent.student_name : "--Select A Student--"}
                  </Text>

                  <Feather
                    name="chevron-down"
                    size={20}
                    color="#305495"
                    className="ml-2"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {isOpen ? (
              <View className="absolute top-20 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-md p-4 z-50 w-[200px]">
                {Array.isArray(students) &&
                  students.map((student, index) => (
                    <Pressable
                      key={index}
                      onPress={() => {
                        setSelectedStudent(student);
                        setStudentId(student.id);
                        setIsOpen(false);
                      }}
                      onPressIn={() => setPressedItem(index)}
                      onPressOut={() => setPressedItem(null)}
                      className={`p-2 rounded-lg ${
                        pressedItem === index ? "bg-blue-200" : "bg-white"
                      }`}
                    >
                      <Text className="text-black">{student.student_name}</Text>
                    </Pressable>
                  ))}
              </View>
            ) : (
              ""
            )}
          </View>
        </TouchableOpacity>

        <CardCoponets name={selectedStudent.class_name} data="Class" className="w-[48%]  " />
        <CardCoponets name={selectedStudent.division} data="Class" className="w-[48%] z-[-1] " />

        <CardCoponets name="View Attendance" className="w-[48%]  z-[-1]" />

        <CardCoponets name="Pay Fees" className="w-[48%] z-[-1]" />
        <CardCoponets name="Events" className="w-[48%] z-[-1]" />
        <CardCoponets name="Pending Homeworks" className="w-full" />
      </View>

      {/* Form */}
      <View></View>
    </View>
  );
};

export default home;
