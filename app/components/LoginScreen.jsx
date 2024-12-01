import React from 'react'
import { View, AppState, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Text, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '../../utils/supabase'
import { useRouter } from 'expo-router';
import { client } from '../../utils/KindeConfig';
import services from '../../utils/services';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const router = useRouter();

  const handleSignUp = async () => {
    const token = await client.register();
    if (token) {
      router.replace('/')
    }
  };
  
  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      await services.storeData('login', 'true')
      router.replace('/')
    }
  };



  return (
  <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 0} className="flex-1 items-center justify-center">
    
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View className="items-center justify-center px-8 w-full">
              
                <Text className="text-2xl font-bold m-4 text-[#1a2950]">Login</Text>              
                <View className="flex w-full items-center justify-between">
                    <TouchableOpacity onPress={handleSignIn} className="w-full">
                        <View className="bg-[#1a2950] text-white text-center items-center p-5 rounded-2xl flex-row justify-center">
                        <Ionicons name="logo-google" size={24} color="white" />
                        <Text className="text-white mx-2">Continue with Google</Text>
                        </View>
                    </TouchableOpacity>

                    <Text className="text-center mt-3 text-[#1a2950] text-xs">*By signing up, you agree to our terms and conditions</Text>
                </View>

                <View className="items-center flex flex-row">

                  <View className="w-4/5 flex flex-row items-center justify-center mb-4">
                    <View className="my-8 bg-[#1a2950] h-[0.3px] rounded-2xl w-2/4"></View>
                    <Text className="p-2 text-[#1a2950] font-semibold">or</Text>
                    <View className="my-8 bg-[#1a2950] h-[0.3px] rounded-2xl w-2/4"></View>
                  </View>

                </View>
                
                <Text className="text-[#1a2950] my-4 items-center">Dont have an account?</Text>
                <TouchableOpacity onPress={handleSignUp}>
                    <Text className="font-bold text-[#1a2950] mx-1">Sign up</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}
