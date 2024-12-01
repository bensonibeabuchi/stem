import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function CategoryList({categoryList, groupedData}) {
    const router = useRouter()
    

    const calculateTotalCost = (CategoryItems) => {
        let totalCost = 0
        CategoryItems?.forEach(item => {
            totalCost = totalCost +item.cost
        });

        return totalCost;

    }

    const onCategoryClick = (category) => {
        router.push({
            pathname: '/category-details',
            params:{
                categoryId: category.id
            }
        })
     }


  return (
    <View>
      <Text className="font-bold text-2xl mb-4 text-[#021239]">Latest Budget</Text>
      <View>
        {categoryList?.map((category, index) => (
            <TouchableOpacity onPress={() =>onCategoryClick(category)} key={index} className="mb-4">
                <View className="flex-row gap-2 bg-white shadow-md p-3 rounded-2xl w-full">

                    <View style={{backgroundColor: category?.color}} className="rounded-2xl justify-center items-baseline">
                        <Text className="text-2xl p-4">
                            {category?.icon}
                        </Text>
                    </View>
                    <View className="p-2 flex-row items-center justify-between w-[75%]">
                        <View>
                            <Text className="font-bold text-lg">{category?.category_name}</Text>
                            <Text>{category?.CategoryItems?.length} Item</Text>
                        </View>
                        <View>
                            <Text>Total Budget</Text>
                        <Text className="font-bold"> &#8358;{category?.assigned_budget.toLocaleString()}</Text>
                        {/* <Text className="font-bold">&#8358;{calculateTotalCost(category?.CategoryItems)}</Text> */}
                        </View>
                    </View>

                </View>

            </TouchableOpacity>
            
        ))}
      </View>
    </View>
  )
}