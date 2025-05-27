import React, { useState, useEffect } from 'react';
import { 
  Alert, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Linking,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { API_URL } from '@env';
import { Feather } from '@expo/vector-icons';

const ViewVideoLectures = ({ subject_id, subject_name }) => {
  const [videoLectures, setVideoLectures] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const getVideoLectures = async () => {
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${API_URL}/students/video/lectures/get-subject-video-lecture/${subject_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setVideoLectures(response.data.data);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  useEffect(() => {
    getVideoLectures();
  }, []);

  // Filter by title or description
  const filteredLectures = videoLectures.filter((lecture) =>
    lecture.title.toLowerCase().includes(searchText.toLowerCase()) ||
    lecture.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow">
      <Text className="text-[#305495] font-bold text-lg mb-1">{item.title}</Text>
      <Text className="text-[#305495] mb-2">{item.description}</Text>
      <View className="flex-row justify-between items-center">
        <Text className="text-[#305495]">Duration: {item.duration}</Text>
        <Text className="text-[#305495]">
          Leacture Date: {new Date(item.upload_date).toLocaleDateString('en-GB')}
        </Text>
      </View>
      <TouchableOpacity
        className="mt-3 bg-[#f1a621] rounded-lg py-2"
        onPress={() => Linking.openURL(item.video_file_path)}
      >
        <Text className="text-center text-white font-semibold">Watch</Text>
      </TouchableOpacity>
    </View>
  );

  return (
  
    <View className="flex-1 p-4 bg-white relative">
      {/* Subject name */}
      <Text className="text-[#305495] font-bold text-xl mb-4">Subject: {subject_name}</Text>

      {/* Search bar */}
      <View className="flex-row items-center gap-3 mb-6 border-2 border-[#305495] rounded-xl px-3 py-2">
        <Feather name="search" size={20} color="#305495" />
        <TextInput
          className="flex-1 text-[#305495]"
          placeholder="Search Video Lectures"
          placeholderTextColor="#305495"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Loading indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#305495" className="mt-10" />
      ) : filteredLectures.length === 0 ? (
        <Text className="text-center text-[#305495] mt-10">No lectures found</Text>
      ) : (
        <FlatList
          data={filteredLectures}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      
    </View>
  );
};

export default ViewVideoLectures;
