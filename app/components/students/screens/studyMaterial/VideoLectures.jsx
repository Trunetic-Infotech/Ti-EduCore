import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

const VideoLectures = () => {
  return (
    <View className='p-2 gap-4'>
          <Text className='text-center font-bold text-3xl text-[#305495]'>Subjects</Text>
          <TouchableOpacity className='p-2 py-4 border border-[#305495] flex-row items-center justify-center gap-4'>
            <Text className='text-center font-bold text-2xl'>Mathematics</Text>
            <Feather name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className='p-2 py-4 border border-[#305495] flex-row items-center justify-center gap-4'>
            <Text className='text-center font-bold text-2xl'>English</Text>
            <Feather name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className='p-2 py-4 border border-[#305495] flex-row items-center justify-center gap-4'>
            <Text className='text-center font-bold text-2xl'>Marathi</Text>
            <Feather name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
  )
}

export default VideoLectures