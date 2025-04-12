import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function RegisterStep1() {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const next = () => {
    if (!name || !email || !mobile) return alert('Please fill all fields');
    navigation.navigate('RegisterStep2', { name, email, mobile });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 1: Personal Info</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
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
  button: {
    backgroundColor: '#3b82f6',
    padding: wp(4),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: hp(2),
  },
  buttonText: { color: 'white', fontSize: wp(4.5), fontWeight: '600' },
});
