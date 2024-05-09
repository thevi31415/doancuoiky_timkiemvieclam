import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";

const Tabs = ({ items }) => {
  const [index, setIndex] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {items.map((tab, i) => {
          const active = index === i;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => setIndex(i)}
              style={styles.tab}
            >
              {active && (
                <Animated.View entering={BounceIn} style={styles.dot} />
              )}
              <Text style={active ? styles.activeTabText : styles.tabText}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {items[index].content()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: spacing.l,
    paddingBottom: spacing.m,
  },
  tab: {
    marginLeft: spacing.m,
  },
  tabText: {
    color: colors.gray,
  },
  activeTabText: {
    color: colors.primary,
  },
  dot: {
    position: "absolute",
    top: 5,
    left: -10,
    width: 6,
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: sizes.radius,
  },
});

export default Tabs;
