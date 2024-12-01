import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, RefreshControl } from 'react-native';
import { supabase } from '../../utils/supabase';
import { client } from '../../utils/KindeConfig';

export default function History() {
  const [categoryListData, setCategoryListData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  // Fetch data on mount and when refreshed
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const user = await client.getUserDetails();
    if (user) {
      const [categoryItems, categories] = await Promise.all([
        supabase
          .from('CategoryItems')
          .select('*')
          .eq('created_by', user.email),
        supabase
          .from('Category')
          .select('*')
          .eq('created_by', user.email),
      ]);

      setCategoryListData(categoryItems.data || []);
      setCategoryData(categories.data || []);
      groupDataByMonth(categoryItems.data || [], categories.data || []);
    }
  };

  // const groupDataByMonth = (items, categories) => {
  //   const grouped = items.reduce((acc, item) => {
  //     const date = new Date(item.created_at);
  //     const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

  //     if (!acc[monthYear]) acc[monthYear] = { items: [], totalBudget: 0, totalSpent: 0 };

  //     acc[monthYear].items.push(item);
  //     return acc;
  //   }, {});

  //   // Calculate budgets and spending
  //   Object.keys(grouped).forEach((monthYear) => {
  //     const monthData = grouped[monthYear];

  //     // Calculate total budget for the month
  //     monthData.totalBudget = categories
  //       .filter((category) => {
  //         const date = new Date(category.created_at);
  //         const categoryMonthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  //         return categoryMonthYear === monthYear;
  //       })
  //       .reduce((sum, category) => sum + category.assigned_budget, 0);

  //     // Calculate total spent for the month
  //     monthData.totalSpent = monthData.items.reduce((sum, item) => sum + item.cost, 0);
  //   });

  //   setGroupedData(grouped);
  // };


  const groupDataByMonth = (items, categories) => {
    // Create a map for quick category lookup by ID
    const categoryMap = categories.reduce((acc, category) => {
      acc[category.id] = category;
      return acc;
    }, {});
  
    const grouped = items.reduce((acc, item) => {
      const date = new Date(item.created_at);
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  
      if (!acc[monthYear]) acc[monthYear] = { items: [], totalBudget: 0, totalSpent: 0 };
  
      // Attach category data to the item
      const category = categoryMap[item.category_id];
      const itemWithCategory = {
        ...item,
        categoryName: category?.name || 'Unknown', // Add category name
        categoryDetails: category || null,       // Include full category details
      };
  
      acc[monthYear].items.push(itemWithCategory);
      return acc;
    }, {});
  
    // Calculate budgets and spending
    Object.keys(grouped).forEach((monthYear) => {
      const monthData = grouped[monthYear];
  
      // Calculate total budget for the month
      monthData.totalBudget = categories
        .filter((category) => {
          const date = new Date(category.created_at);
          const categoryMonthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
          return categoryMonthYear === monthYear;
        })
        .reduce((sum, category) => sum + category.assigned_budget, 0);
  
      // Calculate total spent for the month
      monthData.totalSpent = monthData.items.reduce((sum, item) => sum + item.cost, 0);
    });
  
    setGroupedData(grouped);
  };
  


  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };


  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          tintColor="#1a2950"
          colors={['#1a2950']}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    >
      {Object.keys(groupedData).map((monthYear) => {
        const { items, totalBudget, totalSpent } = groupedData[monthYear];
        return (
          <View key={monthYear} className="bg-white shadow-md p-2 mt-2 m-4 rounded-xl">
            <Text className="text-lg font-bold text-[#1a2950]">{monthYear}</Text>
            <View className="bg-[#1a2950] p-4 mt-1 rounded-lg flex-row items-center justify-between">
              <Text className="text-white">Total Budget</Text>
              <Text className="text-white font-bold truncate">
                &#8358;{Number(totalBudget).toLocaleString()}
              </Text>
            </View>
            <View className="p-4">
              {items.map((item, index) => (
        
                <View key={index} className="flex-row items-center justify-between p-2 border-b-[0.2px]">
                  <View className="flex-row items-center space-x-3">
                    <Image
                      source={{ uri: item?.image }}
                      className="h-12 w-12 rounded-xl"
                    />
                    <View className="">
                      <Text className="font-bold">{item.name}</Text>
                      <Text className="text-xs">{item.categoryDetails.category_name}</Text>
                    </View>
                  </View>
                  <Text className="font-bold">&#8358;{Number(item.cost).toLocaleString()}</Text>
                </View>
              ))}
              <Text className="p-4 font-medium">
                Total spent: <Text className="font-bold">&#8358;{Number(totalSpent).toLocaleString()}</Text> out of{' '}
                <Text className="font-bold">&#8358;{Number(totalBudget).toLocaleString()}</Text> in {monthYear}.{' '}
                {totalSpent > totalBudget ? (
                  <Text className="text-red-500">
                    You exceeded your budget by{' '}
                    <Text className="font-bold">&#8358;{Number(totalSpent - totalBudget).toLocaleString()}</Text>
                  </Text>
                ) : (
                  <Text className="text-green-500">
                    You have met your budget by{' '}
                    <Text className="font-bold">&#8358;{Number(totalBudget - totalSpent).toLocaleString()}</Text>
                  </Text>
                )}
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
