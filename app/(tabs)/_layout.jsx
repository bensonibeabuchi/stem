import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  return (
    <Tabs 
    initialRouteName='index'
    
    screenOptions={{ 
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#8191B8',
        tabBarStyle: { backgroundColor: '#02174B' },
        headerStyle: { backgroundColor: '#CDD3E3'}
    }}>

      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerShown: false,

          tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="pie-chart" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="user" color={color} />,
        }}
      />
    </Tabs>
    
  )
}