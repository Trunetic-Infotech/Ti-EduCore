import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CardCoponets from '../../../commanComponents/CardCoponets'
import { useRouter } from 'expo-router';

const Home = () => {
    const router = useRouter();
  return (
    <View className={`p-2 gap-4`}>
      <CardCoponets  name="Asad Shaikh"/>
      <View className="flex-row w-full justify-between">
        <CardCoponets name="1" data="Class" className='w-[48%]'/>
        <CardCoponets name="A" data="Division" className='w-[48%]'/>
      </View>
      <CardCoponets name="Events"/>
      <View className="gap-4" >
        <CardCoponets name="Homeworks"/>
        <View className="gap-2 p-2 border border-[#305495]" style={styles.box}>
            <View className="flex-row">
                <Text>Subject:</Text>
                <Text>Marathi</Text>
            </View>
            <View className="flex-row">
                <Text>Teacher:</Text>
                <Text>Pooja</Text>
            </View>
            <View className="flex-row">
                <Text>Description</Text>
                <Text>Test Homework</Text>
            </View>
            <View className="flex-row">
                <Text>Status</Text>
                <Text>Pending</Text>
            </View>
            <View className="flex-row">
                <Text>Last Date:</Text>
                <Text>23/05/2025</Text>
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

export default Home