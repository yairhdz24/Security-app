import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const tools = [
  { name: 'Nmap', description: 'Network scanner', installed: false },
  { name: 'Whois', description: 'Domain info lookup', installed: false },
  { name: 'Traceroute', description: 'Network path analyzer', installed: false },
];

const PackageManager = () => {
  const [toolState, setToolState] = useState(tools);

  const toggleInstall = (index) => {
    const updatedTools = [...toolState];
    updatedTools[index].installed = !updatedTools[index].installed;
    setToolState(updatedTools);
  };

  return (
    <View style={styles.container}>
      {toolState.map((tool, index) => (
        <View key={index} style={styles.tool}>
          <Text style={styles.name}>{tool.name}</Text>
          <Text style={styles.description}>{tool.description}</Text>
          <Button
            title={tool.installed ? 'Uninstall' : 'Install'}
            onPress={() => toggleInstall(index)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  tool: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default PackageManager;
