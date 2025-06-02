import { View, Text, Image, TouchableOpacity, Pressable, Alert, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from '@env';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice";
import { save, getValueFor, deleteValueFor } from '../utils/secureStore';

const Login = () => {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { role } = useLocalSearchParams();
  //  const { Role } = router.params;
  const dispatch = useDispatch();
  const router = useRouter();

  // Load saved credentials on mount
  useEffect(() => {
    const loadSavedCredentials = async () => {
      const savedEmail = await getValueFor('savedEmail');
      const savedPassword = await getValueFor('savedPassword');
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setChecked(true);
      }
    };
    loadSavedCredentials();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/admin/login`,
        { email, password, Role: role },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));

        // Save or delete saved credentials based on checkbox
        if (checked) {
          await save('savedEmail', email);
          await save('savedPassword', password);
        } else {
          await deleteValueFor('savedEmail');
          await deleteValueFor('savedPassword');
        }

        await save('token', JSON.stringify(response.data.token));
        await save('userId', JSON.stringify(response.data.user.id));

        Alert.alert("Login Successful", response.data.message);

        // Navigate based on role
        if (role === "teacher") {
          router.push({ pathname: '/components/teacher/teachersdashboard', params: { role } });
        } else if (role === "student") {
          router.push({ pathname: '/components/students/studentsdashboard', params: { role } });
        } else if (role === "parent") {
          router.push({ pathname: '/components/parents/parentsdashboard', params: { role } });
        } else if (role === "driver") {
        
          router.push({ pathname: '/components/driver/driverdashboard', params: { role } });
        } else {
          Alert.alert("Invalid Data", response.data.message);
        }
      } else {
        Alert.alert("Invalid Credentials", "Incorrect Email or Password");
      }
    } catch (error) {
      Alert.alert("Invalid Credentials", "Incorrect Email or Password");
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View className="h-[100%]">
        <View className="h-[50%] gap-4">
          <Text className="text-center p-2 my-4 font-bold text-xl text-[#305495]">
            Welcome Back !
          </Text>
          <View className="items-center">
            <Image
              className="h-[25vh] w-[60vw]"
              source={require("../assets/images/Logo5.png")}
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="h-[50%] bg-[#f1a621] justify-center items-center gap-4">
          <Text className="text-white text-2xl text-center font-bold">Login</Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            className="bg-gray-100 rounded-xl w-[300px] placeholder:text-center placeholder:font-bold shadow"
            placeholder="Enter Your Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            className="bg-gray-100 rounded-xl w-[300px] placeholder:text-center shadow placeholder:font-bold"
            placeholder="Enter Your Password"
            secureTextEntry={true}
          />

          <View className="flex-row w-[300px] justify-between">
            <View className="flex-row gap-2 items-center">
              <Pressable onPress={() => setChecked(!checked)}>
                {checked ? (
                  <MaterialIcons name="check-box" size={20} color="#305495" />
                ) : (
                  <MaterialIcons name="check-box-outline-blank" size={20} color="#999" />
                )}
              </Pressable>
              <Text className="font-bold">Remember Me</Text>
            </View>
                 <Link
  href={`/forgotpassword?Role=${role}`}
  className="font-bold"
  onClick={() => console.log("Role:", role)}
>
  Forgot Password?
</Link>
          </View>

          <TouchableOpacity onPress={handleLogin} className="my-4">
            <Text className="bg-[#305495] px-5 py-2 text-white text-bold text-xl rounded-md">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
