import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const AddComplaints = () => {
  return (
    <View className='justify-center h-full p-4'>
      <View className='items-center bg-gray-200 px-2 py-4 rounded-md gap-4 ' style={styles.box}>
        <Text className='text-2xl font-bold'>Add Complaints</Text>
        <View className='w-full items-center gap-4'>
          <View className='w-[75%] gap-2' >
            <Text className='font-bold'>UserName</Text>
            <TextInput placeholder='Enter your Name' className='p-4 rounded-md border-2 border-[#305495] w-full '></TextInput>
          </View>
          <View className='w-[75%] gap-2'>
            <Text className='font-bold'>Contact No</Text>
            <TextInput placeholder='Enter your Name' className='p-4 rounded-md border-2 border-[#305495] w-full '></TextInput>
          </View>
          <View className='w-[75%] gap-2'>
            <Text className='font-bold'>Description </Text>
            <TextInput placeholder='Enter your Name' className='p-4 rounded-md border-2 border-[#305495] w-full '></TextInput>
          </View>
        </View>

        <TouchableOpacity className='bg-[#f1a621] w-[75%] items-center p-2 rounded-md'>
          <Text className='font-bold'>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    shadowColor: '#305495',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // for Android shadow
  },
});

export default AddComplaints