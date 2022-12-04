import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { FONTS } from "../Constants";

const Help = (props) => {
  return (
    <>
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#1a1b1a" }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Main")}
          style={{
            width: "100%",
            backgroundColor: "#4bd1a0",
            flexDirection: "row",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Entypo
            name="chevron-thin-left"
            size={24}
            color="black"
            style={{ position: "absolute", left: 2 }}
          />
          <Text style={[FONTS.h1, { color: "#000000", textAlign: "center" }]}>
            Ayuda
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderColor: "#4bd1a0",
            borderWidth: 2,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
            alignSelf: "center",
            padding: 10,
            marginTop: 30,
          }}
          onPress={() => { 
            Linking.openURL('mailto:support@arpitools.com')
          }}
        >
          <Text style={[FONTS.body2, { color: "#cccccc", marginLeft: 20 }]}>
            Contactanos
          </Text>
          <MaterialIcons
            name="phone-enabled"
            size={24}
            color="#4bd1a0"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            borderColor: "#4bd1a0",
            borderWidth: 2,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
            alignSelf: "center",
            padding: 10,
            marginTop: 10,
          }}
        >
          <Text style={[FONTS.body2, { color: "#cccccc", marginLeft: 20 }]}>
            Preguntas Frecuentes
          </Text>
          <FontAwesome
            name="angle-down"
            size={24}
            color="#4bd1a0"
            style={{ marginRight: 20, alignSelf: "center" }}
          />
        </TouchableOpacity> */}

        <View
          style={{
            paddingLeft: 40,
            marginTop: 30,
            marginBottom: 10,
            width: "90%",
          }}
        >
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </View>
    </>
  );
};

export default Help;
