import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import {supabase} from '../utils/supabase'
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CategoryItemList from './components/CategoryItemList';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { client } from '../utils/KindeConfig';


export default function CategoryDetails() {
    const {categoryId} = useLocalSearchParams();
    const [categoryData, setCategoryData] = useState([])
    const [totalCost, setTotalCost] = useState();
    const [percentage, setPercentage] = useState()
    const router = useRouter()
    const navigation = useNavigation();

    
    useEffect(() => {
      if (categoryId) {
        getCategoryDetails();
      }
    }, [categoryId]);

    useEffect(() => {
      if (categoryData) {
        calTotalPercentage();
      }
    }, [categoryData]);

    const getCategoryDetails = async () => {
      const { data, error } = await supabase
        .from('Category')
        .select('*, CategoryItems(*)')
        .eq('id', categoryId);
      setCategoryData(data[0]);
    };

    const calTotalPercentage = () => {
      let total = 0;
      categoryData?.CategoryItems?.forEach(item => {
        total += item.cost;
      });

      setTotalCost(total);
      const assignedBudget = categoryData?.assigned_budget || 0;
      let percentage = assignedBudget ? (total / assignedBudget) * 100 : 0;
      if (percentage > 100) {
        percentage = 100;
      }
      setPercentage(isNaN(percentage) ? 0 : percentage);

    };

    const onDeleteCategory =() => {
      console.log(categoryData.id)
      Alert.alert('Delete Category', 'Do you really want to delete this category', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style:'destructive',
          onPress: async() => {
            const { error } = await supabase
              .from('Category')
              .delete()
              .eq('id', categoryData.id)

            router.replace('/(tabs)')
            Alert.alert('Deleted', 'Category deleted successfully')
            }
          }
      ])
    }


  return (
    <View className="p-5 flex-1">

    <ScrollView className="pt-4" showsVerticalScrollIndicator={false} >

      <TouchableOpacity onPress={() => router.replace('/(tabs)')} className="px-4 mt-3">
        <FontAwesome6 name="chevron-left" size={24} color="black"  />
      </TouchableOpacity>
      <View className="p-4 flex-row justify-between items-center mt-3">

        <View className="flex-row space-x-4 items-center">
          <View style={{backgroundColor: categoryData.color}} className="justify-center rounded-2xl items-baseline">
            <Text className="text-4xl p-4">{categoryData.icon}</Text>
          </View>
          <View>
            <Text className="font-bold text-lg">{categoryData?.category_name}</Text>
            <Text>{categoryData?.CategoryItems?.length} Item{categoryData?.CategoryItems?.length === 1 ? '' : 's'}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => onDeleteCategory()} className="bg-red-500 p-2 rounded-lg">
          <FontAwesome6 name="trash-can" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* PROGRESS BAR */}
      <View className="flex-row justify-between mt-4 px-4">
        <Text className="font-semibold">&#8358;{Number(totalCost).toLocaleString()}</Text>
        <> 
          { percentage >= 100 ? <Text className="text-red-500 font-semibold">Overbudget by &#8358;{Number(totalCost - categoryData.assigned_budget).toLocaleString('en-US')}</Text> : <>
            <Text className="font-semibold">Total Budget: &#8358;{Number(categoryData.assigned_budget).toLocaleString()}</Text>
          </> }
        
        </>
      </View>

      <View className="w-full h-2 bg-green-500 mt-4 rounded-2xl">
        <View style={{ width: `${percentage || 0}%` }} className="w-4/12 h-2 bg-red-500 rounded-2xl"></View>

      </View>

      <CategoryItemList categoryData={categoryData}/>

   
      
    </ScrollView>
    <TouchableOpacity onPress={() => navigation.navigate('add-new-category-item', { categoryId })} className="absolute bottom-0 right-0 m-12">
        <AntDesign name="pluscircle" size={54} color="#1a2950" />
    </TouchableOpacity>
    </View>

  )
}