import { Text, View, ScrollView } from 'react-native'

const ViewAnswers = () => {
  const data = [
    {
      question: "Question1",
      answer: "Answer1",
      answered_by: "Pooja",
    },
    {
      question: "Question2",
      answer: "Answer2",
      answered_by: "Pooja",
    },
    {
      question: "Question3",
      answer: "Answer3",
      answered_by: "Pooja",
    },
    {
      question: "Question4",
      answer: "Answer4",
      answered_by: "Pooja",
    },
    {
      question: "Question5",
      answer: "Answer5",
      answered_by: "Pooja",
    }
  ]
  return (
   <ScrollView className="flex-1 bg-gray-100">
      <View className="items-center p-4">
        <Text className="text-2xl font-bold text-[#305495] mb-4">
          View Answers
        </Text>

        {/* Table Header */}
        <View className="flex-row w-full justify-between px-4 py-2 bg-white rounded-t-xl shadow border-b border-gray-300">
          <Text className="w-1/3 font-semibold text-[#305495]">Question</Text>
          <Text className="w-1/3 font-semibold text-[#305495]">Answer</Text>
          <Text className="w-1/3 font-semibold text-[#305495]">Answered By</Text>
        </View>

        {/* Table Body */}
        {data.map((item, index) => (
          <View
            key={index}
            className={`flex-row w-full justify-between px-4 py-3 ${
              index % 2 === 0 ? 'bg-blue-50' : 'bg-orange-50'
            }`}
          >
            <Text className="w-1/3 text-gray-800">{item.question}</Text>
            <Text className="w-1/3 text-gray-800">{item.answer}</Text>
            <Text className="w-1/3 text-gray-800">{item.answered_by}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default ViewAnswers