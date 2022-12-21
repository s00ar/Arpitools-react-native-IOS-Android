import { Entypo } from "@expo/vector-icons";
import { Button } from "native-base";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FONTS } from "../Constants";

const ArpiTools = ({ navigation }) => {
  return (
    <>
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#1a1b1a" }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Main")}
          style={{
            width: "100%",
            backgroundColor: "#ef4a36",
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
            ArpiTools
          </Text>
        </TouchableOpacity>

        <Image
          source={require("../../assets/LogoNombre.png")}
          alt=""
          style={{ alignSelf: "center", marginTop: 50 }}
        />

        <View style={{ justifyContent: "space-between", height: "40%" }}>
          <View style={{ justifyContent:'center', alignItems:'center', marginVertical: 15 }}>
            <Text style={[FONTS.body2, { color: "#cccccc", textAlign:'center' }]}>
            De Los Quindes E6-275 y De Los Loros, Pichincha - Quito

            </Text>
          </View>
          <Text style={[FONTS.body3, { color: "#cccccc", textAlign: 'center', marginBottom: 30 }]}>
            Correo electrónico: ventas@arteypisos.com
          </Text>
{/* 
          <Button
            backgroundColor="#ef4a36"
            size="lg"
            borderRadius={5}
            w="60%"
            p={1}
            alignSelf={"center"}
            onPress={() => {}}
            _text={{
              color: "#000000",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Calificar
          </Button> */}
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={[FONTS.body2, { color: "#cccccc", marginBottom: 16 }]}>
              Copyright 2022 Metamorfosis360
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ArpiTools;
