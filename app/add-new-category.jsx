import { View, Text, TextInput, SafeAreaView, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import  Colors  from './../utils/Colors'
import ColorPicker from './components/ColorPicker'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { supabase } from '../utils/supabase';
import { useRouter } from 'expo-router';
import services from '../utils/services';
import { client } from '../utils/KindeConfig';

export default function AddNewCategory() {
    const [selectedIcon, setSelectedIcon] = useState('IC')
    const [selectedColor, setSelectedColor] = useState(Colors.PURPLE)
    const [categoryName, setCategoryName] = useState("");
    const [totalBudget, setTotalBudget] = useState("");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    useEffect(() => {
      checkUserAuth();
      getUserDetails();
    }, [])

    const checkUserAuth = async () => {
      const result = await services.getData('login');
      if (result!=='true')
        {
          router.replace('components/LoginScreen')
        }
    }
  
    const getUserDetails = async () => {
      const userProfile = await client.getUserDetails();
      setUser(userProfile)

    }
  

    const onCreateCategory = async() => {
        setLoading(true)
        const {data, error} = await supabase.from('Category')
            .insert([{
              category_name: categoryName,
              assigned_budget: totalBudget,
              icon: selectedIcon,
              color: selectedColor,
              created_by: user.email,
              }]).select();
            
            setLoading(false)

            if(data){
              router.replace({
                pathname: '/category-details',
                params: {
                  categoryId: data[0].id
                }
              })
              Alert.alert('Category Created', 'Category created successfully',);
              setCategoryName("");
              setTotalBudget("");
            } else {
              console.log(error)
              Alert.alert('Failed', 'Failed to create category')
            }
    }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="m-5 p-5">
          <View className="justify-center items-center">
            <TextInput
              maxLength={2}
              onChangeText={(value) => setSelectedIcon(value)}
              style={{ backgroundColor: selectedColor }}
              className="rounded-full px-7 py-5 text-2xl text-center text-white font-bold"
            >
              {selectedIcon}
            </TextInput>
            <ColorPicker selectedColor={selectedColor} setSelectedColor={(color) => setSelectedColor(color)} />
          </View>

          {/* Add category name and total budget section */}
          <View className="rounded-xl bg-white items-center flex-row p-4 border truncate mt-5 shadow-md">
            <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
            <TextInput
              onChangeText={(value) => setCategoryName(value)}
              autoCapitalize='words'
              placeholder='Category Name'
              className="w-full p-2"
            />
          </View>

          <View className="rounded-xl bg-white items-center flex-row p-4 border truncate mt-5 shadow-md">
            <FontAwesome6 name="naira-sign" size={20} color={Colors.GRAY} />
            <TextInput
              onChangeText={(value) => {
                // Filter out non-numeric characters
                const numericValue = value.replace(/[^0-9]/g, '');
                setTotalBudget(numericValue);
              }}
              keyboardType='numeric'
              placeholder='Total Budget'
              className="w-full p-2"
            />
          </View>

          <TouchableOpacity
            disabled={!categoryName || !totalBudget || loading}
            onPress={onCreateCategory}
            className="rounded-xl bg-[#021239] p-6 my-7"
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-white text-center font-semibold">Create</Text>
            )}
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}