import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SecurityMetrics from '../components/SecurityMetrics';
import RecentActivity from '../components/RecentActivity';

const DashboardScreen = () => {
  return (
    <LinearGradient
      colors={['#1a1a1a', '#2a2a2a']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <Text style={styles.title}>Security Dashboard</Text>
          <SecurityMetrics />
          <RecentActivity />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ff00',
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default DashboardScreen;

