import { Text, View, FlatList, Image } from "react-native";
import React from "react";
const DATA = [
  {
    id: "https://res.cloudinary.com/dhs93uix6/image/upload/v1713091267/wp3592806-job-wallpapers_osw154.jpg",
    title: "First Item",
  },
  {
    id: "https://res.cloudinary.com/dhs93uix6/image/upload/v1713091273/wp3592845-job-wallpapers_a35cgr.jpg",
    title: "Second Item",
  },
  {
    id: "https://res.cloudinary.com/dhs93uix6/image/upload/v1713091281/wp3592900-job-wallpapers_tdorqv.jpg",
    title: "Third Item",
  },
];

export default function Slider() {
  return (
    <View style={{ flex: 0.82, padding: 16, marginTop: 15 }}>
      <FlatList
        data={DATA}
        horizontal={true}
        className="rounded-sm"
        renderItem={({ item, index }) => (
          <View>
            <View>
              <Image
                source={{ uri: item?.id }}
                className="h-[200px] w-[330px] mr-3 rounded-lg object-contain"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}
