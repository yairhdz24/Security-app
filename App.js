import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faTerminal, faTools, faDownload, faSearch, faImage, faCreditCard, faFileAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import DashboardScreen from './src/screens/DashboardScreen';
import TerminalScreen from './src/screens/TerminalScreen';
import ToolsScreen from './src/screens/ToolsScreen';
import DownloadsScreen from './src/screens/DownloadScreen';
import OsintScreen from './src/screens/OsintScreen';
import MetadataScreen from './src/screens/MetadataScreen';
import CreditCardScreen from './src/screens/CreditCardScreen';
import FileManagerScreen from './src/screens/FileManagerScreen';
import CustomDrawerContent from './src/components/CustomDrawerContent';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let icon;

        if (route.name === 'Dashboard') {
          icon = faHome;
        } else if (route.name === 'Terminal') {
          icon = faTerminal;
        } else if (route.name === 'Tools') {
          icon = faTools;
        } else if (route.name === 'Downloads') {
          icon = faDownload;
        }

        return <FontAwesomeIcon icon={icon} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#00ff00',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#1a1a1a',
        borderTopColor: '#333',
      },
      headerStyle: {
        backgroundColor: '#1a1a1a',
      },
      headerTintColor: '#00ff00',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Terminal" component={TerminalScreen} />
    <Tab.Screen name="Tools" component={ToolsScreen} />
    <Tab.Screen name="Downloads" component={DownloadsScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={navigation.toggleDrawer} style={styles.menuButton}>
                  <FontAwesomeIcon icon={faBars} size={24} color="#00ff00" />
                </TouchableOpacity>
              ),
              headerStyle: {
                backgroundColor: '#1a1a1a',
              },
              headerTintColor: '#00ff00',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              drawerStyle: {
                backgroundColor: '#1a1a1a',
              },
              drawerLabelStyle: {
                color: '#00ff00',
              },
            })}
          >
            <Drawer.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
            <Drawer.Screen name="OSINT" component={OsintScreen} />
            <Drawer.Screen name="Metadata" component={MetadataScreen} />
            <Drawer.Screen name="Credit Card" component={CreditCardScreen} />
            <Drawer.Screen name="File Manager" component={FileManagerScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    marginLeft: 16,
  },
});

