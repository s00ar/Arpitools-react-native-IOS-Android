import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  StatusBar,
  Modal,
} from "react-native";
import React, {useContext} from "react";
import { FONTS } from "../Constants";
import {
  FontAwesome,
  Entypo,
  Feather,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Flex, Text, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import ProductContext from "../Context/Products/ProductContext";


const ModalReceipt = (props) => {

  const { totalCart } = useContext(ProductContext)

  return (
    <Modal
      animationType="fade"
      visible={props.visible}
      onRequestClose={() => {
        props.onClose();
      }}
      style={{
        width: "100%",
        height: "100%",
        padding: 0,
        position: "relative",
      }}
    >
      <View
        style={{
          width: "100%",
          backgroundColor: "#1a1b1a",
          height: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => props.onClose()}
          style={{
            width: "100%",
            backgroundColor: "#4bd1a0",
            flexDirection: "row",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            padding: 5
          }}
        >
          <Entypo
            name="chevron-thin-left"
            size={24}
            color="black"
            style={{ position: "absolute", left: 2 }}
          />
          <Text style={[FONTS.h1, { color: "#000000", textAlign: "center" }]}>
            Compra realizada
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginTop: 50,
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "#1a1b1a",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={[FONTS.h3, { color: "#cccccc" }]}>Cantidad De</Text>
              <Text style={[FONTS.h3, { color: "#cccccc" }]}>Productos</Text>
            </View>
            <View
              style={{
                backgroundColor: "#cccccc",
                width: 30,
                borderRadius: 5,
                marginHorizontal: 6,
                justifyContent: "center",
                height: 23,
                alignSelf: "center",
              }}
            >
              <Text style={{ textAlign: "center" }}>{totalCart.quantity}</Text>
            </View>
          </View>
          <View
            style={{
              borderColor: "#4bd1a0",
              borderWidth: 2,
              borderRadius: 5,
              paddingHorizontal: 10,
              alignSelf: "center",
              width: "45%",
            }}
          >
            <Text style={[FONTS.h2, { color: "#cccccc" }]}>Total: ${totalCart.total}</Text>
          </View>
        </View>

        <View style={{ paddingLeft: 40, marginTop: 30, marginBottom: 10 }}>
          <Text
            style={[
              FONTS.h2,
              { color: "#cccccc", textAlign: "center", marginBottom: 20 },
            ]}
          >
            Archivo Enviado Con Exito
          </Text>

          <Text style={[FONTS.body3, { color: "#cccccc", marginBottom: 40 }]}>
            Orden de compra Número: #0000
          </Text>

          <Text style={[FONTS.body3, { color: "#cccccc", marginBottom: 20 }]}>
            Una vez verificado su comprobante, se le enviara una factura via
            mail.
          </Text>

          <Text style={[FONTS.body3, { color: "#cccccc", marginBottom: 20 }]}>
            Su pedido sera enviado a la dirección : Direccion que han provisto
          </Text>
        </View>

        <View
          style={{
            borderColor: "#4bd1a0",
            borderWidth: 2,
            borderRadius: 5,
            paddingHorizontal: 10,
            alignSelf: "center",
            width: "85%",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 8,
          }}
        >
          <Text style={[FONTS.body3, { color: "#cccccc", width: "70%" }]}>
            Nos contataremos a este número: número provisto en el registro
          </Text>
          <Button
            // mt="8"
            // mx="2"
            // mb="8"
            backgroundColor="#4BD1A0"
            size="lg"
            borderRadius={5}
            // w="60%"
            p="2"
            alignSelf={"center"}
            onPress={() => {}}
            _text={{
              color: "#000000",
            }}
          >
            Modificar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ModalReceipt;

const styles = StyleSheet.create({});
