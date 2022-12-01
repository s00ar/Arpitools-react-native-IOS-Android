import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import MainHeader from "../Components/MainHeader";
import { FONTS } from "../Constants";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Flex,
} from "native-base";
import {
  FontAwesome,
  Entypo,
  Feather,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DocPicker from "../Components/DocPicker";
import ModalReceipt from "../Components/ModalReceipt";
import ProductContext from "../Context/Products/ProductContext";
import { isEmpty } from "lodash";
import { validateAddress } from "../Utils/Validations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import api from "../Services/Api";

const Receipt = ({ navigation }) => {
  //para recuperar los datos almacenados del usuario actual
  const [token, setToken] = useState();
  const [userid, setUserid] = useState();
  const [useremail, setUseremail] = useState();
  const [userfullname, setUserfullname] = useState();
  const [sellerid, setSellerid] = useState();
  const [sellername, setSellername] = useState();
  const [sellerphone, setSellerphone] = useState();
  //

  const [address, setAdress] = useState("");
  const [file, setFile] = useState();
  const [show, setShow] = useState(false);
  const [data, setData] = useState("fake data");
  const { totalCart, removeAllCart, cartArray } = useContext(ProductContext);

  //recuperamos los datos almacenados del usuario logeado
  const getDataUser = async () => {
    try {
      await AsyncStorage.getItem("@STORAGE_USER").then((value) => {
        if (value != null) {
          let user = JSON.parse(value);
          setToken(user.Token);
          setUserid(user.UserId);
          setUserfullname(user.FullName);
          setUseremail(user.UserEmail);
          setSellerid(user.SellerId);
          setSellername(user.SellerName);
          setSellerphone(user.SellerPhone);
        }
      });
    } catch (error) {
      console.log("Error in getDataUser => " + error);
    }
  }; //end getDataUser

  useEffect(() => {
    getDataUser();
  }, []);

  const onSend = async () => {
    const addressError = validateAddress(address);

    if (!isEmpty(addressError)) {
      Alert.alert("Error", addressError);
      return;
    }

    if (!file) {
      Alert.alert("Error", 'Campo "Subir Archivo" no puede estar vacío');
      return;
    }

    var productoArray = cartArray.map(function (obj) {
      var rObj = {};
      rObj["id"] = obj.product.id;
      return rObj;
    });

    const fileData = new FormData();
    fileData.append("files", file);
    const { data } = await api.post("upload", fileData);

    console.log(data);

    let receipt = "";
    if (data[0]) {
      receipt = data[0]?.url;
    }

    const postData = {
      data: {
        users_permissions_user: userid,
        products: productoArray,
        seller: sellerid,
        receipt: receipt,
        deliveryto: `${address}`,
        amount: `${totalCart.total}`,
        productlist: JSON.stringify(cartArray, [
          "product",
          "id",
          "attributes",
          "name",
        ]),
        buyer: `${userfullname}`,
        buyeremail: `${useremail}`,
        buyerphone: sellerphone,
        buyersSellerName: `${sellername}`,
        buyersSellersId: sellerid,
        buyerId: userid,
      },
    };
    console.log("Order Data");
    console.log(JSON.stringify(postData));
    await api
      .post("orders", postData)
      .then((res) => {
        setShow(true);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
        console.error(error);
      });
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: "#1a1b1a" }}>
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
            Comprobante
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginTop: 50,
            justifyContent: "center",
            alignContent: "center",
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
            <Text style={[FONTS.h2, { color: "#cccccc" }]}>
              Total: {totalCart.total}
            </Text>
          </View>
        </View>
        <FormControl px={10} mt={5}>
          <FormControl.Label>Dirección</FormControl.Label>
          <Input
            placeholder="Ingrese su dirección de envio"
            fontSize={20}
            onChangeText={setAdress}
            value={address}
          />
        </FormControl>

        <View style={{ paddingLeft: 40, marginTop: 30, marginBottom: 10 }}>
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>
            Realizar la transferencia al Banco nnnnn
          </Text>
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>
            Numero de cuenta 0000000000
          </Text>
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>
            CI./RUC 1792888069001
          </Text>
        </View>

        <View style={{ paddingLeft: 40, marginTop: 30, marginBottom: 20 }}>
          <Text style={[FONTS.h2, { color: "#cccccc" }]}>
            Subir comprobante de
          </Text>
          <Text style={[FONTS.h2, { color: "#cccccc" }]}>pago realizado</Text>
        </View>

        <DocPicker setFile={setFile} />

        <Button
          mt="8"
          mx="2"
          mb="8"
          backgroundColor="#4BD1A0"
          size="lg"
          borderRadius={5}
          w="60%"
          p="1"
          alignSelf={"center"}
          onPress={onSend}
          _text={{
            color: "#000000",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Enviar
        </Button>
      </ScrollView>
      <ModalReceipt
        visible={show}
        onClose={() => {
          setShow(false), navigation.navigate("Main"), removeAllCart();
        }}
      />
    </>
  );
};

export default Receipt;

const styles = StyleSheet.create({});
