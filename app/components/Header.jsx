import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { StyleSheet, View, Alert, Text, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { Session } from '@supabase/supabase-js';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import services from '../../utils/services';
import { client } from '../../utils/KindeConfig';

export default function Header({ user }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const router = useRouter()
  // const [user, setUser] = useState([]);

  useEffect(() => {
    if (user) getUserDetails();
  }, []);


  const getUserDetails = async () => {
    const userProfile = await client.getUserDetails();
  }

  return (
    <View>
      <View className="flex flex-row items-center justify-between px-6 pt-6 bg-[#CDD3E3]">

        <View>
        <Text className="text-[#1a2950]">Good day,</Text>
        <Text className="text-[#1a2950] text-xl font-bold tracking-tighter">{user?.given_name}</Text>
        </View>

        <View className="bg-[#abb6d0] rounded-md p-2">
        <Ionicons name="notifications-outline" size={24} color="#1a2950" />
        </View>

        </View>
    </View>
  )
}