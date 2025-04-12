import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const LoadingIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#4CAF50" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});