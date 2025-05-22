import { View, Text, TextInput, TouchableOpacity } from 'react-native'

const AskQuestions = () => {
  return (
    <View className="items-center justify-center  h-full p-3 ">
          <View className="bg-white border-2   border-[#305495] p-4 gap-4">
            <Text className="font-bold text-center text-2xl">Ask Questions</Text>
    
            <View className="flex-row flex-wrap justify-center gap-2 items-center">
              <View className='w-[48%] items-center gap-2'>
                <Text className='font-bold text-gray-600'>Class</Text>
                <TextInput className='border border-[#305495] w-full rounded-md p-4' placeholder='Name' ></TextInput>
              </View>
              <View className='w-[48%] items-center gap-2'>
                <Text className='font-bold text-gray-600'>Division</Text>
                <TextInput className='border border-[#305495] w-full rounded-md p-4' placeholder='ID'></TextInput>
              </View>
              <View className='w-[48%] items-center gap-2'>
                <Text className='font-bold text-gray-600'>Contact No</Text>
                <TextInput className='border border-[#305495] w-full rounded-md p-4' placeholder='Subject'></TextInput>
              </View>
              <View className='w-[48%] items-center gap-2'>
                <Text className='font-bold text-gray-600'>Date</Text>
                <TextInput className='border border-[#305495] w-full rounded-md p-4' placeholder='Homework'></TextInput>
              </View>
              <View className='w-full items-center'>
                <Text className='font-bold text-gray-600'>Question</Text>
                <TextInput className='border border-[#305495] w-full rounded-md p-4' placeholder='Name'></TextInput>
              </View>
            </View>
    
            <TouchableOpacity className="items-center bg-[#f1a621] p-3 rounded-xl">
              <Text className="font-bold">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
  )
}

export default AskQuestions