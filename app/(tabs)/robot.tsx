import { Orbitron_400Regular, useFonts } from '@expo-google-fonts/orbitron'; // Fuente "Orbitron"
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';

export default function RobotControlScreen() {
  const [shooting, setShooting] = useState(false);

  const handleShootPressIn = () => {
    setShooting(true);
    // Vibra el teléfono cuando se mantiene presionado
    Vibration.vibrate([0, 500, 200, 500]); // Patrón de vibración (inicio, duración, pausa, duración)
    console.log("Disparando...");
  };

  const handleShootPressOut = () => {
    setShooting(false);
    Vibration.cancel(); // Detener la vibración cuando se suelta el botón
    console.log("Detenido...");
  };

  const sendMovementCommand = (action: string) => {
    // Aquí iría el código para mover el robot
    console.log(`Movimiento: ${action}`);
  };

  // Cargar la fuente "Orbitron"
  const [fontsLoaded] = useFonts({
    Orbitron_400Regular,  // Cargar la fuente Orbitron
  });

  if (!fontsLoaded) {
    return null; // Asegurarse de que la fuente esté cargada antes de renderizar
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Control del Robot</Text>

      {/* Botón de Disparo */}
      <Text style={styles.controlHeader}>Disparo Hidrogel</Text>
      <TouchableOpacity
        style={[styles.shootButton, shooting && styles.shooting]}
        onPressIn={handleShootPressIn}
        onPressOut={handleShootPressOut}
      >
        <Text style={styles.shootButtonText}>
          {shooting ? 'Disparando...' : 'Mantén presionado para disparar'}
        </Text>
      </TouchableOpacity>

      {/* Controles de Movimiento */}
      <Text style={styles.controlHeader}>Movimiento del Robot</Text>
      <View style={styles.directionButtons}>
        {/* Flecha de avance */}
        <TouchableOpacity style={styles.moveButton} onPress={() => sendMovementCommand('avanzar')}>
          <Text style={styles.moveButtonText}>↑</Text>
        </TouchableOpacity>

        {/* Flechas de dirección izquierda y derecha */}
        <View style={styles.horizontalRow}>
          <TouchableOpacity style={styles.moveButton} onPress={() => sendMovementCommand('izquierda')}>
            <Text style={styles.moveButtonText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moveButton} onPress={() => sendMovementCommand('derecha')}>
            <Text style={styles.moveButtonText}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Flecha de retroceso */}
        <TouchableOpacity style={styles.moveButton} onPress={() => sendMovementCommand('retroceder')}>
          <Text style={styles.moveButtonText}>↓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111',  // Fondo oscuro para un estilo post-apocalíptico
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,  // Reducido el tamaño del título
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,  // Reduje el espacio debajo del título
    color: '#FF6347',  // Naranja brillante para resaltar el título
    fontFamily: 'Orbitron_400Regular',  // Usar la fuente Orbitron
    textShadowColor: '#000',  // Sombra para dar el efecto apocalíptico
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  controlHeader: {
    fontSize: 18,  // Reducido el tamaño de los controles
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
    color: '#FFCC00',  // Amarillo de advertencia para los controles
    fontFamily: 'Orbitron_400Regular',  // Usar la fuente Orbitron
    textShadowColor: '#000',  // Sombra para el texto
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  shootButton: {
    backgroundColor: '#FF6F61',  // Rojo oscuro para el botón de disparo
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderWidth: 2,
    borderColor: '#FF6347',
    borderStyle: 'solid',  // Borde sólido para darle más definición
  },
  shooting: {
    backgroundColor: '#28A745',  // Verde cuando está disparando
  },
  shootButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Orbitron_400Regular',  // Usar la fuente Orbitron
    textShadowColor: '#000',  // Sombra en el texto
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  directionButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  horizontalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  moveButton: {
  backgroundColor: 'linear-gradient(135deg, #FF8C00, #FF4500)',  // Un degradado cálido que da un toque celestial
  padding: 30,  // Aumento de tamaño para que se vea aún más imponente
  borderRadius: 50,  // Bordes aún más redondeados para hacerlo suave y elegante
  width: 100,  // Hacer el botón más grande para un impacto visual más fuerte
  height: 100,
  margin: 20,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#FFD700',  // Sombra dorada para un toque mágico
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.8,
  shadowRadius: 20,
  borderWidth: 4,  // Borde más grueso para un diseño imponente
  borderColor: '#FFD700',  // Borde dorado que da un aire de lujo
  borderStyle: 'solid',
  elevation: 10,  // Elevación más alta para un efecto 3D más fuerte
  transform: [{ scale: 1.1 }],  // Un pequeño efecto de ampliación para resaltar el botón
  fontWeight: 'bold',  // Fuente más audaz para resaltar el texto
  fontSize: 24,  // Tamaño de fuente más grande para dar protagonismo
},
    
  moveButtonText: {
    color: '#fff',
    fontSize: 15,  // Aumentado el tamaño del texto para mayor visibilidad
    fontFamily: 'Orbitron_400Regular',  // Usar la fuente Orbitron
    textAlign: 'center',
    textShadowColor: '#fff',  // Sombra en el texto para efecto neón
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
});
