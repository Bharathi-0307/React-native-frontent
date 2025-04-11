import React from 'react';
import {TextInput, StyleSheet, TextInputProps, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Define the props for the component, including TextInputProps for reusability
interface TextInputWithGradientBorderProps extends TextInputProps {
  gradientColors?: string[]; // Optional gradient color prop
  style?: object; // Optional additional styles for customization
}

const TextInputWithGradientBorder: React.FC<
  TextInputWithGradientBorderProps
> = ({
  gradientColors = ['#6a11cb', '#2575fc'], // Default gradient colors
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={gradientColors} // Apply gradient colors to the border
        style={styles.gradientBorder} // Apply gradient border
      >
        <TextInput
          {...props}
          style={[styles.input, style]} // Apply additional styles
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // Make the container full-width
  },
  gradientBorder: {
    borderRadius: 10, // Rounded corners for the gradient border
    padding: 2, // Padding between the border and TextInput
  },
  input: {
    height: 50, // Set height for the TextInput
    borderRadius: 8, // Round the corners of the TextInput itself
    backgroundColor: '#fff', // Solid background for the TextInput
    paddingHorizontal: 15, // Padding inside the TextInput
    fontSize: 16, // Font size for the input text
    color: '#000', // Text color inside the input field
  },
});

export default TextInputWithGradientBorder;
