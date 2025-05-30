// backgroundLocationTask.js
import * as TaskManager from 'expo-task-manager';
import { sendLocationToServer } from './locationService'; // Adjust the import as needed
import * as SecureStore from 'expo-secure-store';

export const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('Background location task error:', error);
    return;
  }

  if (data) {
    const { locations } = data;
    const latestLocation = locations[locations.length - 1];
    console.log('Background location received:', latestLocation);

    try {
      // Get user from SecureStore
      const storedUser = await SecureStore.getItemAsync('user');
      const user = JSON.parse(storedUser);

      if (!user) {
        console.warn('No user data found in SecureStore.');
        return;
      }

      // Pass user to the function
      await sendLocationToServer(
        latestLocation.coords.latitude,
        latestLocation.coords.longitude,
        user
      );
    } catch (err) {
      console.error('Error retrieving user or sending location:', err);
    }
  }
});
