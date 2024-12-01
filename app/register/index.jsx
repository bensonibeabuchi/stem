import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Text, TextInput, TouchableOpacity, Pressable } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '../../utils/supabase'
import { Button, Input } from '@rneui/themed'
import { useRouter } from 'expo-router';
import services from '../../utils/services';
import { client } from '../../utils/KindeConfig';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
// AppState.addEventListener('change', (state) => {
//   if (state === 'active') {
//     supabase.auth.startAutoRefresh()
//   } else {
//     supabase.auth.stopAutoRefresh()
//   }
// })

export default function Auth() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  
  // async function signUpWithEmail() {
  //   setLoading(true)
  //   const {
  //     data: { session },
  //     error,
  //   } = await supabase.auth.signUp({
  //     email: email,
  //     password: password,
  //   })

  //   if (error) Alert.alert(error.message)
  //   if (!session) Alert.alert('Please check your inbox for email verification!')
  //     router.replace('/login')
  //   setLoading(false)
  // }

  const handleSignUp = async () => {
    const token = await client.register();
    if (token) {
      await services.storeData('login', 'true')
      router.replace('/')
      // User was authenticated
    }
  };

  return (
  <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 0} className="flex-1 items-center justify-center">
    
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="items-center justify-center px-8 w-full">
                <Text className="text-2xl font-bold mb-8 text-[#1a2950]">Register</Text>
                <View className="p-2 w-full rounded-2xl border-[#576CA0] text-[#021239] border mb-4 flex-row items-center justify-between">
                <TextInput
                    placeholder='Username'
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    autoCapitalize={'none'}
                    clearButtonMode='always'
                    className="w-11/12 h-full py-3 text-left"
                    />
                    <MaterialIcons name="email" size={24} color="#021239"/>
                </View>
                <View className="p-2 w-full rounded-2xl border-[#576CA0] text-[#021239] border mb-4 flex-row items-center justify-between">
                    <TextInput
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry
                    className="w-11/12 h-full py-3 text-left" 
                    />
                    <Ionicons name="eye" size={24} color="#021239" />
                </View>
                <TouchableOpacity disabled={!username || !password } onPress={handleSignUp} className="w-full">
                    <View className="bg-[#1a2950] text-white text-center items-center p-5 rounded-2xl">
                    <Text className="text-white">Register</Text>
                    </View>
                </TouchableOpacity>

                <View className="items-center flex flex-row">

                <Text className="text-[#1a2950] my-4 items-center">Already have an account?</Text>
                <TouchableOpacity onPress={() => router.replace('components/LoginScreen')}>
                    <Text className="font-bold text-[#1a2950] mx-1">Login</Text>
                </TouchableOpacity>

                </View>

                <View className="w-4/5 flex flex-row items-center justify-center mb-4">
                <View className="my-8 bg-[#1a2950] h-[0.3px] rounded-2xl w-2/4"></View>
                <Text className="p-2 text-[#1a2950] font-semibold">or</Text>
                <View className="my-8 bg-[#1a2950] h-[0.3px] rounded-2xl w-2/4"></View>

                </View>

                <Pressable onPress={() => router.navigate('/')} className="absolute bottom-0 left-0 m-3">
                  <Text>Home</Text>
                </Pressable>


                {/* <View className="flex w-full items-center justify-between">
                    <TouchableOpacity onPress={handleSignIn} className="w-full">
                        <View className="bg-[#1a2950] text-white text-center items-center p-5 rounded-2xl flex-row justify-center">
                        <Ionicons name="logo-google" size={24} color="white" />
                        <Text className="text-white mx-2">Continue with Google</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSignIn} className="w-full mt-4">
                        <View className="bg-[#1a2950] text-white text-center items-center p-5 rounded-2xl flex-row justify-center">
                        <Ionicons name="logo-apple" size={24} color="white" />
                        <Text className="text-white mx-2">Continue with Apple</Text>
                        </View>
                    </TouchableOpacity>

                    <Text className="text-center mt-3 text-[#1a2950] text-xs">*By signing up, you agree to our terms and conditions</Text>
                </View> */}



            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})