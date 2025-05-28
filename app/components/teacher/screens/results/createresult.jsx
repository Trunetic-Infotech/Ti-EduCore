import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { API_URL } from '@env';
import * as SecureStore from 'expo-secure-store'
const CreateResult = () => {
  const user = useSelector((state) => state.auth.user);
  const [subjects, setSubjects] = useState([]);
  const [rows, setRows] = useState([]);
  const [exams, setExams] = useState([]);
  const [schoolDetails, setSchoolDetails] = useState("");
  const [examId, setExamId] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isStudentSelected, setIsStudentSelected] = useState(false);

  const [remarks, setRemarks] = useState("");

  const totalMarks = () => rows.reduce((acc, row) => acc + Number(row.outOf || 0), 0);
  const marksObtained = () => rows.reduce((acc, row) => acc + Number(row.obtained || 0), 0);

  useEffect(() => {
    if (user?.class_id && user?.subclass_id && user?.admin_id) {
      getExams();
      getSchoolName();
      getAllClassSubjects();
    }
  }, []);

  useEffect(() => {
    if (subjects.length > 0) {
      setRows(subjects.map((subj) => ({ subject: subj.subject_name, outOf: "", obtained: "" })));
    }
  }, [subjects]);

  useEffect(() => {
    if (!isStudentSelected && keyword.trim()) {
      const delay = setTimeout(() => getStudents(keyword), 500);
      return () => clearTimeout(delay);
    } else {
      setStudents([]);
    }
  }, [keyword]);

  const getExams = async () => {
    try {
      const token = await SecureStore.getItem("token");
      const res = await axios.get(`${API_URL}/students/examresult/get-exam-details/results?class_id=${user.class_id}&subclass_id=${user.subclass_id}&admin_id=${user.admin_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExams(res.data.data || []);
    } catch (error) {
      Alert.alert( "Error fetching exams" );
    }
  };

  const getSchoolName = async () => {
    try {
      const token = await SecureStore.getItem("token");
      const res = await axios.get(`${API_URL}/teacher/get-school-name?admin_id=${user.admin_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSchoolDetails(res.data.schoolDetails[0] || {});
    } catch (error) {
      Alert.alert( "Error fetching school name" );
    }
  };

  const getAllClassSubjects = async () => {
    try {
      const token = await SecureStore.getItem("token");
      const res = await axios.get(`${API_URL}/class/subject/get-all-class?class_id=${user.class_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(res.data.AllSubject || []);
    } catch (error) {
      Alert.alert("Error fetching subjects" );
    }
  };

  const getStudents = async (name) => {
    try {
      setLoading(true);
      const token = await SecureStore.getItem("token");
      const res = await axios.get(`${API_URL}/student/get-subclass-students/${name}`, {
        params: { subclass_id: user.subclass_id },
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data.student || []);
    } catch (error) {
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (index, field, value) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const handleSubmit = async () => {
    if (!student || !examId) {
      Alert.alert( "error Select student and exam first" );
      return;
    }

    const subjectData = rows.reduce((acc, row) => {
      acc[row.subject] = { marks: row.obtained, out_of: row.outOf };
      return acc;
    }, {});

    try {
      const token = await SecureStore.getItem("token");
      const res = await axios.post(
        `${API_URL}/students/progress/create/${user.id}`,
        {
          student_id: student.id,
          admin_id: student.admin_id,
          remarks,
          subject_data: JSON.stringify(subjectData),
          marks_obtained: marksObtained(),
          total_marks: totalMarks(),
          exam_id: examId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

     if (res.data.success) {
  Alert.alert("Success", res.data.message);
} else {
  Alert.alert("Error", res.data.message);
}
} catch (error) {
  Alert.alert("Error", "Submission failed");
}

  };

  return (
  <FlatList
    data={rows}
    keyExtractor={(_, i) => i.toString()}
    ListHeaderComponent={
      <View style={styles.container}>
        <Text style={styles.title}>{schoolDetails?.name || "School Name"}</Text>
        <Text style={styles.subtitle}>{schoolDetails?.address || "Address"}</Text>

        <TextInput
          placeholder="Enter Student Name"
          style={styles.input}
          value={keyword}
          onChangeText={setKeyword}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") setIsStudentSelected(false);
          }}
        />

        {loading && <ActivityIndicator size="small" />}
        {students.map((stud) => (
          <TouchableOpacity
            key={stud.id}
            style={styles.dropdownItem}
            onPress={() => {
              setKeyword(stud.student_name);
              setStudent(stud);
              setIsStudentSelected(true);
              setStudents([]);
            }}
          >
            <Text>{stud.student_name}</Text>
          </TouchableOpacity>
        ))}

        {student && (
          <>
            <Text>Seat No: {student.roll_number}</Text>
            <Text>Class: {student.class_name}</Text>
          </>
        )}

        <Text style={styles.label}>Select Exam</Text>
        <ScrollView horizontal>
          {exams.map((exam) => (
            <TouchableOpacity
              key={exam.id}
              style={[
                styles.examButton,
                examId === exam.id && styles.examButtonActive,
              ]}
              onPress={() => setExamId(exam.id)}
            >
              <Text style={styles.examButtonText}>{exam.exam_name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    }
    renderItem={({ item, index }) => (
      <View style={styles.row}>
        <Text style={styles.subject}>{item.subject}</Text>
        <TextInput
          placeholder="Out Of"
          keyboardType="numeric"
          style={styles.inputSmall}
          value={item.outOf}
          onChangeText={(val) => handleInputChange(index, "outOf", val)}
        />
        <TextInput
          placeholder="Obtained"
          keyboardType="numeric"
          style={styles.inputSmall}
          value={item.obtained}
          onChangeText={(val) => handleInputChange(index, "obtained", val)}
        />
      </View>
    )}
    ListFooterComponent={
      <View style={styles.container}>
        <TextInput
          placeholder="Remarks"
          value={remarks}
          onChangeText={setRemarks}
          style={styles.input}
        />
        <Text style={styles.stats}>
          Percentage:{" "}
          {totalMarks() > 0
            ? ((marksObtained() * 100) / totalMarks()).toFixed(2)
            : 0}
          %
        </Text>
        <Text style={styles.stats}>Total: {totalMarks()}</Text>
        <Text style={styles.stats}>Obtained: {marksObtained()}</Text>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Result</Text>
        </TouchableOpacity>
        <Toast />
      </View>
    }
  />
);
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: { textAlign: "center", color: "gray", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  inputSmall: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  label: { marginTop: 15, fontWeight: "bold" },
  examButton: {
    padding: 10,
    backgroundColor: "#ddd",
    marginRight: 10,
    borderRadius: 5,
  },
  examButtonActive: {
    backgroundColor: "#305495",
  },
  examButtonText: { color: "#fff" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  subject: { flex: 1 },
  stats: { marginVertical: 5, fontWeight: "bold" },
  submitButton: {
    backgroundColor: "#305495",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: { color: "#fff", fontWeight: "bold" },
  dropdownItem: {
    padding: 10,
    backgroundColor: "#eee",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});

export default CreateResult;



