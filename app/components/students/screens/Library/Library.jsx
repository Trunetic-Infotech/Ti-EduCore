import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL } from '@env';

const Library = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const getBorrowedBooks = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const response = await axios.get(`${API_URL}/borrowedbooks/get/books/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.data) {
        setBorrowedBooks(response.data.data);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to fetch borrowed books.');
    }
  };

  useEffect(() => {
    getBorrowedBooks();
  }, []);

  const renderItem = ({ item }) => (
    <View className="bg-white rounded-lg shadow-md p-4 mb-3">
      <Text className="text-lg font-semibold text-blue-800">{item.title}</Text>
      <Text className="text-sm text-gray-600">Subject: {item.name}</Text>
      <Text className="text-sm text-gray-600">Student: {item.student_name}</Text>
      <Text className="text-sm text-gray-600">Borrowed: {new Date(item.borrow_date).toLocaleDateString()}</Text>
      <Text className="text-sm text-gray-600">Due: {new Date(item.due_date).toLocaleDateString()}</Text>
      <Text className="text-sm text-gray-600">Status: {item.status}</Text>
      <Text className="text-sm text-gray-600">Fine: ₹{item.fine_amount}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4 text-center text-gray-800">Library</Text>
      {borrowedBooks.length === 0 ? (
        <Text className="text-center text-gray-500">No borrowed books found.</Text>
      ) : (
        <FlatList
          data={borrowedBooks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Library;
