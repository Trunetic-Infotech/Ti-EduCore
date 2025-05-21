import { View, Text, ScrollView } from "react-native";
import CardCoponets from "../commanComponents/CardCoponets";

const home = () => {

  return (
    <ScrollView>
      <View className="w-full gap-4">
        <CardCoponets name="Pooja" />

        {/* Wrap grid */}
        <View className="flex-row flex-wrap justify-between mt-4 gap-2">
          <CardCoponets name="1" data="Class" className="w-[48%]" />
          <CardCoponets name="A" data="Division" className="w-[48%]" />
          <CardCoponets name="8" data="Total Students" className="w-[48%]" />
          <CardCoponets name="Take Attendance" className="w-[48%]" />
          <CardCoponets name="Students List" className="w-[48%]" />
          <CardCoponets name="Events" className="w-[48%]" />
          <CardCoponets name="Results" className="w-[48%]" />
          <CardCoponets name="Request Leave" className="w-[48%]" />
        </View>

        {/* Extra cards */}
        <CardCoponets name="Add Complaint" />
        <CardCoponets name="HomeWorks" />

        {/* Text Message */}
        <View className="mt-4">
          <Text className="text-lg text-[#305495] font-bold">
            No Homework Available
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default home;
