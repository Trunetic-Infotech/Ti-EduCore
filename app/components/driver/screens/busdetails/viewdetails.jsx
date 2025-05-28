import React, { Component, useEffect, useState } from 'react'
import { Alert, FlatList, Image, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store'
import axios from "axios";
import { API_URL } from '@env';

const viewdetails=()=> {
  const user=useSelector((state)=>state.auth.user);
  const[bus,setBus]=useState([]);



  const getBusdetail = async()=>{
      try {
        
        const token =SecureStore.getItemAsync("token");

        const response = await axios.get(`${API_URL}/vehnical/get-vehicle/drivers/${user.id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        console.log(response.data.data);
        if(response.data && response.data.data){
          setBus(response.data.data);
        }else{
          Alert.alert("error",response.data.message);
        }
        
      } catch (error) {
        console.log(error);
         Alert.alert(error.response?.data?.message || "Something went wrong!");
        
      }
    }

  useEffect(()=>{
       if(user && user.id){
        getBusdetail();
      }
  },[])


      const details = [
    {
      label: "Driver Name",
      value: user? user.derivers_name:"loading",
    },
      {
      label: "Vehicle Number",
      value: bus?bus.bus_number:"loading",
    },
     {
      label: "Model Year",
      value: bus?bus.model_year:"loading",
    },
    {
      label: "RC Number",
      value: bus?bus.rc_number:"loading",
    },
    {
      label: "Bus Color",
      value: bus?bus.bus_color:"loading"
    },
  ]

    return (
     <FlatList
           data={details}
           keyExtractor={(item, index) => index.toString()}
           numColumns={2}
           ListHeaderComponent={
             <View className='p-2'>
               <View className='items-center m-2'>
                 <Text className="text-2xl font-bold text-[#305495]">Bus Details</Text>
               </View>
     
               <View className='items-center gap-2 mb-4'>
                 <Text className='font-bold'>Bus Picture</Text>
                 <Image
                   className='rounded-full h-[200px] w-[200px]'
                   source={require("../../../../../assets/images/profile.jpg")}
                 />
               </View>
             </View>
           }
           renderItem={({ item }) => (
             <View className='gap-2' style={{ flex: 1, margin: 8 }}>
               <Text className='text-center text-gray-500'>{item.label}</Text>
               <Text className='text-center font-bold'>{item.value}</Text>
             </View>
           )}
           contentContainerStyle={{ paddingBottom: 20 }} // for spacing at the bottom
      showsVerticalScrollIndicator={false}
          
         />
    )
  }


export default viewdetails
