import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const LoadingOverlay = ({ loading }) => {
  return (
    <>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size={70} color="#2c67f2" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingOverlay;
