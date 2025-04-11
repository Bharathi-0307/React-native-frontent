// src/styles/InputStyles.ts
import {StyleSheet} from 'react-native';

const inputStyles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#ccc', // Light border color
    borderWidth: 1,
    borderRadius: 5, // Rounded corners
    marginBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff', // White background for inputs
    elevation: 1, // Shadow effect on inputs
  },
});

export default inputStyles;
