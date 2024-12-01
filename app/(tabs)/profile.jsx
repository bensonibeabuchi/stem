import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  RefreshControl,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button } from '@rneui/themed';
import { FontAwesome, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { supabase } from '../../utils/supabase';
import { client } from '../../utils/KindeConfig';
import services from '../../utils/services';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const router = useRouter();
  const navigation = useNavigation();

  const placeholder = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYnsoJKGMaangFJ0fH0LS_f-BhjwV8WEhdgg&s';

  useEffect(() => {
    checkUserAuth();
    getUserDetails();
  }, []);

  const checkUserAuth = async () => {
    try {
      const isLoggedIn = await services.getData('login');
      if (isLoggedIn !== 'true') {
        router.replace('components/LoginScreen');
      }
    } catch (error) {
      console.error('Error checking user authentication:', error);
    }
  };

  const getUserDetails = async () => {
    try {
      const userProfile = await client.getUserDetails();
      setUser(userProfile);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const loggedOut = await client.logout();
      if (loggedOut) {
        await services.storeData('login', 'false');
        router.replace('components/LoginScreen');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Logout Failed', 'Please try again.');
    }
  };

  const SettingsOption = ({ icon, text, onPress }) => (
    <TouchableOpacity onPress={onPress} className="flex-row items-center justify-between p-4 px-8">
      <View className="flex-row items-center space-x-2">
        <View className="flex items-center justify-center bg-[#ABB6D0] p-2 h-10 w-10 rounded-full">
          {icon}
        </View>
        <Text className="text-[#031D5E] font-medium">{text}</Text>
      </View>
      <Feather name="chevron-right" size={24} color="#031D5E" />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getUserDetails} tintColor="#1a2950" />
      }
    >
      <View className="items-center justify-center w-full py-6">
        <Image
          source={{ uri: user.picture || placeholder }}
          className="rounded-full w-32 h-32"
        />
        <Text className="font-semibold text-[#1a2950] text-center pt-4 mb-8">
          {user.family_name} {user.given_name}
        </Text>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <SettingsOption
            icon={<FontAwesome name="user" size={20} color="#031D5E" />}
            text="Edit Profile"
            onPress={() => router.push('/edit-profile')}
          />
          <SettingsOption
            icon={<Ionicons name="create" size={24} color="#031D5E" />}
            text="Create Category"
            onPress={() => navigation.navigate('add-new-category')}
          />
          <SettingsOption
            icon={<MaterialCommunityIcons name="shield-lock" size={24} color="#031D5E" />}
            text="Data & Privacy"
            onPress={() => router.push('/privacy')}
          />
          <SettingsOption
            icon={<FontAwesome name="credit-card-alt" size={16} color="#031D5E" />}
            text="Connect Cards"
            onPress={() => router.push('/cards')}
          />
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 p-5 m-4 rounded-xl"
          >
            <Text className="text-white text-center font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
