import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from "@env";


export const sendLocationToServer = async (latitude, longitude) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.post(
        `${API_URL}/location/set-drivers-location/${user.id}`,
        {
          latitude,
          longitude,
          admin_id: user.admin_id,
          phone_number: user.phone_number,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      if (response.data.success) {
        // Alert.alert("Success", response.data.message);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong!"
      );
    }
  };