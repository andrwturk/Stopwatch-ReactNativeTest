import { View, StyleSheet } from "react-native";
import Stopwatch from "@/features/stopwatch/Stopwatch";

export default function Index() {
  return (
    <View style={styles.container}>
      <Stopwatch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Center the Stopwatch component vertically
    width: '100%',
  },
});
