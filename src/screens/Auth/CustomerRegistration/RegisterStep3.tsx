import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default function RegisterStep3() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { name, email, mobile, parentName, students } = route.params;

  const [plan, setPlan] = useState('1M');
  const [agree, setAgree] = useState(false);

  // JUST STATIC DATA FOR NOW
  const plans: any = {
    '1M': 4000,
    '3M': 12000,
    '6M': 24000,
    '12M': 48000
  };

  const handleSubmit = async () => {
    if (!agree) return alert('You must agree to terms');

    const payload = {
      name, email, mobile,
      parentName,
      students,
      plan,
      price: plans[plan],
    };

    try {
      await axios.post('http://YOUR_SERVER_IP:5000/api/customers/register', payload);
      Alert.alert('Success', 'Registration Complete');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 3: Plan & Confirmation</Text>

      <Text style={styles.label}>Select Plan</Text>
      <Picker
        selectedValue={plan}
        onValueChange={value => setPlan(value)}
        style={styles.picker}
      >
        {Object.entries(plans).map(([key, val]) => (
          <Picker.Item key={key} label={`${key} - ₹${val}`} value={key} />
        ))}
      </Picker>

      <View style={styles.switchRow}>
        <Text style={styles.label}>I agree to terms & conditions</Text>
        <Switch value={agree} onValueChange={setAgree} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: wp(5), justifyContent: 'center' },
  title: { fontSize: wp(6), fontWeight: '600', marginBottom: hp(3), textAlign: 'center' },
  label: { fontSize: wp(4.2), marginVertical: hp(1) },
  picker: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    marginBottom: hp(2)
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(2),
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
