import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [connected, setConnected] = useState(false);

  const connectBluetooth = async () => {
    // Lógica para conectar con HC-05
    setConnected(true); // Simulación de la conexión
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con estilo metálico y amarillo de advertencia */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Bienvenido al Laboratorio</Text>
      </View>

      {/* Conexión Bluetooth */}
      <View style={styles.bluetoothContainer}>
        <TouchableOpacity
          style={[styles.button, connected ? styles.buttonDisconnected : styles.buttonConnected]}
          onPress={connectBluetooth}
        >
          <Text style={styles.buttonText}>
            {connected ? 'Desconectar' : 'Conectar a HC-05'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.connectionStatus}>
          {connected ? 'Conectado' : 'Desconectado'}
        </Text>
      </View>

      {/* Rutas hacia otras pantallas */}
      <View style={styles.linksContainer}>
        <Link href="/(tabs)/explore" style={styles.link}>Ir a Música</Link>
        <Link href="/(tabs)/robot" style={styles.link}>Control del Robot</Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',  // Fondo gris metálico oscuro para el fondo
    justifyContent: 'center', // Centrado verticalmente
    alignItems: 'center',     // Centrado horizontalmente
    paddingHorizontal: 20,    // Margen horizontal para que no quede pegado a los bordes
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#444',  // Gris metálico más oscuro para el encabezado
    borderBottomWidth: 5,
    borderBottomColor: '#FFCC00',  // Amarillo de advertencia en el borde inferior
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    transform: [{ rotate: '3deg' }], // Rotación para un toque caótico
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5, // Sombra sutil para el encabezado
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFCC00',  // Amarillo brillante de advertencia
    textAlign: 'center',
    textShadowColor: '#000',  // Sombra para dar contraste
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  bluetoothContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  connectionStatus: {
    color: '#FFCC00',  // Amarillo brillante de advertencia para el estado de conexión
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    width: '80%', // Hacer el botón más grande y centrado
  },
  buttonConnected: {
    backgroundColor: '#28A745', // Verde brillante cuando está conectado
  },
  buttonDisconnected: {
    backgroundColor: '#FF6347', // Rojo cuando está desconectado
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linksContainer: {
    marginTop: 30,
  },
  link: {
    color: '#FFCC00',  // Amarillo brillante
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
});
