import { useEffect, useState } from 'react';
import {
  Alert,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL } from '@env';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const ViewResults = ({ progressId }) => {
  const [studentProgress, setStudentProgress] = useState(null);
  const [school_Details, setSchool_Details] = useState({});
  const user = useSelector((state) => state.auth.user);

  const fetchStudentProgress = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const response = await axios.get(
        `${API_URL}/students/progress/student/progress/${progressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudentProgress(response.data.data);
    } catch (error) {
      console.error('Error fetching student progress:', error);
      Alert.alert('Error', 'Internal Server Error');
    }
  };

  const getSchoolName = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const response = await axios.get(
        `${API_URL}/teacher/get-school-name?admin_id=${user.admin_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setSchool_Details(response.data.schoolDetails[0]);
      } else {
        Alert.alert('Error', 'Unable to get School Name');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong!');
    }
  };

  const generatePDF = async () => {
  if (!studentProgress) {
    alert("No student progress found!");
    return;
  }

  const {
    student_name,
    roll_number,
    progress_date,
    subject,
    marks_obtained,
    total_marks,
    percentage,
    grade,
    remarks,
  } = studentProgress;

  const html = `
    <html>
      <head>
        <style>
          body {
            font-family: Roboto, sans-serif;
            padding: 20px;
            color: #1A1A1A;
            line-height: 1.5;
          }
          h1 {
            text-align: center;
            color: #305495;
            margin-bottom: 5px;
            font-size: 24px;
            text-decoration: underline;
            text-decoration-color: #FFD700;
          }
          h2 {
            text-align: center;
            color: gray;
            font-size: 12px;
            margin-top: 0;
          }
          .info-grid {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
          }
          .info-box {
            width: 48%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .info-item {
            margin-bottom: 10px;
          }
          .info-label {
            color: #555555;
            font-size: 11px;
          }
          .info-value {
            font-weight: bold;
            font-size: 14px;
            color: #1A1A1A;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th {
            background-color: #2D3748;
            color: #FFFFFF;
            padding: 8px;
            font-size: 13px;
            text-align: center;
          }
          td {
            background-color: #F9FAFB;
            padding: 8px;
            border: 1.5px solid gray;
            text-align: center;
            font-size: 13px;
          }
          .footer-grid {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
          }
          .footer-box {
            text-align: center;
          }
          .footer-label {
            font-size: 11px;
            color: #555555;
          }
          .footer-value {
            font-weight: bold;
            font-size: 14px;
            color: #1A1A1A;
          }
          .remarks {
            text-align: center;
            margin-top: 20px;
          }
          .remarks-label {
            font-size: 11px;
            color: #555555;
          }
          .remarks-value {
            font-size: 14px;
            font-weight: bold;
            font-style: italic;
            color: #305495;
            text-decoration: underline;
            text-decoration-color: #FFD700;
          }
            .exam {
            width: 100%;
          
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center
            }
        </style>
      </head>
      <body>
        <h1>${school_Details.name}</h1>
        <h2>${school_Details.address}</h2>

        <div class="info-grid">
          <div class="info-box">
            <div class="info-item">
              <div class="info-label">Name:</div>
              <div class="info-value">${student_name}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Roll Number:</div>
              <div class="info-value">${roll_number}</div>
            </div>
           
            
          </div>
          <div class="info-box">
            <div class="info-item">
             
               <div class="info-item">
              <div class="info-label">G.R no.</div>
              <div class="info-value">${admission_id}</div>
               <div class="info-label">Date:</div>
              <div class="info-value">${new Date(progress_date).toLocaleDateString("en-CA")}</div>
            </div>
            </div>
          </div>
        </div>
        <div>
          <div class="exam">
              <div class="info-label">Exam: </div>
              <div class="info-value">${studentProgress.exam_name}</div>
            </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks Obtained</th>
              <th>Out of</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(subject || {})
              .map(
                ([name, data]) =>
                  `<tr><td>${name}</td><td>${data.marks}</td><td>${data.out_of}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>

        <div class="footer-grid">
          <div class="footer-box">
            <div class="footer-label">Total Marks:</div>
            <div class="footer-value">${Math.round(total_marks)}</div>
          </div>
          <div class="footer-box">
            <div class="footer-label">Marks Obtained:</div>
            <div class="footer-value">${Math.round(marks_obtained)}</div>
          </div>
          <div class="footer-box">
            <div class="footer-label">Percentage:</div>
            <div class="footer-value">${percentage}%</div>
          </div>
          <div class="footer-box">
            <div class="footer-label">Grade:</div>
            <div class="footer-value">${grade}</div>
          </div>
        </div>

        <div class="remarks">
          <div class="remarks-label">Remarks:</div>
          <div class="remarks-value">${remarks}</div>
        </div>
      </body>
    </html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({ html });
    console.log("PDF URI:", uri);
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error("PDF generation error", error);
    alert("Failed to generate PDF.");
  }
};
  useEffect(() => {
    fetchStudentProgress();
    getSchoolName();
  }, [progressId]);

  if (!studentProgress || !school_Details?.name) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#305495" />
      </View>
    );
  }

  const {
    student_name,
    roll_number,
    admission_id,
    progress_date,
    subject,
    total_marks,
    marks_obtained,
    percentage,
    grade,
    remarks,
  } = studentProgress;

  return (
    <ScrollView className="bg-[#F5F1F1] p-4 rounded-lg m-4">
      {/* School Details */}
      <View className="items-center mb-4">
        <Text className="text-xl font-bold text-[#305495] text-center">
          {school_Details.name}
        </Text>
        <Text className="text-sm text-gray-500 text-center">
          {school_Details.address}
        </Text>
      </View>

      {/* Student Info */}
      <View className="flex flex-wrap flex-row justify-between mb-4">
        <Text className="w-1/2 text-gray-700 mb-2">
          <Text className="font-bold">Name: </Text>
          {student_name}
        </Text>
        <Text className="w-1/2 text-gray-700 mb-2">
          <Text className="font-bold">Roll Number: </Text>
          {roll_number}
        </Text>
        <Text className="w-1/2 text-gray-700 mb-2">
          <Text className="font-bold">GR No: </Text>
          {admission_id}
        </Text>
        <Text className="w-1/2 text-gray-700 mb-2">
          <Text className="font-bold">Date: </Text>
          {new Date(progress_date).toLocaleDateString('en-CA')}
        </Text>
        <View className='flex-row justify-center w-full gap-2'>
            <Text className="font-bold">Exam: </Text>
            <Text className='text-gray-700'>{studentProgress.exam_name}</Text>
        </View>
      </View>

      {/* Subject Table */}
      <View className="bg-white rounded-lg border border-gray-300 mb-4">
        <View className="flex-row bg-gray-700 p-2">
          <Text className="w-1/3 text-white font-semibold">Subject</Text>
          <Text className="w-1/3 text-white font-semibold">Marks</Text>
          <Text className="w-1/3 text-white font-semibold">Out of</Text>
        </View>
        {Object.entries(subject || {}).map(([key, value]) => (
  <View key={key} className="flex-row border-t border-gray-300 p-2">
    <Text className="w-1/3">{key}</Text>
    <Text className="w-1/3">{value.marks}</Text>
    <Text className="w-1/3">{value.out_of}</Text>
  </View>
))}

      </View>

      {/* Summary */}
      <View className="flex flex-wrap flex-row justify-between text-gray-700 mb-4">
        <Text className="w-1/2 mb-2">
          <Text className="font-bold">Total Marks: </Text>
          {Math.round(parseFloat(total_marks))}
        </Text>
        <Text className="w-1/2 mb-2">
          <Text className="font-bold">Marks Obtained: </Text>
          {Math.round(parseFloat(marks_obtained))}
        </Text>
        <Text className="w-1/2 mb-2">
          <Text className="font-bold">Percentage: </Text>
          {percentage}%
        </Text>
        <Text className="w-1/2 mb-2">
          <Text className="font-bold">Grade: </Text>
          {grade}
        </Text>
        <Text className="w-full mt-2">
          <Text className="font-bold">Remarks: </Text>
          {remarks}
        </Text>
      </View>

      {/* Download Button */}
      <TouchableOpacity
        className="bg-[#305495] py-3 px-4 rounded-lg"
        onPress={generatePDF}
      >
        <Text className="text-white text-center font-semibold">Download PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ViewResults;
