import { Orbitron_400Regular, useFonts } from '@expo-google-fonts/orbitron'; // Fuente "Orbitron"
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Slider } from 'react-native-elements'; // Importa Slider desde React Native Elements

export default function ExploreScreen() {
  const [selectedSong, setSelectedSong] = useState<string | null>(null);  // Guardar la canción seleccionada
  const [volume, setVolume] = useState<number>(50);  // Volumen visualizado de 0 a 100
  const [isPlaying, setIsPlaying] = useState(false);  // Estado de la canción (reproduciendo/pausada)
  
  const [fontsLoaded] = useFonts({
    Orbitron_400Regular,  // Cargar la fuente Orbitron
  });

  if (!fontsLoaded) {
    return null; // Asegurarse de que la fuente esté cargada antes de renderizar
  }

  const songList = Array.from({ length: 500 }, (_, i) => `Canción ${i + 1}`);

  const playSong = (song: string) => {
    setSelectedSong(song);
    setIsPlaying(true);
    console.log(`Reproduciendo: ${song}`);
    // Aquí puedes agregar la lógica para enviar el comando de reproducción al dispositivo
  };

  const pauseSong = () => {
    setIsPlaying(false);
    console.log(`Pausando: ${selectedSong}`);
    // Aquí puedes agregar la lógica para enviar el comando de pausa
  };

  const stopSong = () => {
    setIsPlaying(false);
    setSelectedSong(null);
    console.log('Deteniendo la música');
    // Aquí puedes agregar la lógica para detener la reproducción
  };

  const adjustVolume = (newVolume: number) => {
    setVolume(newVolume);  // Volumen ajustado de 0 a 100
    console.log(`Volumen ajustado a: ${newVolume}`);
    // Aquí puedes agregar la lógica para ajustar el volumen del dispositivo
  };

  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.header}>Lista de Canciones</Text>

      {/* Mostrar la canción seleccionada */}
      <Text style={styles.selectedSongText}>
        {selectedSong ? `Canción seleccionada: ${selectedSong}` : 'Selecciona una canción'}
      </Text>

      {/* Cuadro para la lista de canciones */}
      <View style={styles.songListContainer}>
        <FlatList
          data={songList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.songButton}
              onPress={() => playSong(item)}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Controles de reproducción */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.gothicButton}
          onPress={isPlaying ? pauseSong : () => playSong(selectedSong || '')}
        >
          <Text style={styles.buttonText}>{isPlaying ? 'Pausar' : 'Reproducir'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gothicButton}
          onPress={stopSong}
        >
          <Text style={styles.buttonText}>Detener</Text>
        </TouchableOpacity>
      </View>

      {/* Control de volumen usando Slider de React Native Elements */}
      <Text style={styles.volumeText}>Volumen: {volume}</Text>
      <Slider
        value={volume} // Escala de 0 a 100
        onValueChange={adjustVolume}
        minimumValue={0}
        maximumValue={100}
        step={1}
        thumbTintColor="#FFCC00"
        minimumTrackTintColor="#FFCC00"
        maximumTrackTintColor="#888"
        style={styles.volumeSlider}
        animateTransitions={true}  // Hace que el slider sea más fluido
        trackStyle={{ borderRadius: 10 }}  // Estilo de la pista
        thumbStyle={{ width: 25, height: 25, borderRadius: 25, backgroundColor: '#FFCC00' }} // Personaliza el "thumb" (el círculo)
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',  // Fondo gris metálico oscuro para el fondo
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFCC00',  // Amarillo de advertencia
    paddingTop: 50,  // Asegura que el título no quede pegado al notch
    fontFamily: 'Orbitron_400Regular',  // Usar la fuente Orbitron
  },
  selectedSongText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#FFCC00',  // Amarillo de advertencia para la canción seleccionada
    fontFamily: 'Orbitron_400Regular',  // Usar la fuente Orbitron
  },
  songListContainer: {
    backgroundColor: '#222',  // Fondo oscuro para el cuadro de la lista
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
    width: '100%',
    maxHeight: 250,  // Limitar la altura de la lista
    shadowColor: '#000',  // Sombra para resaltar el cuadro
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  songButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#444',  // Fondo gris oscuro para los botones de la lista
  },
  buttonText: {
    color: '#FFCC00',  // Texto en amarillo
    fontSize: 18,
    fontFamily: 'Orbitron_400Regular',  // Usar la fuente Orbitron
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    width: '100%',
  },
  volumeText: {
    fontSize: 18,
    color: '#FFCC00',  // Amarillo brillante para el texto del volumen
    marginTop: 20,
    fontFamily: 'Orbitron_400Regular',  // Usar la fuente Orbitron
  },
  volumeSlider: {
    width: '80%',
    height: 40,
    marginTop: 10,
  },
  gothicButton: {
    fontFamily: 'Orbitron_400Regular',  // Aplicar la fuente Orbitron a los botones
    borderWidth: 2,
    borderColor: '#FF6347', // Borde rojo para el botón
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#222',  // Fondo oscuro para los botones
    marginVertical: 10,  // Separación vertical entre botones
  },
});
