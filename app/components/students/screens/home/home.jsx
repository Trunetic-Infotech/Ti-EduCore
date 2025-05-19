import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CardCoponets from '../../../commanComponents/CardCoponets'


const home = () => {
  return (
    <SafeAreaView>
      <View className='p-2 bg-white h-full w-full gap-4'>
        <CardCoponets name="Asad Shaikh"/>
        <View className="flex-row w-[100%] justify-between">
          <CardCoponets name="1" data="Class" className='w-[48%] '/>
          <CardCoponets name='A' data="Division" className='w-[48%]'/>
          
        </View>
        <CardCoponets name="Events"/> 
      </View>
    </SafeAreaView>
  )
}





export default home