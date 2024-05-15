import React, { useRef, useEffect, useState } from "react";
import { View, FlatList, Image } from "react-native";

const DATA = [
  {
    id: "https://res.cloudinary.com/dhs93uix6/image/upload/v1715601106/T3_rmcten.webp",
    title: "First Item",
  },
  {
    id: "https://res.cloudinary.com/dhs93uix6/image/upload/v1715601106/T2_fwrsoj.webp",
    title: "Second Item",
  },
  {
    id: "https://res.cloudinary.com/dhs93uix6/image/upload/v1715601105/T1_voapce.webp",
    title: "Third Item",
  },
];

export default function Slider() {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: currentIndex === DATA.length - 1 ? 0 : currentIndex + 1,
          animated: true,
        });
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.floor(contentOffset.x / 330);

    setCurrentIndex(index);
  };

  return (
    <View style={{ flex: 0.82, padding: 16, marginTop: 0 }}>
      <FlatList
        ref={flatListRef}
        data={DATA}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item?.id }}
              style={{
                height: 170,
                width: 330,
                padding: 5,
                marginRight: 3,
                borderRadius: 13,
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled={true}
        decelerationRate={"fast"}
        snapToInterval={330}
        snapToAlignment={"start"}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
}
