import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const CardCoponets = ({ name, className, data }) => {
  return (
    <View
      className={`bg-[#F5F1F1] border border-[#305495] items-center justify-center p-4 rounded-xl ${className || ''}`}
      style={[styles.box, { minHeight: 90 }]}
    >
      {data ? (
        <Text className="text-gray-400 text-lg font-semibold text-center">
          {data}
        </Text>
      ) : null}
      <Text className="text-xl font-bold text-center">{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    shadowColor: '#305495',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // for Android shadow
  },
});

export default CardCoponets;
