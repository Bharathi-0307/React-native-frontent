import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface ErrorMessageProps {
  error: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({error, onClose}) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        {/* <Icon name="close-circle" size={24} color="#721c24" /> */}
      </TouchableOpacity>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#f8d7da',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  errorText: {
    color: '#721c24',
    fontSize: 16,
    textAlign: 'left',
    flex: 1,
  },
  closeButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  closeButtonText: {
    color: '#721c24',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
