import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CardCoponets = ({name, className, data}) => {
  return (
    <View className={`bg-[#F5F1F1] border border-[#305495] items-center justify-center p-4  ${className || ''}`} style={styles.box}>
      {data ? <Text className="text-gray-400 text-lg font-bold">{data}</Text> : ""}
              <Text className='text-3xl font-bold'>{name}</Text>
            </View>
  )
}
const styles = StyleSheet.create({
  box: {
    // boxShadow: '0px 8px 6px rgba(48, 84, 149, 0.2)'
    boxShadow: '-6px 10px 15px rgba(48, 84, 149, 0.2),6px 10px 15px rgba(48, 84, 149, 0.2),0px 12px 18px rgba(48, 84, 149, 0.2)'
  },
});

export default CardCoponets