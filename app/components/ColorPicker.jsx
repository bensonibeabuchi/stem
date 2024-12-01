import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../utils/Colors'

export default function ColorPicker({selectedColor, setSelectedColor}) {
  return (
    <View className="flex-row gap-5 mt-4">
      {Colors.COLOR_LIST.map((color, index) => (
        <TouchableOpacity
        key={index}
        style={[{ 
          backgroundColor: color
        }, selectedColor==color && { borderWidth:4}]}
        onPress={() => setSelectedColor(color)}
        className = "h-8 w-8 rounded-full" >

        </TouchableOpacity>
      ))}
    </View>
  )
}