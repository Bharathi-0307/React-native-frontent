import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default function RegisterStep2() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { name,password, email, mobile } = route.params;

  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [location, setLocation] = useState('');
  const [students, setStudents] = useState<{ studentName: string; location: string }[]>([]);

  const addStudent = () => {
    if (!studentName || !location) return;
    setStudents([...students, { studentName, location }]);
    setStudentName('');
    setLocation('');
  };

  const next = () => {
    if (!parentName || students.length === 0) return alert('Add at least one student');
    navigation.navigate('RegisterStep3', {
      name,password, email, mobile, parentName, students
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 2: Student Info</Text>

      <TextInput
        style={styles.input}
        placeholder="Parent Name"
        value={parentName}
        onChangeText={setParentName}
      />
      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={studentName}
        onChangeText={setStudentName}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.addButton} onPress={addStudent}>
        <Text style={styles.buttonText}>+ Add Student</Text>
      </TouchableOpacity>

      <FlatList
        data={students}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.studentItem}>👤 {item.studentName} - {item.location}</Text>
        )}
        style={{ marginVertical: hp(2) }}
      />

      <TouchableOpacity style={styles.button} onPress={next}>
        <Text style={styles.buttonText}>Next ➜</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: wp(5), justifyContent: 'center' },
  title: { fontSize: wp(6), fontWeight: '600', marginBottom: hp(3), textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    padding: wp(3), marginBottom: hp(2), fontSize: wp(4),
  },
  addButton: {
    backgroundColor: '#10b981', padding: wp(3),
    borderRadius: 8, alignItems: 'center'
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: wp(4),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: hp(2),
  },
  buttonText: { color: 'white', fontSize: wp(4.5), fontWeight: '600' },
  studentItem: { fontSize: wp(4), paddingVertical: hp(0.5) }
});
