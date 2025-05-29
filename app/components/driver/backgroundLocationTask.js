// backgroundLocationTask.js
import * as TaskManager from 'expo-task-manager';
import { sendLocationToServer } from './locationService.js'; // adjust import


export const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error('Background location task error:', error);
    return;
  }
  if (data) {
    const { locations } = data;
    const latestLocation = locations[locations.length - 1];
    console.log('Background location received:', latestLocation);

    sendLocationToServer(
      latestLocation.coords.latitude,
      latestLocation.coords.longitude
    );
  }
});
