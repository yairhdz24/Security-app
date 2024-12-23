import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import * as Network from 'expo-network';

const TerminalScreen = () => {
  const [commands, setCommands] = useState([]);
  const [input, setInput] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const scrollViewRef = useRef();

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const handleCommand = async () => {
    const newCommands = [...commands, { type: 'input', text: input }];
    let response = { type: 'output', text: 'Command not recognized' };

    if (input === 'help') {
      response.text = 'Available commands: help, ping <host>, http <url>, clear';
    } else if (input.startsWith('ping')) {
      const host = input.split(' ')[1];
      if (host) {
        try {
          const pingResult = await Network.pingAsync(host);
          response.text = `Pinging ${host}...\nStatus: ${pingResult.status}\nIP Address: ${pingResult.ip}\nAverage RTT: ${pingResult.average}ms`;
        } catch (error) {
          response.text = `Error pinging ${host}: ${error.message}`;
        }
      } else {
        response.text = 'Usage: ping <host>';
      }
    } else if (input.startsWith('http')) {
      const url = input.split(' ')[1];
      if (url) {
        try {
          const httpResponse = await fetch(url);
          const text = await httpResponse.text();
          response.text = `HTTP request to ${url}\nStatus: ${httpResponse.status}\nResponse:\n${text.substring(0, 200)}...`;
        } catch (error) {
          response.text = `Error making HTTP request to ${url}: ${error.message}`;
        }
      } else {
        response.text = 'Usage: http <url>';
      }
    } else if (input === 'clear') {
      setCommands([]);
      setInput('');
      return;
    }

    setCommands([...newCommands, response]);
    setInput('');
  };

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2a2a2a']}
      style={styles.container}
    >
      <View style={styles.header}>
        <FontAwesomeIcon icon={faTerminal} size={24} color="#00ff00" />
        <Text style={styles.headerText}>Interactive Terminal</Text>
      </View>
      <ScrollView
        style={styles.output}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {commands.map((cmd, index) => (
          <Text key={index} style={cmd.type === 'input' ? styles.inputText : styles.outputText}>
            {cmd.type === 'input' ? '> ' : ''}
            {cmd.text}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <Text style={styles.prompt}>{'>'}</Text>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleCommand}
          placeholder="Enter command"
          placeholderTextColor="#555"
        />
        {cursorVisible && <Text style={styles.cursor}>|</Text>}
      </View>
      <TouchableOpacity style={styles.executeButton} onPress={handleCommand}>
        <Text style={styles.executeButtonText}>Execute</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    color: '#00ff00',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  output: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    padding: 8,
  },
  inputText: {
    color: '#00ff00',
    fontFamily: 'Courier',
    fontSize: 16,
  },
  outputText: {
    color: '#ffffff',
    fontFamily: 'Courier',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    padding: 8,
  },
  prompt: {
    color: '#00ff00',
    fontFamily: 'Courier',
    fontSize: 18,
    marginRight: 5,
  },
  input: {
    flex: 1,
    color: '#00ff00',
    fontFamily: 'Courier',
    fontSize: 18,
    padding: 0,
  },
  cursor: {
    color: '#00ff00',
    fontFamily: 'Courier',
    fontSize: 18,
  },
  executeButton: {
    backgroundColor: '#00ff00',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  executeButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TerminalScreen;
