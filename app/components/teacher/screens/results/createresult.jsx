import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const CreateResult = () => {
  const [studentName, setStudentName] = useState('');
  const [seatNo, setSeatNo] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [exam, setExam] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [outof, setOutof] = useState('');
  const [obtained, setObtained] = useState('');
  const [savedSubjects, setSavedSubjects] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const MultipleSubject = [
    { id: '1', subject: 'English' },
    { id: '2', subject: 'Maths' },
    { id: '3', subject: 'Hindi' },
    { id: '4', subject: 'Social Science' },
    { id: '5', subject: 'Science' },
  ];

  const handleSaveSubject = () => {
    const total = parseFloat(outof);
    const got = parseFloat(obtained);

    if (!selectedSubject || isNaN(total) || isNaN(got)) {
      alert('Please select a subject and enter valid marks');
      return;
    }

    const existing = savedSubjects.find(item => item.subject === selectedSubject);
    if (existing) {
      alert('Subject already added');
      return;
    }

    const percent = ((got / total) * 100).toFixed(2);
    const newSubject = { subject: selectedSubject, outof: total, obtained: got, percent };
    setSavedSubjects([...savedSubjects, newSubject]);

    // Clear input
    setSelectedSubject('');
    setOutof('');
    setObtained('');
  };

  const handleCreate = () => {
    alert('Result Created!');
    // Submit to backend if needed
  };

  const totalMarks = savedSubjects.reduce((sum, s) => sum + s.outof, 0);
  const totalObtained = savedSubjects.reduce((sum, s) => sum + s.obtained, 0);
  const overallPercentage = totalMarks > 0 ? ((totalObtained / totalMarks) * 100).toFixed(2) : '0.00';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
          {/* Header */}
          <Text className="text-2xl font-bold text-center mb-1">Test English School</Text>
          <Text className="text-center font-medium text-gray-600 mb-5">Thane School</Text>

          {/* Basic Info */}
          <View className="flex-row flex-wrap gap-4 justify-between">
            <View className="w-[47%]">
              <Text className="font-semibold mb-1">Student Name</Text>
              <TextInput
                value={studentName}
                onChangeText={setStudentName}
                placeholder="Enter student name"
                className="border border-gray-300 rounded-lg px-4 py-3"
              />
            </View>
            <View className="w-[47%]">
              <Text className="font-semibold mb-1">Seat No</Text>
              <TextInput
                value={seatNo}
                onChangeText={setSeatNo}
                placeholder="Enter seat number"
                className="border border-gray-300 rounded-lg px-4 py-3"
              />
            </View>
          </View>

          <View className="flex-row flex-wrap gap-4 justify-between mt-4">
            <View className="w-[47%]">
              <Text className="font-semibold mb-1">Class</Text>
              <TextInput
                value={studentClass}
                onChangeText={setStudentClass}
                placeholder="Enter class"
                className="border border-gray-300 rounded-lg px-4 py-3"
              />
            </View>
            <View className="w-[47%]">
              <Text className="font-semibold mb-1">Exam</Text>
              <TextInput
                value={exam}
                onChangeText={setExam}
                placeholder="Enter exam"
                className="border border-gray-300 rounded-lg px-4 py-3"
              />
            </View>
          </View>

          {/* Subject Selection */}
          <View className="mt-6">
            <Text className="font-semibold mb-2">Select Subject</Text>
            <TouchableOpacity
              className="border border-gray-300 rounded-lg px-4 py-3"
              onPress={() => setDropdownVisible(!dropdownVisible)}
            >
              <Text>{selectedSubject || 'Choose a subject'}</Text>
            </TouchableOpacity>

            {dropdownVisible && (
              <View className="border border-gray-300 rounded mt-2 bg-gray-50">
                {MultipleSubject.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      setSelectedSubject(item.subject);
                      setDropdownVisible(false);
                    }}
                    className={`px-4 py-3 ${selectedSubject === item.subject ? 'bg-yellow-200' : ''}`}
                  >
                    <Text>{item.subject}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedSubject ? (
              <Text className="text-sm text-gray-500 mt-2">Selected: {selectedSubject}</Text>
            ) : null}
          </View>

          {/* Marks Input */}
          <View className="flex-row justify-between mt-4">
            <View className="w-[48%]">
              <Text className="text-center font-semibold mb-1">Out of</Text>
              <TextInput
                value={outof}
                onChangeText={setOutof}
                keyboardType="numeric"
                placeholder="Total Marks"
                className="border border-gray-300 rounded-lg px-4 py-3"
              />
            </View>
            <View className="w-[48%]">
              <Text className="text-center font-semibold mb-1">Obtained</Text>
              <TextInput
                value={obtained}
                onChangeText={setObtained}
                keyboardType="numeric"
                placeholder="Obtained Marks"
                className="border border-gray-300 rounded-lg px-4 py-3"
              />
            </View>
          </View>

          {/* Save Subject Button */}
          <TouchableOpacity
            className="bg-[#f1a621] rounded-xl py-3 mt-5 items-center"
            onPress={handleSaveSubject}
          >
            <Text className="text-white font-bold text-lg">Save Subject</Text>
          </TouchableOpacity>

          {/* Saved Subjects */}
          {savedSubjects.length > 0 && (
            <View className="mt-6">
              <Text className="text-lg font-bold mb-3">Saved Subjects</Text>
              {savedSubjects.map((item, index) => (
                <View
                  key={index}
                  className="border border-gray-300 rounded-lg px-4 py-3 mb-3 bg-gray-100"
                >
                  <Text className="font-semibold text-base">Subject: {item.subject}</Text>
                  <Text>Total Marks: {item.outof}</Text>
                  <Text>Obtained: {item.obtained}</Text>
                  <Text>Percentage: {item.percent}%</Text>
                </View>
              ))}

              {/* Totals */}
              <View className="border-t border-gray-300 mt-4 pt-4 space-y-2">
                <Text className="text-base font-semibold">Total Marks: {totalMarks}</Text>
                <Text className="text-base font-semibold">Obtained Marks: {totalObtained}</Text>
                <Text className="text-base font-semibold">Overall Percentage: {overallPercentage}%</Text>
              </View>
            </View>
          )}

          {/* Create Result */}
          <TouchableOpacity
            onPress={handleCreate}
            className="bg-[#305495] rounded-xl py-3 mt-6 items-center mb-10"
          >
            <Text className="text-white font-bold text-lg">Create Result</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateResult;
