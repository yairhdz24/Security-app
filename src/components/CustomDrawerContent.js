import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';

const CustomDrawerContent = (props) => {
  return (
    <LinearGradient colors={['#1a1a1a', '#2a2a2a']} style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileSection}>
          <FontAwesomeIcon icon={faUser} size={50} color="#00ff00" />
          <Text style={styles.profileName}>Security Expert</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.settingsButton}>
        <FontAwesomeIcon icon={faCog} size={24} color="#00ff00" />
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  profileName: {
    color: '#00ff00',
    fontSize: 18,
    marginTop: 10,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  settingsText: {
    color: '#00ff00',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CustomDrawerContent;

