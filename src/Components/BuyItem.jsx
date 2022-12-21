import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS } from "../Constants";
import { Button } from "native-base";

const BuyItem = () => {
  return (
    <View>
      <View
        style={{
          borderColor: "#ef4a36",
          borderWidth: 2,
          borderRadius: 20,
          alignSelf: "center",
          width: "85%",
          flexDirection: "column",
          justifyContent: "space-between",
          marginVertical: 10
        }}
      >
        <View
          style={{
            borderColor: "#ef4a36",
            borderBottomWidth: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>Fecha</Text>
          <TouchableOpacity>
            <Text style={[FONTS.body3, { color: "#cccccc" }]}>
              Volver a comprar
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", padding: 10 }}>
          <View
            style={{ width: 130, height: 130, backgroundColor: "#ccc" }}
          ></View>
          <View style={{flexDirection: 'column', padding: 10}}>
            <Text style={[FONTS.body3, { color: "#ef4a36" }]}>Entregado</Text>
            <Text style={[FONTS.body3, { color: "#cccccc" }]}>
              Se entrego el día de mes
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BuyItem;
