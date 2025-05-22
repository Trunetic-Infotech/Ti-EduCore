import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

const Homework = () => {
  return (
    <View className="p-2 gap-2">
      <View className="flex-row items-center justify-center relative">
        <TextInput
          placeholder="Search..."
          className="w-[75%] border border-[#305495] rounded-xl pl-10 pr-4 py-2 text-[16px]"
          style={styles.box}
        />
        {/* Search Icon inside the input on the left */}
        <Feather
          name="search"
          size={20}
          color="gray"
          style={{
            position: 'absolute',
            left: '14%',
            zIndex: 1,
          }}
        />
      </View>

      <View className="p-4 m-2 border border-[#305495] rounded-xl">
        <View className="gap-2">
            <View className='flex-row gap-3'>
              <Text>Subject Name : </Text>
              <Text>Mathematics</Text>
            </View>
            <View className='flex-row gap-3'>
              <Text>Description :</Text>
              <Text>Write tables from 1 to 10</Text>
            </View>
            <View className='flex-row gap-3'>
              <Text>Assigned Date :</Text>
              <Text>25/03/2025</Text>
            </View>
            <View className='flex-row gap-3'>
              <Text>Last Date :</Text>
              <Text>25/03/2025</Text>
            </View>

            <View className="flex-row justify-between">
              <TouchableOpacity className='bg-[#f1a621] p-2 rounded-xl' >
                <Text>View HomeWork</Text>
              </TouchableOpacity>
              <TouchableOpacity className='bg-[#f1a621] p-2 rounded-xl'>
                <Text>View Submission</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    // boxShadow: '0px 8px 6px rgba(48, 84, 149, 0.2)'
    boxShadow: '-6px 10px 15px rgba(48, 84, 149, 0.2),6px 10px 15px rgba(48, 84, 149, 0.2),0px 12px 18px rgba(48, 84, 149, 0.2)'
  },
});

export default Homework