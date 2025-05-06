// components/DateSeparator.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DateSeparator = ({ date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{date}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#777',
  },
});

export default DateSeparator;
