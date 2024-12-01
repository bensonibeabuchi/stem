import { Stack } from 'expo-router/stack';


export default function Layout() {

  return (
    <Stack initialRouteName='(tabs)' screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen name="(tabs)"  options={{ headerShown: false }} />

      <Stack.Screen name="add-new-category" options={{
        presentation: 'modal',
        headerShown: true,
        headerTitle: 'Add New Category',
        }} />

      <Stack.Screen name="add-new-category-item" options={{
        presentation: 'modal',
        headerShown: true,
        headerTitle: 'Add New Item',
        }} />

      <Stack.Screen name="category-details" options={{
        presentation: 'modal',
        headerShown: false,
        headerTitle: 'Category',
        }} />
        
      <Stack.Screen name="register/index" options={{
        presentation: 'modal',
        headerShown: true,
        headerTitle: 'Register',
          }} />
        
        <Stack.Screen name="edit-profile/index" options={{
        presentation: 'modal',
        headerShown: false,
        headerTitle: 'Edit Profile',
          }} />

        <Stack.Screen name="privacy/index" options={{
        presentation: 'modal',
        headerShown: false,
        headerTitle: 'Data and Privacy',
          }} />

        <Stack.Screen name="cards/index" options={{
        presentation: 'modal',
        headerShown: false,
        headerTitle: 'Data and Privacy',
          }} />

       <Stack.Screen name="components/LoginScreen" options={{
        presentation: 'modal',
        headerShown: true,
        headerTitle: 'Login',
          }} />

    </Stack>
  );
}
