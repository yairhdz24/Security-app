import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';

const CommandTerminal = () => {
  const [commands, setCommands] = useState([]);
  const [input, setInput] = useState('');

  const handleCommand = () => {
    const newCommands = [...commands, `> ${input}`];
    let response = 'Command not recognized';

    if (input === 'help') {
      response = 'Available commands: help, ping, list-tools';
    } else if (input === 'list-tools') {
      response = 'Tools installed: nmap, whois, traceroute';
    } else if (input.startsWith('ping')) {
      response = `Pinging ${input.split(' ')[1]}... Success!`;
    }

    setCommands([...newCommands, response]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.output}>
        {commands.map((cmd, index) => (
          <Text key={index} style={styles.text}>{cmd}</Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleCommand}
        placeholder="Enter command"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  output: {
    height: 150,
    marginBottom: 10,
  },
  text: {
    color: '#0f0',
    fontFamily: 'Courier',
  },
  input: {
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
    color: '#fff',
    padding: 10,
    backgroundColor: '#222',
  },
});

export default CommandTerminal;