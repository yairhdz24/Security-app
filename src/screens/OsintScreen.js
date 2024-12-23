import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faGlobe, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const OsintScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const performOsintSearch = async () => {
    // In a real application, you would integrate with actual OSINT APIs
    // This is a simulated response
    const simulatedResults = [
      { type: 'website', value: `http://www.${query}.com` },
      { type: 'email', value: `info@${query}.com` },
      { type: 'username', value: query },
    ];

    setResults(simulatedResults);
  };

  return (
    <LinearGradient colors={['#1a1a1a', '#2a2a2a']} style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Enter search query"
          placeholderTextColor="#555"
        />
        <TouchableOpacity style={styles.searchButton} onPress={performOsintSearch}>
          <FontAwesomeIcon icon={faSearch} size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.resultsContainer}>
        {results.map((result, index) => (
          <View key={index} style={styles.resultItem}>
            <FontAwesomeIcon
              icon={result.type === 'website' ? faGlobe : result.type === 'email' ? faEnvelope : faUser}
              size={20}
              color="#00ff00"
            />
            <Text style={styles.resultText}>{result.value}</Text>
          </View>
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
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#00ff00',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsContainer: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  resultText: {
    color: '#fff',
    marginLeft: 10,
  },
});

export default OsintScreen;

