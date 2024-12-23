import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileAlt, faPause, faTrash, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

const initialDownloads = [
  { name: 'Security_Report.pdf', size: '2.5 MB', progress: 100 },
  { name: 'Network_Scan.xml', size: '1.2 MB', progress: 75 },
  { name: 'Vulnerability_Analysis.docx', size: '3.7 MB', progress: 30 },
  { name: 'Firewall_Logs.txt', size: '500 KB', progress: 100 },
  { name: 'Malware_Samples.zip', size: '15 MB', progress: 0 },
];

const DownloadsScreen = () => {
  const [downloads, setDownloads] = useState(initialDownloads);
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDownloads((prevDownloads) =>
        prevDownloads.map((download) => {
          if (download.progress < 100) {
            return { ...download, progress: Math.min(download.progress + 5, 100) };
          }
          return download;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const handleAction = (action, index) => {
    switch (action) {
      case 'pause':
        Alert.alert('Download Paused', `${downloads[index].name} has been paused.`);
        break;
      case 'resume':
        Alert.alert('Download Resumed', `${downloads[index].name} has been resumed.`);
        break;
      case 'stop':
        Alert.alert('Download Stopped', `${downloads[index].name} has been stopped.`);
        break;
      case 'delete':
        setDownloads((prevDownloads) => prevDownloads.filter((_, i) => i !== index));
        Alert.alert('Download Deleted', `${downloads[index].name} has been deleted.`);
        break;
      default:
        break;
    }
  };

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2a2a2a']}
      style={styles.container}
    >
      <ScrollView>
        {downloads.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.downloadItem}
            onPress={() => toggleExpand(index)}
          >
            <View style={styles.downloadInfo}>
              <FontAwesomeIcon icon={faFileAlt} size={24} color="#00ff00" />
              <View style={styles.downloadText}>
                <Text style={styles.downloadName}>{item.name}</Text>
                <Text style={styles.downloadSize}>{item.size}</Text>
              </View>
            </View>
            <View style={styles.downloadProgress}>
              <View style={[styles.progressBar, { width: `${item.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{`${item.progress}%`}</Text>
            {expandedItem === index && (
              <View style={styles.expandedContent}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleAction(item.progress < 100 ? 'pause' : 'resume', index)}
                >
                  <FontAwesomeIcon
                    icon={item.progress < 100 ? faPause : faPlay}
                    size={20}
                    color="#00ff00"
                  />
                  <Text style={styles.actionText}>
                    {item.progress < 100 ? 'Pause' : 'Resume'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleAction('stop', index)}
                >
                  <FontAwesomeIcon icon={faStop} size={20} color="#00ff00" />
                  <Text style={styles.actionText}>Stop</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleAction('delete', index)}
                >
                  <FontAwesomeIcon icon={faTrash} size={20} color="#00ff00" />
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  downloadItem: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  downloadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  downloadText: {
    marginLeft: 16,
  },
  downloadName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  downloadSize: {
    color: '#888888',
    fontSize: 14,
  },
  downloadProgress: {
    height: 4,
    backgroundColor: '#555',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00ff00',
  },
  progressText: {
    color: '#00ff00',
    fontSize: 12,
    textAlign: 'right',
  },
  expandedContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#00ff00',
    marginLeft: 8,
  },
});

export default DownloadsScreen;

