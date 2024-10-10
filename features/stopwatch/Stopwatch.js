import React from 'react';
import { useAtom } from 'jotai';
import {
  elapsedTimeAtom,
  isRunningAtom,
  lapTimesAtom,
  toggleStartStopAtom,
  handleResetOrLapAtom
} from './StopwatchModel';
import StopwatchUI from './StopwatchUI';

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const Stopwatch = () => {
  const [elapsedTime] = useAtom(elapsedTimeAtom);
  const [isRunning] = useAtom(isRunningAtom);
  const [lapTimes] = useAtom(lapTimesAtom);
  const [, toggleStartStop] = useAtom(toggleStartStopAtom);
  const [, handleResetOrLap] = useAtom(handleResetOrLapAtom);

  const formattedTime = formatTime(elapsedTime);
  const formattedLapTimes = lapTimes.map((time, index) => `Lap ${index + 1}: ${formatTime(time)}`);

  // Define button labels based on isRunning state
  const startStopLabel = isRunning ? "Stop" : "Start";
  const resetLapLabel = isRunning ? "Lap" : "Reset";

  return (
    <StopwatchUI
      timer={formattedTime}
      lapTimes={formattedLapTimes}
      onStartStop={toggleStartStop}
      onResetLap={handleResetOrLap}
      startStopLabel={startStopLabel}
      resetLapLabel={resetLapLabel}
    />
  );
};

export default Stopwatch;
