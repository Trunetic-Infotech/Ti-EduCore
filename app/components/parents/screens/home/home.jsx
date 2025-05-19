import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";



const home = () => {
  return (
    <View>
      <SafeAreaView>
        <View className='p-4 text-shadow'>
          <Text className="font-bold text-2xl text-center border-2 border-[#305495] bg-gray-200">Ninja Hatori</Text>
        </View>

        <View className="">
          <View className='flex-row justify-between p-4'>
            <View className='font-bold text-3xl p-3 border-2 border-[#305495] bg-gray-200'>
              <Text>Select Student yyyyyy</Text>
              <Text>William Garcia</Text>
            </View>

            <View className='font-bold text-3xl p-3 border-2 border-[#305495] bg-gray-200'>
              <Text>Class</Text>
              <Text>7</Text>
            </View>
          </View>

          <View>
            <View>
              <Text>Division</Text>
              <Text>A</Text>
            </View>

            <View>
              <TouchableOpacity>
                <Text>View Attendence</Text>
              </TouchableOpacity>
            </View>
          </View>

           <View>

               <View>
              <TouchableOpacity>
                <Text>Pay Fees</Text>
              </TouchableOpacity>
            </View>
           

            <View>
              <TouchableOpacity>
                <Text>Events</Text>
              </TouchableOpacity>
            </View>
          </View>


        </View>

        <View className='p-4 text-shadow'>
          <Text className="font-bold text-2xl text-center border-2 border-[#305495] bg-gray-200">Pending HomeWorks</Text>
        </View>


         {/* Form */}
        <View>
           

        </View>
      </SafeAreaView>
    </View>
  );
};

export default home;
