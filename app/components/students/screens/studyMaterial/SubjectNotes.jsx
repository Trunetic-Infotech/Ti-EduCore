import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Linking,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL } from '@env';

const SubjectNotes = ({ subject_id, subject_name }) => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  // Filter notes by chapter name for search
  const filteredNotes = notes.filter((note) =>
    note.chapter_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const subjectNotes = async () => {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync('token');
      const response = await axios.get(
        `${API_URL}/class/subject/get-subject-notes?subject_id=${subject_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.notes) {
        setNotes(response.data.notes);
      } else {
        Alert.alert('Error', response.data.message || 'No notes found');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    subjectNotes();
  }, []);

  const renderItem = ({ item }) => (
    <View className="flex-row border-b border-gray-300 py-3 items-center">
      <Text className="flex-[3] px-3 text-[#305495] text-base">{item.chapter_name}</Text>

      <TouchableOpacity
        className="flex-[1] bg-[#f1a621] mx-1 rounded-lg py-2"
        onPress={() => Linking.openURL(item.notes)}
      >
        <Text className="text-white text-center font-semibold">View</Text>
      </TouchableOpacity>

      <Text className="flex-[2] px-3 text-[#305495] text-base text-center">
        {new Date(item.start_date).toLocaleDateString('en-GB')}
      </Text>
      <Text className="flex-[2] px-3 text-[#305495] text-base text-center">
        {new Date(item.end_date).toLocaleDateString('en-GB')}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-4 relative">
      {/* Subject Title */}
      <Text className="text-[#305495] font-bold text-xl mb-4">Subject: {subject_name}</Text>

      {/* Search Bar */}
      <View className="flex-row items-center mb-4 border-2 border-[#305495] rounded-xl overflow-hidden">
        <TextInput
          className="flex-1 px-4 py-2 text-[#305495]"
          placeholder="Search Notes"
          placeholderTextColor="#305495"
          value={searchText}
          onChangeText={setSearchText}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {searchText.length > 0 ? (
          <TouchableOpacity onPress={() => setSearchText('')} className="px-3">
            <Feather name="x" size={24} color="#305495" />
          </TouchableOpacity>
        ) : (
          <View className="px-3">
            <Feather name="search" size={24} color="#305495" />
          </View>
        )}
      </View>

      {/* Table Header */}
      <View className="flex-row bg-[#e3e9f3] border-b-2 border-[#305495] py-2">
        <Text className="flex-[3] px-3 font-bold text-[#305495]">Chapter Name</Text>
        <Text className="flex-[1] px-3 font-bold text-[#305495] text-center">Notes</Text>
        <Text className="flex-[2] px-3 font-bold text-[#305495] text-center">Start Date</Text>
        <Text className="flex-[2] px-3 font-bold text-[#305495] text-center">End Date</Text>
      </View>

      {/* Notes List */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#305495" />
        </View>
      ) : filteredNotes.length === 0 ? (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-[#305495] text-lg">No notes found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          className="max-h-[300px]"
          showsVerticalScrollIndicator={false}
        />
      )}

      
    </View>
  );
};

export default SubjectNotes;
