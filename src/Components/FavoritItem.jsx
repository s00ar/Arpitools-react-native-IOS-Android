import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS } from "../Constants";
import { Button } from "native-base";

const FavoritItem = () => {
  return (
    <View>
      <View
        style={{
          borderColor: "#4bd1a0",
          borderWidth: 2,
          borderRadius: 20,
          alignSelf: "center",
          width: "85%",
          flexDirection: "column",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row", padding: 10 }}>
          <View
            style={{ width: 130, height: 130, backgroundColor: "#ccc" }}
          ></View>
          <View style={{ flexDirection: "column", paddingLeft: 10 }}>
            <Text style={[FONTS.h3, { color: "#4bd1a0" }]}>
              Producto Disponible
            </Text>
            <Text style={[FONTS.h3, { color: "#cccccc" }]}>
              Nobre Del Producto
            </Text>
            <Text style={[FONTS.body3, { color: "#cccccc" }]}>
              Descipcion del producto
            </Text>
            <Text style={[FONTS.body3, { color: "#cccccc" }]}>
              $Precio Del producto
            </Text>
            <Button
            mt="1"
            size="lg"
            borderRadius={5}
            borderColor='#4bd1a0'
            variant='outline'
            flex={1}
            onPress={() => {}}
            _text={{
              color: "#cccccc",
            }}
          >
            Elimianr
          </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FavoritItem;
