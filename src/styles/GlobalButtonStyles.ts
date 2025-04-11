// src/styles/ButtonStyles.ts
import {StyleSheet} from 'react-native';

export const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff', // Primary button color
    borderRadius: 5,
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text color for button
    fontSize: 18,
    fontWeight: 'bold',
  },
});
