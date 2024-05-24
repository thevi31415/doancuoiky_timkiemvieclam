const [textSlogan, setTextSlogan] = useState("");
const [isFocusedSlogan, setIsFocusedSlogan] = useState(false);
const clearSlogan = () => {
  setTextSlogan("");
};

<View style={{ margin: 5 }}>
  <Text
    style={{
      color: "#333333",
      fontSize: 20,
      fontWeight: "500",
      marginHorizontal: 10,
    }}
  >
    Slogan
  </Text>
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      borderColor: isFocusedSlogan ? "blue" : "#ccc",
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
    <TextInput
      style={{
        flex: 1,
        height: "100%",
        color: "#000",
        fontSize: 16,
      }}
      value={textSlogan}
      onChangeText={setTextSlogan}
      placeholder="Nhập Slogan"
      placeholderTextColor="#999"
      selectionColor="blue"
      onFocus={() => setIsFocusedSlogan(true)}
      onBlur={() => setIsFocusedSlogan(false)}
    />
    {textSlogan?.length > 0 && (
      <TouchableOpacity onPress={clearSlogan} style={{ marginLeft: 10 }}>
        <Icon name="close-circle" size={20} color="#999" />
      </TouchableOpacity>
    )}
  </View>
</View>;
