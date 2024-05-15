import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Badge } from "native-base";
import React from "react";

export default function TypeJob() {
  return (
    // <View style={styles.tabsContainer}>
    //     <FlatList
    //       data={jobTypes}
    //       renderItem={({ item }) => (
    //         <TouchableOpacity
    //           style={styles.tab(activeJobType, item)}
    //           onPress={() => {
    //             setActiveJobType(item);
    //             router.push(`/search/${item}`);
    //           }}
    //         >
    //           <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
    //         </TouchableOpacity>
    //       )}
    //       keyExtractor={(item) => item}
    //       contentContainerStyle={{ columnGap: SIZES.small }}
    //       horizontal
    //     />
    //   </View>
    <View></View>
  );
}
const styles = StyleSheet.create({
  tabsContainer: {
    flex: 1,
    marginTop: 30,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: 12 / 2,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: activeJobType === item ? "#444262" : "#C1C0C8",
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: "DMMedium",
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
});
