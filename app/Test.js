import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";

const App = () => {
  const [selectedField, setSelectedField] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const clearSelection = () => {
    setSelectedField("");
  };

  const fields = [
    "Công nghệ thông tin",
    "Tài chính",
    "Y tế và Dược phẩm",
    "Giáo dục",
    "Bất động sản",
    "Thương mại điện tử",
    "Sản xuất",
    "Năng lượng",
    "Du lịch và Khách sạn",
    "Truyền thông và Giải trí",
    "Nông nghiệp",
    "Vận tải và Logistics",
    "Bán lẻ",
    "Dịch vụ tư vấn",
    "Dịch vụ khách hàng",
  ];

  return (
    <View style={{ margin: 5 }}>
      <Text
        style={{
          color: "#333333",
          fontSize: 20,
          fontWeight: "500",
          marginHorizontal: 10,
        }}
      >
        Lĩnh vực
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: isFocused ? "blue" : "#ccc",
          borderWidth: 1,
          borderRadius: 10,
          margin: 10,
          paddingLeft: 10,
          paddingRight: 10,
          padding: 10,
          paddingHorizontal: 20,
          height: 45,
        }}
      >
        <Picker
          selectedValue={selectedField}
          style={{ flex: 1, color: "#000" }}
          onValueChange={(itemValue) => setSelectedField(itemValue)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <Picker.Item label="Chọn lĩnh vực" value="" />
          {fields.map((field, index) => (
            <Picker.Item key={index} label={field} value={field} />
          ))}
        </Picker>
        {selectedField?.length > 0 && (
          <TouchableOpacity onPress={clearSelection} style={{ marginLeft: 10 }}>
            <Icon name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default App;
