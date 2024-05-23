const [textName, setTextName] = useState("");
const [isFocusedName, setIsFocusedName] = useState(false);
const clearText = () => {
  setTextName("");
};
const [textPhone, setTextPhone] = useState("");
const [isFocusedPhone, setIsFocusedPhone] = useState(false);
const clearPhone = () => {
  setTextPhone("");
};

const [textEmail, setTextEmail] = useState("");
const [isFocusedEmail, setIsFocusedEmail] = useState(false);
const clearEmail = () => {
  setTextEmail("");
};

<View style={{ margin: 10 }}>
  <Text
    style={{
      color: "#333333",
      fontSize: 20,
      fontWeight: "500",
      marginHorizontal: 10,
    }}
  >
    Họ và tên
  </Text>
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      borderColor: isFocusedName ? "blue" : "#ccc",
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
      value={textName}
      onChangeText={setTextName}
      placeholder="Enter text"
      placeholderTextColor="#999"
      cursorColor="blue"
      onFocus={() => setIsFocusedName(true)}
      onBlur={() => setIsFocusedName(false)}
    />
    {textName.length > 0 && (
      <TouchableOpacity onPress={clearText} style={{ marginLeft: 10 }}>
        <Icon name="close-circle" size={20} color="#999" />
      </TouchableOpacity>
    )}
  </View>
</View>;
