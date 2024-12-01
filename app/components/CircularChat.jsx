import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import PieChart from 'react-native-pie-chart'
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import Entypo from '@expo/vector-icons/Entypo';


export default function CircularChat({categoryList, groupedData }) {
  const widthAndHeight = 150
  const [values, setValues]= useState([1]);
  const [sliceColor, setSliceColor] = useState(['#d1d1d1'])
  const [totalBudget, setTotalBudget] = useState()
  const [totalSpent, setTotalSpent] = useState()

  useEffect(() => {
    updateCircularChart();
    calculateTotalCost();
  }, [categoryList]);


  const calculateTotalCost = (categoryList) => {
    return categoryList?.reduce((total, category) => {
      return total + category.CategoryItems?.reduce((subTotal, item) => subTotal + item.cost, 0);
    }, 0);
  };

  const totalCost = calculateTotalCost(categoryList);

  const updateCircularChart = () => {
    let totalBudget = 0
    let totalSpent = 0
    const newSliceColors = ['#d1d1d1'];
    const newValues = [1];
    let otherCost = 0;

    categoryList?.forEach((category, index) => {
      if (index < 5) {
        totalBudget = totalBudget+category.assigned_budget
        // console.log('FIRST:',totalBudget)
        totalSpent = totalSpent+category.CategoryItems.cost
        if (category.assigned_budget > 0) {
          // totalBudget = totalBudget+category.assigned_budget
          // console.log('SECOND:',totalBudget)
          newValues.push(category.assigned_budget);
          newSliceColors.push(Colors.COLOR_LIST[index % Colors.COLOR_LIST.length]);
        }
      } else {
        otherCost += category.assigned_budget;
        totalBudget = totalBudget+category.assigned_budget
        totalSpent = totalSpent+category.CategoryItems.cost
        
      }
    });

    if (otherCost > 0) {
      newValues.push(otherCost);
      newSliceColors.push(Colors.PRIMARY); // Color for "Others"
      
    }

    setValues(newValues);
    setSliceColor(newSliceColors);
    setTotalBudget(totalBudget);
    setTotalSpent(totalSpent)

  };

  return (
    <View>
      <View className="">
        <View className="bg-[#1a2950] p-8 rounded-2xl">
          <View className="flex-row items-center justify-between">
            <Text className="text-white">Total Spent for {Object.keys(groupedData)[0]}</Text>
            <Entypo name="dots-three-horizontal" size={24} color="white" />
          </View>

          { totalCost ? 
          <View>
            <Text className="text-white text-3xl font-bold truncate">&#8358;{Number(totalCost).toLocaleString()}</Text>
          </View>
          :
          <View>
            <Text className="text-white text-3xl font-bold truncate">&#8358;0</Text>
          </View>}

          
        </View>

        <View className="flex-row mt-2 justify-center">
          <View className="bg-[#1a2950] p-6 m-1 rounded-2xl w-2/4">
            <Text className="text-white text-xs">Total Budget for {Object.keys(groupedData)[0]}</Text>
            <Text className="text-white text-lg font-bold truncate">&#8358;{Number(totalBudget).toLocaleString()}</Text>
            
          </View>

          <View className="bg-[#576ca0] p-6 m-1 rounded-2xl w-2/4">
            <Text className="text-white text-xs">Left to spend for {Object.keys(groupedData)[0]}</Text>

            { 
            totalBudget - totalCost ? 
              <View>
                <Text className="text-white text-lg font-bold truncate">&#8358;{Number(totalBudget - totalCost).toLocaleString()}</Text>
              </View>
              :
              <View>
                <Text className="text-white text-lg font-bold truncate">&#8358;0</Text>
              </View>
          }
          </View>

        </View>

      </View>
      
      <View className="p-4 bg-white shadow-lg rounded-2xl my-4">
        <View className="flex-row items-center gap-8">
          <View>
            <PieChart
                widthAndHeight={widthAndHeight}
                series={values}
                sliceColor={sliceColor}
                coverRadius={0.55}
                coverFill={null}
              />
          </View>
          <View>

          {
            categoryList?.length === 0 ? (
              <View className="flex flex-row items-center space-x-1">
                <FontAwesome name="circle" size={24} color="#d1d1d1" />
                <Text>N/A</Text>
             </View>
           ) : (
              categoryList?.map((category, index) => index<=5&& (
                <View key={index} className="flex flex-row items-center space-x-2">
                  <FontAwesome name="circle" size={24} color={Colors.COLOR_LIST[index]} />
                  <Text>{index<5? category.category_name : 'Others'}</Text>
                </View>
              ))
           )
          }
           
          
          
        </View>
      </View>
      
      
    </View>
    </View>
  )
}