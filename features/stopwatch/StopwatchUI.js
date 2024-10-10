import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const StopwatchUI = ({ timer, isRunning, lapTimes, onStartStop, onResetLap, startStopLabel, resetLapLabel }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Button title={resetLapLabel} onPress={onResetLap} />
        <Text style={styles.timer}>{timer}</Text>
        <Button title={startStopLabel} onPress={onStartStop} />
      </View>
      <FlatList
        data={lapTimes}
        renderItem={({ item }) => <Text style={styles.lapText}>{item}</Text>}
        keyExtractor={(_, index) => index.toString()}
        style={styles.lapList}
        contentContainerStyle={styles.lapListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items to the top of the container
    alignItems: 'center',
    padding: 20,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  lapList: {
    flex: 1,
    width: '100%',
  },
  lapListContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  lapText: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default StopwatchUI;
