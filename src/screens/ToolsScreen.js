import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faNetworkWired, faGlobe, faRoute, faChartBar, faBug, faKey, faDownload } from '@fortawesome/free-solid-svg-icons';

const tools = [
  { name: 'Nmap', description: 'Network scanner', icon: faNetworkWired },
  { name: 'Whois', description: 'Domain info lookup', icon: faGlobe },
  { name: 'Traceroute', description: 'Network path analyzer', icon: faRoute },
  { name: 'Wireshark', description: 'Network protocol analyzer', icon: faChartBar },
  { name: 'Metasploit', description: 'Penetration testing framework', icon: faBug },
  { name: 'John the Ripper', description: 'Password cracker', icon: faKey },
];

const ToolsScreen = () => {
  const [installedTools, setInstalledTools] = useState([]);
  const [gitRepo, setGitRepo] = useState('');

  const toggleInstall = (toolName) => {
    setInstalledTools((prev) =>
      prev.includes(toolName)
        ? prev.filter((name) => name !== toolName)
        : [...prev, toolName]
    );
  };

  const handleGitInstall = () => {
    if (gitRepo.trim() === '') {
      Alert.alert('Error', 'Please enter a valid Git repository URL');
      return;
    }

    // Simulating Git clone and install process
    Alert.alert('Installing', `Cloning repository: ${gitRepo}`);
    setTimeout(() => {
      Alert.alert('Success', `Successfully installed package from ${gitRepo}`);
      setGitRepo('');
    }, 2000);
  };

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2a2a2a']}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Tools</Text>
          {tools.map((tool) => (
            <TouchableOpacity
              key={tool.name}
              style={styles.toolItem}
              onPress={() => toggleInstall(tool.name)}
            >
              <View style={styles.toolInfo}>
                <FontAwesomeIcon icon={tool.icon} size={24} color="#00ff00" />
                <View style={styles.toolText}>
                  <Text style={styles.toolName}>{tool.name}</Text>
                  <Text style={styles.toolDescription}>{tool.description}</Text>
                </View>
              </View>
              <FontAwesomeIcon
                icon={installedTools.includes(tool.name) ? faDownload : faSearch}
                size={24}
                color="#00ff00"
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Git Package Manager</Text>
          <TextInput
            style={styles.gitInput}
            value={gitRepo}
            onChangeText={setGitRepo}
            placeholder="Enter Git repository URL"
            placeholderTextColor="#555"
          />
          <TouchableOpacity style={styles.gitButton} onPress={handleGitInstall}>
            <Text style={styles.gitButtonText}>Install from Git</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#00ff00',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  toolItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  toolInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolText: {
    marginLeft: 16,
  },
  toolName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toolDescription: {
    color: '#888888',
    fontSize: 14,
  },
  gitInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    padding: 12,
    color: '#00ff00',
    marginBottom: 12,
  },
  gitButton: {
    backgroundColor: '#00ff00',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  gitButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ToolsScreen;

