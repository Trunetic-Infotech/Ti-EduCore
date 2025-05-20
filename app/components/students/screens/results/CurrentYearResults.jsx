import { Text, TextInput, View } from 'react-native'
import { Feather } from '@expo/vector-icons';

const CurrentYearResults = () => {
  return (
    <View className='p-2'>
      <View className=' items-center justify-center relative'>
        <TextInput className='p-2 pl-10 border border-[#305495] rounded-xl  w-[75%]' placeholder='Search....' />
        <Feather
                  name="search"
                  size={20}
                  color="gray"
                  style={{
                    position: 'absolute',
                    left: '14%',
                    zIndex: 1,
                  }}
                />
      </View>

      <View>
        <View>
          <Text>Roll No</Text>
          <Text>101</Text>
        </View>
        <View>
          <Text>Student Name</Text>
          <Text>Asad Shaikh</Text>
        </View>
        <View>
          <Text>Marks Obtained</Text>
          <Text>140</Text>
        </View>
        <View>
          <Text>Total Marks</Text>
          <Text>400</Text>
        </View>
        <View>
          <Text>Percentage</Text>
          <Text>35%</Text>
        </View>
        <View>
          <Text>Grade</Text>
          <Text>F</Text>
        </View>
        <View>
          <Text>Remarks</Text>
          <Text>Need More Improvement!</Text>
        </View>
        <View>
          <Text>View Result</Text>
          <Text>....</Text>
        </View>
      </View>
    </View>
  )
}

export default CurrentYearResults