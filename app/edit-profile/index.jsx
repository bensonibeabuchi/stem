import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { TextInput, View, Alert, KeyboardAvoidingView, Text, TouchableWithoutFeedback, Platform, Keyboard, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EditProfile() {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        const getSession = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          setSession(session);
          setUser(session?.user);
        };
    
        getSession();
    
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });
    
        return () => {
          subscription.unsubscribe();
        };
      }, []);


    const updateProfile = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .update({ username })
            .eq('id', session.user.id);
        if (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error updating profile', error.message);
        } else {
            console.log('Profile updated:', data);
            router.replace('/')
        }

        setLoading(false);
    };

    return (
        <View>
            <View className="flex-row items-center space-x-4 p-6">
                <TouchableOpacity onPress={() => router.back()} >
                    <FontAwesome6 name="chevron-left" size={24} color="#1a2950"  />
                </TouchableOpacity>
                <View>
                    <Text className="font-semibold text-lg text-[#1a2950]">Edit profile</Text>
                </View>
       
            </View>
        
{/* 
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} className="p-8">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="">
                    <>
                        <Text className="font-semibold text-[#1a2950] p-2">Edit Username: </Text>
                        <TextInput
                            value={username}
                            onChangeText={(value) => setUsername(value)}
                            className="border-[1px] p-3 mb-4 rounded-xl"
                            
                        />
                        <TouchableOpacity onPress={updateProfile} className=" bg-[#1a2950] p-4 rounded-xl">
                            {loading ? <ActivityIndicator/> : <Text className="text-white text-center font-medium">Update</Text>  }
                            
                            
                        </TouchableOpacity>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView> */}
            
            <View className="flex-row h-3/4 items-center justify-center">
                <Text className="text-gray-400">Coming Soon..</Text>
            </View>
        </View>
    );
}
