import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default function Detail_Pose () {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' barStyle='dark-content'/>
      <Text>Detail Pose Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
