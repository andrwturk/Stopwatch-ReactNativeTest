import { atom } from 'jotai';

// State atoms for tracking the timer status and the starting time
export const isRunningAtom = atom(false);
export const startTimeAtom = atom(null);
export const lapTimesAtom = atom([]);
export const pauseTimeAtom = atom(0);
export const intervalIdAtom = atom(null);

// Writeable atom to update elapsed time (used in the interval)
export const elapsedTimeWriteableAtom = atom(
  (get) => get(elapsedTimeAtom),
  (get, set) => {
    const isRunning = get(isRunningAtom);
    const startTime = get(startTimeAtom);
    const pausedTime = get(pauseTimeAtom);

    if (!startTime) return; // No start time, so nothing to update

    const now = Date.now();
    const elapsedTime = isRunning
      ? (now - startTime) / 1000 + pausedTime
      : pausedTime;

    set(elapsedTimeAtom, elapsedTime);
  }
);

// Atom to track elapsed time (in seconds)
export const elapsedTimeAtom = atom(0);

// Function to start the timer
export const startTimerAtom = atom(
  null,
  (get, set) => {
    if (!get(isRunningAtom)) {
      set(isRunningAtom, true);

      // Set start time if it's null (first time) or restart after pause
      if (!get(startTimeAtom)) {
        set(startTimeAtom, Date.now());
      } else {
        set(startTimeAtom, Date.now());
      }

      // Set up the interval to update elapsed time every 100ms
      const intervalId = setInterval(() => {
        set(elapsedTimeWriteableAtom); // Update elapsed time
      }, 100);

      set(intervalIdAtom, intervalId);
    }
  }
);

// Function to stop the timer
export const stopTimerAtom = atom(
  null,
  (get, set) => {
    if (get(isRunningAtom)) {
      const intervalId = get(intervalIdAtom);
      if (intervalId) {
        clearInterval(intervalId);
        set(intervalIdAtom, null);
      }
      const elapsed = get(elapsedTimeAtom);
      set(pauseTimeAtom, elapsed);
      set(isRunningAtom, false);
    }
  }
);

// Function to reset the timer and lap times
export const resetTimerAndLapsAtom = atom(
  null,
  (get, set) => {
    const intervalId = get(intervalIdAtom);
    if (intervalId) {
      clearInterval(intervalId);
      set(intervalIdAtom, null);
    }
    set(isRunningAtom, false);
    set(startTimeAtom, null);
    set(pauseTimeAtom, 0);
    set(lapTimesAtom, []);
    set(elapsedTimeAtom, 0); // Reset elapsed time
  }
);

// Function to record a lap time
export const recordLapAtom = atom(
  null,
  (get, set) => {
    const currentTime = get(elapsedTimeAtom);
    set(lapTimesAtom, (prev) => [...prev, currentTime]);
  }
);

// Function to toggle between start and stop
export const toggleStartStopAtom = atom(
  (get) => get(isRunningAtom),
  (get, set) => {
    if (get(isRunningAtom)) {
      set(stopTimerAtom);
    } else {
      set(startTimerAtom);
    }
  }
);

// Function to handle either reset or lap action based on timer state
export const handleResetOrLapAtom = atom(
  null,
  (get, set) => {
    if (get(isRunningAtom)) {
      set(recordLapAtom);
    } else {
      set(resetTimerAndLapsAtom);
    }
  }
);
