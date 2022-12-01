import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS } from "../Constants";
import MainHeader from "../Components/MainHeader";
import {
  FontAwesome,
  Entypo,
  Feather,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Button } from "native-base";

const PaymentMethod = ({ navigation }) => {
  return (
    <>
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#1a1b1a" }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Main")}
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
            Metodos de Pago
          </Text>
        </TouchableOpacity>

        <View
          style={{
            paddingLeft: 40,
            marginTop: 30,
            marginBottom: 10,
            width: "90%",
          }}
        >
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>
            Al momento solo aceptamos tranferencias Bancarias al Banco nnnnn
          </Text>
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>
            Numero de cuenta 0000000000
          </Text>
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>
            Tipo de cuenta: Caja de ahorro o cuenta corriente
          </Text>
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>
            Nombre completo o Razon social
          </Text>
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>
            CI./RUC 1792888069001
          </Text>
          <Text style={[FONTS.body3, { color: "#cccccc", marginBottom: 30 }]}>
            Correo electronico
          </Text>
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>
            Luego de enviar el comprobante de transferencia te sera enviado un
            email de confirmacion de compra, donde se especifica que la
            transferencia ha sido recibida con exito.
          </Text>
        </View>
      </View>
    </>
  );
};

export default PaymentMethod;
