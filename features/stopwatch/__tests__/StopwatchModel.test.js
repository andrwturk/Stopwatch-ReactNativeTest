import { createStore } from 'jotai';
import {
  elapsedTimeAtom,
  startTimeAtom,
  startTimerAtom,
  stopTimerAtom,
  resetTimerAndLapsAtom,
  recordLapAtom,
  lapTimesAtom,
  isRunningAtom,
} from '../StopwatchModel';

describe('Stopwatch Business Logic', () => {
  let store;

  beforeEach(() => {
    store = createStore();
    jest.useFakeTimers('modern'); // Use modern fake timers
    jest.setSystemTime(new Date('2021-01-01T00:00:00.000Z')); // Set a fixed start time
  });

  afterEach(() => {
    jest.useRealTimers(); // Clean up after each test
  });

  test('should start and increment the timer', () => {
    store.set(startTimerAtom);
    jest.advanceTimersByTime(3000); // Fast-forward 3 seconds
    expect(store.get(elapsedTimeAtom)).toBeCloseTo(3, 1); // Check timer value
  });

  test('should stop the timer and hold the current time', () => {
    store.set(startTimerAtom);
    jest.advanceTimersByTime(2000);
    store.set(stopTimerAtom);
    expect(store.get(isRunningAtom)).toBe(false); // Timer is stopped
    expect(store.get(elapsedTimeAtom)).toBeCloseTo(2, 1); // Timer holds value
  });

  test('should reset the timer and clear lap times', () => {
    store.set(startTimerAtom);
    jest.advanceTimersByTime(5000);
    store.set(resetTimerAndLapsAtom);
    expect(store.get(elapsedTimeAtom)).toBe(0);
    expect(store.get(lapTimesAtom).length).toBe(0); // No lap times
  });

  test('should record lap times correctly', () => {
    store.set(startTimerAtom);

    jest.advanceTimersByTime(3000);
    store.set(recordLapAtom);

    jest.advanceTimersByTime(2000);
    store.set(recordLapAtom);

    const laps = store.get(lapTimesAtom);

    expect(laps.length).toBe(2);
    expect(laps[0]).toBeCloseTo(3, 1);
    expect(laps[1]).toBeCloseTo(5, 1);
  });
});
