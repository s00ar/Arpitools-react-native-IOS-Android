import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  StatusBar,
  Modal,
  Text,
} from "react-native";
import React from "react";
import { FONTS } from "../Constants";

const ModalRemoveItemCart = (props) => {
  return (
    <Modal
      visible={props.visible}
      onRequestClose={() => {
        props.onClose();
      }}
    >
      <Pressable
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: 'transparent',
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => props.onClose()}
      >
        <Pressable
          style={{
            width: "80%",
            height: 250,
            backgroundColor: "#1a1b1a",
            padding: 5,
            paddingVertical: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => {}}
        >
          <Text style={[FONTS.h2, { color: "#ef4a36", textAlign: "center" }]}>
            Eliminar Producto
          </Text>
          <Text style={[FONTS.body2, { color: "#cccccc", textAlign: "center" }]}>
            Estas a punto de eliminar este producto de tu lista de favoritos.
          </Text>
          <Text style={[FONTS.body2, { color: "#cccccc", textAlign: "center" }]}>
            ¿Seguro que deseas eliminar?
          </Text>

          <View
            style={{
              flexDirection: "row",
              width: "70%",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={{
                borderColor: "#ef4a36",
                borderWidth: 2,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
              onPress={() => props.onClose()}
            >
              <Text style={[FONTS.body2, { color: "#cccccc" }]}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                paddingHorizontal: 5,
                paddingVertical: 4,
                borderRadius: 5,
              }}
              onPress={() => {props.onPress(), props.onClose()}}
            >
              <Text style={[FONTS.body2, { color: "#000000" }]}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ModalRemoveItemCart;
