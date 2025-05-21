import { View, Text } from 'react-native';

const addComplaints = () => {
  const tableHead = ['Name', 'Class', 'Status'];
  const tableData = [
    ['Asad Shaikh', '1', 'Present'],
    ['Pooja Verma', '1', 'Absent'],
    ['Rahul Kumar', '1', 'Absent'],
  ];

  return (
    <View style={{ padding: 10 }}>
      {/* Table Header */}
      <View style={{ flexDirection: 'row', backgroundColor: '#305495', padding: 10 }}>
        {tableHead.map((head, index) => (
          <Text key={index} style={{ flex: 1, color: '#fff', fontWeight: 'bold' }}>
            {head}
          </Text>
        ))}
      </View>

      {/* Table Rows */}
      {tableData.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={{
            flexDirection: 'row',
            padding: 10,
            backgroundColor: rowIndex % 2 === 0 ? '#f2f2f2' : '#fff',
          }}
        >
          {row.map((cell, cellIndex) => (
            <Text key={cellIndex} style={{ flex: 1 }}>
              {cell}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};



export default addComplaints