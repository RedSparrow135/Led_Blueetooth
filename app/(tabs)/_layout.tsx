import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
              paddingTop: 30, // Ajustamos el espacio superior para evitar la cámara
            },
            default: {},
          }),
        }}
      >
        {/* Pantalla de Conexión */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />

        {/* Pantalla de Música */}
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Música',
            tabBarIcon: ({ color }) => (
              <Image
                source={require('@/assets/images/Music.png')}
                style={[{ width: 28, height: 28, tintColor: color }, styles.icon]}
                resizeMode="contain"
              />
            ),
          }}
        />

        {/* Pantalla de Control del Robot */}
        <Tabs.Screen
          name="robot"
          options={{
            title: 'Control del Robot',
            tabBarIcon: ({ color }) => (
              <Image
                source={require('@/assets/images/Creaneo.png')}
                style={[{ width: 28, height: 28, tintColor: color }, styles.icon]}
                resizeMode="contain"
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingTop: 30, // Para asegurar que el encabezado no sea tapado
  },
});
