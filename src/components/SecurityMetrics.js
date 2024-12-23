import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SecurityMetrics = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="shield-checkmark" size={20} color="#00ff00" />
          <Text style={styles.updateText}>Updated 5m ago</Text>
        </View>
        <Text style={styles.cardTitle}>Security Score</Text>
        <View style={styles.progressBackground}>
          <View style={[styles.progressBar, { width: '85%' }]} />
        </View>
        <View style={styles.scoreRow}>
          <Text style={styles.scoreText}>Score</Text>
          <Text style={styles.scoreValue}>85/100</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="warning" size={20} color="#FFC107" />
          <Text style={styles.updateText}>Real-time</Text>
        </View>
        <Text style={styles.cardTitle}>Threats Detected</Text>
        <Text style={styles.largeNumber}>0</Text>
        <Text style={styles.subtitle}>No active threats</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="checkmark-circle" size={20} color="#00ff00" />
          <Text style={styles.updateText}>Last checked 2m ago</Text>
        </View>
        <Text style={styles.cardTitle}>System Status</Text>
        {['Firewall', 'Antivirus', 'Updates'].map((item, index) => (
          <View key={item} style={styles.statusRow}>
            <Text style={styles.statusText}>{item}</Text>
            <View style={styles.statusIndicator}>
              <Ionicons name="checkmark" size={16} color="#00ff00" />
              <Text style={styles.statusActive}>Active</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  updateText: {
    color: '#888',
    fontSize: 12,
  },
  cardTitle: {
    color: '#00ff00',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00ff00',
    borderRadius: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreText: {
    color: '#888',
  },
  scoreValue: {
    color: '#fff',
    fontWeight: 'bold',
  },
  largeNumber: {
    color: '#00ff00',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  subtitle: {
    color: '#888',
    fontSize: 14,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  statusText: {
    color: '#888',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusActive: {
    color: '#00ff00',
    marginLeft: 4,
    fontSize: 14,
  },
});

export default SecurityMetrics;

