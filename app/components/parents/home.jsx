import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardCoponets from "../commanComponents/CardCoponets";

const home = () => {
  return (
    <View>
      <SafeAreaView>
        <View className=" gap-8">
          <CardCoponets name="Ninja Hattori" />
          <View className="flex-row justify-between">
            <CardCoponets
              name="Amar Kalel"
              data="Select Student"
              className="w-[48%] "
            />
            <CardCoponets name="7" data="Class" className="w-[48%]" />
          </View>

          <View className="gap-8">
            <View className="flex-row justify-between">
              <CardCoponets name="7" data="Class" className="w-[48%]" />

              <CardCoponets name="View Attendance" className="w-[48%] " />
            </View>

            <View className="gap-8">
              <View className="flex-row justify-between">
                <CardCoponets
                  name="Amar Kalel"
                  data="Select Student"
                  className="w-[48%] "
                />
                <CardCoponets name="7" data="Class" className="w-[48%]" />
              </View>
            </View>

            <CardCoponets name="Pending Homeworks" />
          </View>
        </View>

        {/* Form */}
        <View></View>
      </SafeAreaView>
    </View>
  );
};

export default home;
