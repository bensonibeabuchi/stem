import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'expo-router';

export default function CategoryItemList({categoryData}) {
  const router = useRouter();
  
  const onDeleteItem =(id) => {
      Alert.alert('Delete Item?', 'Do you really want to delete this item?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style:'destructive',
          onPress: async() => {
            const { error } = await supabase.from('CategoryItems')
              .delete()
              .eq('id',id)

            Alert.alert('Deleted', 'Category deleted successfully')
            router.replace({
              pathname: '/category-details',
              params:{
                  categoryId: categoryData.id
                }
              })
            }
          }
      ])
    }
  

  return (
    <View className="mt-5">
      <Text className="text-xl font-semibold">Item List</Text>

      <View>
        {categoryData?.CategoryItems?.length > 0 ? categoryData?.CategoryItems?.map((item, index) => (
          
            <View key={index} className="justify-between flex-row items-center">
                <View className="p-2 flex-row">

                    <Image
                    source={{uri:item?.image}}
                    width={100}
                    height={100}
                    transition={1000}
                    className="h-14 w-14 rounded-xl"
                    />
                    <View className="ml-2">
                        <Text className="text-lg font-semibold">{item.name}</Text>
                        <Text>&#8358;{item.cost.toLocaleString()}</Text>
                    </View>

                </View>
                <View>
                  <TouchableOpacity onPress={() => onDeleteItem(item.id)} className=" p-2 rounded-lg items-center">
                    <FontAwesome6 name="trash-can" size={16} color="red" />
                  </TouchableOpacity>
                </View>
                
            </View>
        )) :
        <>
        <Text className="mt-4 font-medium text-gray-300 text-lg">
            No Items found
        </Text>
        </>
        }
      </View>


    </View>
  )
}