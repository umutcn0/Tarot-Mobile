import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Home, History, Profile, Purchase } from '../screens/home';
import { Platform } from 'react-native';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1e1b4b',
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          paddingHorizontal: 20,
          height: Platform.OS === 'android' ? 70 : 80,
          paddingTop: 5,
        },
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'History') {
            iconName = 'eye-outline';
          } else if (route.name === 'Purchase') {
            iconName = 'diamond-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#5e646e',
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{ tabBarLabel: 'Anasayfa' }}
      />
      <Tab.Screen 
        name="History" 
        component={History}
        options={{ tabBarLabel: 'Fal Geçmişi' }}
      />
      <Tab.Screen 
        name="Purchase" 
        component={Purchase}
        options={{ tabBarLabel: 'Purchase' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{ tabBarLabel: 'Profil' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
