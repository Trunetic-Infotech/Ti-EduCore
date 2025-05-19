import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Header = ({ title, onMenuPress }) => {
  return (
    <View className="flex-row items-center justify-between bg-[#305495] p-5 shadow-md">
      {/* Menu on the left */}
      <TouchableOpacity onPress={onMenuPress}>
        <AntDesign name="menu-fold" size={24} color="white" />
      </TouchableOpacity>

      {/* Title on the right */}
      <Text className="text-2xl font-bold text-white text-center flex-1">
        {title}
      </Text>
    </View>
  );
};

export default Header;
