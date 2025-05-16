import React, { Component } from 'react'
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'

const forgotpassword =() => {

    return (
        <SafeAreaView>
      <View className=" flex h-[100%]">
        <View className="h-[50%] flex justify-between items-center">
            <View className="mt-10 p-8 items-center text-center">
                <Text className="text-lg text-[#305495] font-bold">Welcome back!</Text>
            </View>
        
              <Image source={require('../assets/images/Logo5.png')} className="w-[60vw] h-[25vh]" resizeMode='contain'/>
              <View></View>

        </View>
        <View className="h-[50%] bg-[#f1a621] w-full p-4 flex justify-center">
          <View className="flex items-center text-center justify-center gap-4 ">
            <View>
              <Text className="text-xl font-bold text-shadow-xl p-1 gap-4">Forgot Password</Text>
            </View>
            <View className="flex justify-center items-center gap-3 w-full">
              <TextInput placeholder='Enter Your Email' keyboardType='email-address'
              className="bg-gray-100 border-2 rounded-xl text-sm font-bold p-1 w-[90%] border-[#f5b237] shadow">
              </TextInput>
            </View>
            <View>
              <TouchableOpacity className="bg-[#305495] rounded-md mt-3">
                <Text className="text-md text-white font-bold px-6 py-3 shadow-2xl">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </SafeAreaView>
    )
}

export default forgotpassword
