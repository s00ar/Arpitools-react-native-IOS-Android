import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { Button, Text } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { FONTS } from "../Constants";
import ProductContext from "../Context/Products/ProductContext";

const ModalReceiptScreen = (props) => {
  const { dispatch } = useNavigation();
  const { totalCart, removeAllCart } = useContext(ProductContext);

  const {params} = useRoute()
  const order = params?.order || {}
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [user, setUser] = useState({});
  const onClose = () => {
    removeAllCart();
    dispatch(StackActions.replace("Main"));
  };
  //recuperamos los datos almacenados del usuario logeado
  const getDataUser = async () => {
    try {
      await AsyncStorage.getItem("@STORAGE_USER").then((value) => {
        if (value != null) {
          setUser(JSON.parse(value));
        }
      });
    } catch (error) {
      console.log("Error in getDataUser => " + error);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);
  //end getDataUser - this was added by Santiago on 21-12-2022 - Please check if it's correct

  useEffect(() => {
    AsyncStorage.getItem("@USER_ADDRESS").then((item) => {
      if (item) {
        setAddress(item);
      }
    });

    AsyncStorage.getItem("@USER_PHONE").then((item) => {
      if (item) {
        setPhone(item);
      }
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
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
          onPress={onClose}
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
              borderColor: "#ef4a36",
              borderWidth: 2,
              borderRadius: 5,
              paddingHorizontal: 10,
              alignSelf: "center",
              width: "45%",
            }}
          >
            <Text style={[FONTS.h2, { color: "#cccccc" }]}>
              Total: ${totalCart.total}
            </Text>
          </View>
        </View>

        <View style={{ paddingLeft: 40, marginTop: 30, marginBottom: 10 }}>
          <Text style={[FONTS.h2, { color: "#cccccc", marginBottom: 20 }]}>
            Archivo Enviado Con Exito
          </Text>

          <Text style={[FONTS.body3, { color: "#cccccc", marginBottom: 40 }]}>
            {`💻 Orden de compra Número: #${order?.data?.id}`}
            {/* Please add the id of the order for this purchase order */}
          </Text>

          <Text
            style={[
              FONTS.body3,
              {
                color: "#cccccc",
                marginBottom: 20,
              },
            ]}
          >
            📃 Una vez verificado su comprobante, se le enviara una factura via
            mail a {user?.UserEmail}
          </Text>

          <Text
            style={[
              FONTS.body3,
              {
                color: "#cccccc",
                marginBottom: 20,
              },
            ]}
          >
            🚚 Su pedido será enviado a la dirección :{" "}
            {!user?.Distribuitor
              ? order?.data?.attributes?.deliveryto
              : user?.address}
            {/* This should be the address forthe delivery and not the address of the customer*/}
          </Text>

          <Button
            mt="2"
            backgroundColor="#ef4a36"
            size="lg"
            borderRadius={5}
            p="2"
            alignSelf={"center"}
            onPress={onClose}
          >
            REGRESAR A INICIO
          </Button>
          <Text
            style={[
              FONTS.body2,
              {
                borderColor: "#ef4a36",
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
                width: "85%",
                flexDirection: "row",
                justifyContent: "space-between",
                color: "#cccccc",
                marginBottom: 20,
                marginTop: 20,
              },
            ]}
          >
            Nos contactaremos a este número: +{user?.phone}
            {/* Please check I've done this correctly */}
          </Text>
          <Text
            style={[
              FONTS.body6,
              {
                alignSelf: "center",
                textAlign: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                color: "#cccccc",
                marginTop: 50,
              },
            ]}
          >
            Todas las compras realizadas hasta las 17hs serán entregadas al
            siguiente día laboral.{" "}
          </Text>
          {/* <Button
            // mt="8"
            // mx="2"
            // mb="8"
            backgroundColor="#ef4a36"
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
          </Button> */}
        </View>
        {/* <TouchableOpacity
                onPress={() => props.onClose()}
                style={{
                  width: "100%",
                  backgroundColor: "#ef4a36",
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
                  Regresar
                </Text>
              </TouchableOpacity>   */}
      </View>
    </SafeAreaView>
  );
};

export default ModalReceiptScreen;

const styles = StyleSheet.create({});
