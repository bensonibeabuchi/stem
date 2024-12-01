import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { supabase } from '../utils/supabase';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer'
import { client } from '../utils/KindeConfig';
import services from '../utils/services';



export default function AddNewCategoryItem() {
  const placeholder = 'https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small_2x/no-image-available-icon-vector.jpg'
  const router = useRouter();
  const route = useRoute()
  const { categoryId } = route.params;
  const [image, setImage] = useState(placeholder);
  const [previewImage, setPreviewImage] = useState(placeholder);
  const [categoryData, setCategoryData] = useState([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});


  useEffect(() => {
    checkUserAuth();
    getUserDetails();
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

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

  const getCategoryDetails = async () => {
    const { data, error } = await supabase
      .from('Category')
      .select('*, CategoryItems(*)')
      .eq('id', categoryId);

    if (error) {
      console.error(error);
    } else {
      setCategoryData(data);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.4,
      base64: true,
    });
  
    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  };
  
  const onClickAdd = async () => {
    setLoading(true);
    try {
      let fileUrl = placeholder;
  
      if (image !== placeholder) {
        const fileName = Date.now();
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('stem-images')
          .upload(fileName + '.png', decode(image), {
            contentType: 'image/png',
          });
  
        if (uploadError) {
          throw uploadError;
        }
  
        fileUrl = `https://iuwvsqajcrcurnegxqvc.supabase.co/storage/v1/object/public/stem-images/${fileName}.png`;
      }
      const user = await client.getUserDetails();
      console.log(user.email)
      const { data, error } = await supabase
        .from('CategoryItems')
        .insert([{
          name: name,
          cost: cost,
          image: fileUrl,
          note: note,
          category_id: categoryId,
          created_by: user.email
        }]).select();
  
      if (error) {
        console.error("ERROR", error);
        alert(error);
      } else {

        setLoading(false);
        Alert.alert("Added", 'New item added successfully');
        router.replace({
          pathname: '/category-details',
          params: {
            categoryId: categoryId
          }
        });
      }
    } catch (error) {
      console.error("ERROR during the upload or insert process:", error);
      setLoading(false);
      Alert.alert("Error", "An error occurred during the create process");
    }
  };


  return (
  <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 150: 0} >
    <ScrollView>
      <View className="p-4">
          {/* <Text>Category name: {categoryId}</Text> */}
          {/* <Text>Category name:</Text> */}
          <Text className="text-2xl font-bold text-[#1a2950] px-2">{categoryData[0]?.category_name}</Text>
          <TouchableOpacity onPress={() => pickImage()} className="p-2 w-36">
            <Image source={{uri:previewImage}} width={100} height={100} transition={1000} className="h-32 w-32 rounded-xl  "/>
          </TouchableOpacity>
          
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="items-start justify-center w-full">

                <Text className="p-2">Item Name:</Text>
                <View className="p-2 w-full rounded-xl border-[#bdc3d3] text-[#021239] border mb-4 flex-row items-center justify-between">
                <FontAwesome name="pencil-square-o" size={24} color="#bdc3d3" />
                  <TextInput
                    placeholder='Item Name'
                    autoCapitalize={'words'}
                    value={name}
                    onChangeText={(value)=>setName(value)}
                    className="w-11/12 h-full py-3 text-left pl-2"
                    />
                    
                </View>

                <Text className="p-2">Cost:</Text>
                <View className="p-2 w-full rounded-xl border-[#bdc3d3] text-[#021239] border mb-4 flex-row items-center justify-between">
                  <FontAwesome6 name="naira-sign" size={24} color="#bdc3d3" />
                  <TextInput
                      placeholder='Cost'
                      value={cost}
                      onChangeText={(value) => {
                        // Filter out non-numeric characters
                        const numericValue = value.replace(/[^0-9]/g, '');
                        setCost(numericValue);
                      }}
                      keyboardType='numeric'
                      className="w-11/12 h-full py-3 text-left pl-2"
                      />
                </View>

                <Text className="p-2">Note:</Text>
                <View className="p-2 w-full rounded-xl border-[#bdc3d3] text-[#021239] border mb-4 flex-row items-center justify-between">
                <FontAwesome name="file-text-o" size={24} color="#bdc3d3" />
                  <TextInput
                      placeholder='Note'
                      value={note}
                      onChangeText={(value)=>setNote(value)}
                      autoCapitalize={'words'}
                      className="w-11/12 py-3 text-left pl-2"
                      multiline={true}
                      numberOfLines={3}
                      />
                </View>


               
                <TouchableOpacity disabled={!name || !cost } onPress={() => onClickAdd()} className="w-full">
                    <View className="bg-[#1a2950] text-white text-center items-center p-5 rounded-xl">
                  {loading ? <ActivityIndicator /> : <Text className="text-white text-center w-full">Add Item</Text> }
                      
                    </View>
                </TouchableOpacity>

              </View>
        </TouchableWithoutFeedback>
        </View>
    </ScrollView>
  </KeyboardAvoidingView>
  )
}