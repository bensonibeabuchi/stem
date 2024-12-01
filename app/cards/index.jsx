import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ConnectCards() {
    const router = useRouter();
  return (
    <View className="">
          <View className="flex-row items-center p-6">
            <TouchableOpacity onPress={() => router.back()} >
                <FontAwesome6 name="chevron-left" size={24} color="#1a2950"  />
            </TouchableOpacity>
            <View>
                <Text className="font-semibold text-lg ml-20 text-[#1a2950]">Connect cards</Text>
            </View>
        </View>

        <View className="text-center items-center justify-center mt-32">
            <Text className="text-gray-500 text-xl" >Coming Soon...</Text>
        </View>

    </View>
  )
}