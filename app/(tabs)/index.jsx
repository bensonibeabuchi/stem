import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  RefreshControl 
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import CircularChat from '../components/CircularChat';
import CategoryList from '../components/CategoryList';
import services from '../../utils/services';
import { client } from '../../utils/KindeConfig';

export default function App() {
  const navigation = useNavigation();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch user details, check auth, and fetch data
  const fetchData = async () => {
    setLoading(true);

    // Check user authentication
    const isAuthenticated = await services.getData('login');
    if (isAuthenticated !== 'true') {
      router.replace('components/LoginScreen');
      return;
    }

    // Fetch user profile
    const userProfile = await client.getUserDetails();
    setUser(userProfile);

    // Fetch categories and items
    const { data, error } = await supabase
      .from('Category')
      .select('*, CategoryItems(*)')
      .eq('created_by', userProfile?.email)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching category data:', error);
    } else {
      setCategoryList(data || []);
      groupDataByMonth(data || []);
    }

    setLoading(false);
  };

  // Group data by month
  const groupDataByMonth = (categories) => {
    const grouped = categories.reduce((acc, category) => {
      const date = new Date(category.created_at);
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

      if (!acc[monthYear]) acc[monthYear] = { items: [], totalBudget: 0, totalSpent: 0 };
      acc[monthYear].items.push(category);

      return acc;
    }, {});

    // Calculate budgets and spending
    Object.keys(grouped).forEach((monthYear) => {
      const monthData = grouped[monthYear];
      monthData.totalBudget = monthData.items.reduce((sum, category) => sum + category.assigned_budget, 0);
      monthData.totalSpent = monthData.items.reduce(
        (sum, category) => sum + category.CategoryItems.reduce((itemSum, item) => itemSum + item.cost, 0),
        0
      );
    });

    setGroupedData(grouped);
  };

  const getCurrentMonthData = () => {
    const currentDate = new Date();
    const currentMonthYear = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;
    return groupedData[currentMonthYear] || { items: [], totalBudget: 0, totalSpent: 0 };
  };

  const currentMonthData = getCurrentMonthData();

  // Fetch data when page is focused
  // useFocusEffect(() => {
  //   fetchData();
  // });
  useEffect(() => {
    fetchData();
  },[])

  return (
    <SafeAreaView className="pt-12 bg-[#eeeeee] flex-1">
      <StatusBar barStyle="default" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor="#1a2950"
            colors={['#1a2950']}
            refreshing={loading}
            onRefresh={fetchData}
          />
        }
      >
        <View className="bg-[#CDD3E3] h-3/4 w-full absolute rounded-b-[100px]" />
        <Header user={user} />
        <View className="p-4">
          <CircularChat 
            categoryList={currentMonthData.items} 
            totalBudget={currentMonthData.totalBudget} 
            groupedData={groupedData} 
          />
          <CategoryList 
            categoryList={currentMonthData.items} 
            groupedData={groupedData} 
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('add-new-category')}
        className="absolute bottom-0 right-0 m-3"
      >
        <AntDesign name="pluscircle" size={54} color="#1a2950" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
