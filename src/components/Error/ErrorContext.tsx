import React, {createContext, useState, useContext, ReactNode} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated} from 'react-native';

type AlertType = 'error' | 'success' | 'info';

type ErrorHandlerProps = {
  children: ReactNode;
};

type ErrorContextType = {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showInfo: (message: string) => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useErrorHandler = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorHandler must be used within a GlobalErrorHandler');
  }
  return context;
};

const GlobalErrorHandler: React.FC<ErrorHandlerProps> = ({children}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<AlertType>('error');
  const [fadeAnim] = useState(new Animated.Value(0));

  const showAlert = (message: string, type: AlertType) => {
    setMessage(message);
    setType(type);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => hideAlert(), 3000);
    });
  };

  const showError = (message: string) => showAlert(message, 'error');
  const showSuccess = (message: string) => showAlert(message, 'success');
  const showInfo = (message: string) => showAlert(message, 'info');

  const hideAlert = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMessage(null));
  };

  const getAlertStyle = () => {
    switch (type) {
      case 'success':
        return [styles.alertContainer, styles.success];
      case 'info':
        return [styles.alertContainer, styles.info];
      case 'error':
      default:
        return [styles.alertContainer, styles.error];
    }
  };

  return (
    <ErrorContext.Provider value={{showError, showSuccess, showInfo}}>
      {children}
      {message && (
        <Animated.View style={[getAlertStyle(), {opacity: fadeAnim}]}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={hideAlert} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </ErrorContext.Provider>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: [{translateX: -150}, {translateY: -50}], // Adjust for the width and height of the alert
    width: 300, // Set a fixed width for the alert
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 1000,
  },
  message: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
  closeButton: {
    marginLeft: 10,
  },
  closeText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  error: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  success: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  info: {
    backgroundColor: '#d1ecf1',
    borderColor: '#bee5eb',
  },
});

export default GlobalErrorHandler;
