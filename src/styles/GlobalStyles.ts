// src/styles/GlobalStyles.ts
import {StyleSheet} from 'react-native';
import Colors from './Colors';
import Fonts from './Fonts';

// ** Global Styles **
const GlobalStyles = StyleSheet.create({
  // ** Container styles **
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background, // Global background color
  },

  // ** Text styles **
  text: {
    fontSize: 16,
    color: Colors.text, // Default text color
    fontFamily: Fonts.regular,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary, // Title text color (primary)
    textAlign: 'center',
    fontFamily: Fonts.bold,
  },

  // ** Button Styles **
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: Colors.primary,
    fontFamily: Fonts.bold,
  },

  // ** Input Styles **
  input: {
    height: 50,
    borderColor: Colors.border, // Light border color
    borderWidth: 1,
    borderRadius: 5, // Rounded corners
    marginBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary, // White background for inputs
    elevation: 1, // Shadow effect on inputs
    fontFamily: Fonts.regular,
  },

  // ** Link text styles **
  linkText: {
    color: Colors.link,
    textAlign: 'center',
  },

  // ** Card Styles (example for a card component) **
  card: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 8,
    elevation: 2, // Shadow effect
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    fontFamily: Fonts.bold,
  },
  cardContent: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: Fonts.regular,
  },
});

export default {GlobalStyles, Fonts, Colors};
