// utils/secureStore.ts
import * as SecureStore from 'expo-secure-store';

export async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  return await SecureStore.getItemAsync(key);
}

export async function deleteValueFor(key: string) {
  await SecureStore.deleteItemAsync(key);
}
