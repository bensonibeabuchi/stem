import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react'
import { useRouter } from 'expo-router';

export default function Privacy() {
    const router = useRouter();
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="mb-12">
        <View className="flex-row items-center p-6">
            <TouchableOpacity onPress={() => router.back()} >
                <FontAwesome6 name="chevron-left" size={24} color="#1a2950"  />
            </TouchableOpacity>
            <View>
                <Text className="font-semibold ml-20 text-lg text-[#1a2950]">Data and Privacy</Text>
            </View>
            {/* <View className="bg-[#1a2950] rounded-full">
                <MaterialIcons name="circle-notifications" size={28} color="white" />            
            </View> */}
        </View>

        
        <View className="p-6">
            <Text className="font-bold text-lg text-[#1a2950]">1. Introduction</Text>
            <Text className="text-[#1a2950] text-justify mt-2">
            Welcome to Stem! We are committed to protecting your privacy and ensuring the security of your personal information. This Data Privacy Policy explains how we collect, use, and protect your data when you use our budget and expense app.
            </Text>

            <Text className="font-bold text-lg text-[#1a2950] mt-4">2. Information We Collect</Text>
            <View className=" mt-2">
                <Text className="text-[#1a2950] text-justify">
                    <Text className='font-bold'>Personal Information:</Text>  When you sign up for Stem, we collect personal information such as your name, email address, and password.
                </Text>
                <Text className="text-[#1a2950] text-justify mt-2">
                <Text className='font-bold'>Financial Data: </Text>We collect information about your income, expenses, budget categories, and transaction details to help you manage your finances.
                </Text>
                <Text className="text-[#1a2950] text-justify mt-2">
                <Text className="font-bold">Device Information:</Text>  We may collect information about the device you use to access Stem, including IP address, device type, and operating system.
                </Text>
                <Text className="text-[#1a2950] text-justify mt-2">
                <Text className="font-bold">Usage Data:</Text> We collect data on how you use the app, such as features accessed, time spent on the app, and interaction patterns.
                </Text>
        
            </View>


            <Text className="font-bold text-lg text-[#1a2950] mt-4">3. How We Use Your Information</Text>
            <View className=" mt-2">
                <Text className="text-[#1a2950] text-justify">
                    <Text className='font-bold'>To Provide Services:</Text>  We use your data to deliver, maintain, and improve our app's features and functionality.
                </Text>
                <Text className="text-[#1a2950] text-justify mt-2">
                <Text className='font-bold'>Personalization: </Text>Your information helps us personalize your experience, including budget recommendations and financial insights.
                </Text>
                <Text className="text-[#1a2950] text-justify mt-2">
                <Text className="font-bold">Communication:</Text>  We may use your contact information to send you updates, notifications, and promotional materials (with your consent).
                </Text>
                <Text className="text-[#1a2950] text-justify mt-2">
                <Text className="font-bold">Security:</Text> We use your information to detect and prevent fraud, unauthorized access, and other security issues.
                </Text>
        
            </View>



            <Text className="font-bold text-lg text-[#1a2950] mt-4">4. Data Sharing and Disclosure</Text>
            <View className=" mt-2">
                <Text className="text-[#1a2950] text-justify">
                    <Text className='font-bold'>Third-Party Service Providers:</Text>  We may share your information with trusted third-party service providers who assist us in operating our app and providing services to you. These providers are bound by strict data protection agreements.
                </Text>
                <Text className="text-[#1a2950] text-justify mt-2">
                <Text className='font-bold'>Legal Requirements: </Text>We may disclose your information if required by law or in response to valid requests by public authorities.
                </Text>
            </View>

            <Text className="font-bold text-lg text-[#1a2950] mt-4">5. Data Security</Text>
            <View className=" mt-2">
                <Text className="text-[#1a2950]">
                We implement robust security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
                </Text>
            </View>

            <Text className="font-bold text-lg text-[#1a2950] mt-4">6. Your Rights and Choices</Text>
            <View className=" mt-2">
                <Text className="text-[#1a2950] text-justify">
                    <Text className='font-bold'>Access and Correction:</Text>  You have the right to access and update your personal information at any time through the app settings.
                </Text>
                <Text className="text-[#1a2950] text-justify mt-2">
                <Text className='font-bold'>Data Deletion: </Text>You can request the deletion of your account and personal data by contacting our support team.
                </Text>
                <Text className="text-[#1a2950] text-justify mt-2">
                <Text className="font-bold">Opt-Out:</Text>  You may opt out of receiving promotional communications by following the unsubscribe instructions provided in our emails.
                </Text>
            </View>

            <Text className="font-bold text-lg text-[#1a2950] mt-4">7. Children's Privacy</Text>
            <View className=" mt-2">
                <Text className="text-[#1a2950]">
                Our app is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected such data, we will take steps to delete it.
                </Text>
            </View>

            <Text className="font-bold text-lg text-[#1a2950] mt-4">8. Changes to This Policy</Text>
            <View className=" mt-2">
                <Text className="text-[#1a2950]">
                We may update this Data Privacy Policy from time to time. Any changes will be posted on this page, and the revised policy will take effect immediately upon posting. We encourage you to review this policy periodically.
                </Text>
            </View>

            <Text className="font-bold text-lg text-[#1a2950] mt-4">9. Contact Us</Text>
            <View className=" mt-2">
                <Text className="text-[#1a2950]">
                If you have any questions or concerns about this Data Privacy Policy or our data practices, please contact us at ibeabuchibenson@gmail.com
                </Text>
            </View>

            <Text className="font-bold text-lg text-[#1a2950] mt-4">10. Acceptance of This Policy</Text>
            <View className=" mt-2">
                <Text className="text-[#1a2950]">
                By using Stem, you agree to the terms outlined in this Data Privacy Policy.
                </Text>
            </View>

            
         
        </View>
    </ScrollView>
  )
}