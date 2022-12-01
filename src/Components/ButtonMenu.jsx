import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Divider, Flex, Text } from "native-base";
import { Feather } from "@expo/vector-icons";


const ButtonMenu = ( props ) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          paddingLeft: 25,
          paddingVertical: 15,
          alignItems: "center",
        }}
        onPress={props.onPress}
      >
        {props.icon}
        <Text ml={3}>{props.text}</Text>
      </TouchableOpacity>
      <Flex align="flex-end">
        <Divider style={{ width: "85%" }} />
      </Flex>
    </View>
  );
};

export default ButtonMenu;
