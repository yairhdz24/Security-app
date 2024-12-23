import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const activities = [
  { icon: 'shield-checkmark', color: '#4CAF50', text: 'Firewall updated', time: '2 hours ago' },
  { icon: 'scan', color: '#2196F3', text: 'Network scan completed', time: '4 hours ago' },
  { icon: 'warning', color: '#FFC107', text: 'Suspicious login attempt blocked', time: '6 hours ago' },
  { icon: 'cloud-download', color: '#9C27B0', text: 'System patches installed', time: '1 day ago' },
  { icon: 'lock-closed', color: '#FF5722', text: 'Password policy enforced', time: '2 days ago' },
];

const RecentActivity = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Activity</Text>
      <ScrollView style={styles.scrollView}>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.iconContainer, { backgroundColor: activity.color }]}>
              <Ionicons name={activity.icon} size={24} color="#fff" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>{activity.text}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    color: '#00ff00',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollView: {
    maxHeight: 250,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  activityTime: {
    color: '#888',
    fontSize: 12,
  },
});

export default RecentActivity;

