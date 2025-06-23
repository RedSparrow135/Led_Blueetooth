import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';

export default function App() {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectBluetooth = async () => {
    setConnecting(true);
    setError(null);
    try {
      const devices = await RNBluetoothClassic.getBondedDevices();
      const hc05 = devices.find((d: BluetoothDevice) => d.name === 'HC-05');
      if (hc05) {
        const conn = await RNBluetoothClassic.connectToDevice(hc05.address);
        setConnected(!!conn.isConnected);
        setDevice(hc05);
      } else {
        setError('No se encontró el HC-05');
        setConnected(false);
      }
    } catch (err: any) {
      setError('Error de conexión: ' + (err?.message || err));
      setConnected(false);
    } finally {
      setConnecting(false);
    }
  };

  const disconnectBluetooth = async () => {
    if (device) {
      await RNBluetoothClassic.disconnectFromDevice(device.address);
      setConnected(false);
      setDevice(null);
    }
  };

  const sendCommand = async (cmd: string) => {
    if (connected && device) {
      try {
        await RNBluetoothClassic.writeToDevice(device.address, cmd);
      } catch (err: any) {
        setError('Error enviando comando: ' + (err?.message || err));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Control Bluetooth HC-05</Text>
      <Text style={styles.status}>
        Estado: {connecting ? 'Conectando...' : connected ? 'Conectado' : 'Desconectado'}
      </Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.centerContent}>
        {!connected ? (
          <Button title={connecting ? "Conectando..." : "Conectar a HC-05"} onPress={connectBluetooth} disabled={connecting} />
        ) : (
          <Button title="Desconectar" onPress={disconnectBluetooth} />
        )}

        <View style={styles.btnGroup}>
          <Button title="Prender LED" onPress={() => sendCommand('O')} disabled={!connected} />
          <Button title="Apagar LED" onPress={() => sendCommand('F')} disabled={!connected} />
        </View>
      </View>

      <Text style={styles.deviceInfo}>
        {device ? `Dispositivo: ${device.name} (${device.address})` : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', // Centra todo verticalmente
    alignItems: 'center',      // Centra todo horizontalmente
    backgroundColor: '#fff',
    padding: 24
  },
  header: { fontSize: 24, marginBottom: 12, fontWeight: 'bold', textAlign: 'center' },
  status: { fontSize: 16, marginBottom: 10, textAlign: 'center' },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
  centerContent: { 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 20 
  },
  btnGroup: { 
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 20 // Si tienes React Native >=0.71, si no, usa marginHorizontal en cada botón
  },
  deviceInfo: { fontSize: 14, marginTop: 30, textAlign: 'center' },
});

