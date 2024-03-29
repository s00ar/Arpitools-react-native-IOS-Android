import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isEmpty } from "lodash";
import {
  // Button, 
  FormControl, Input
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../Components/Button";
import DocPicker from "../Components/DocPicker";
import ModalReceipt from "../Components/ModalReceipt";
import { FONTS } from "../Constants";
import ProductContext from "../Context/Products/ProductContext";
import { validateAddress } from "../Utils/Validations";

const Receipt = ({ navigation }) => {
  //para recuperar los datos almacenados del usuario actual
  const [token, setToken] = useState();
  const [userid, setUserid] = useState();
  const [useremail, setUseremail] = useState();
  const [userfullname, setUserfullname] = useState();
  const [sellerid, setSellerid] = useState();
  const [sellername, setSellername] = useState();
  const [sellerphone, setSellerphone] = useState();
  const [order, setOrder] = useState();
  const [address, setAddress] = useState();
  const [file, setFile] = useState();
  const [show, setShow] = useState(false);
  const [data, setData] = useState("fake data");
  const { totalCart, removeAllCart, cartArray } = useContext(ProductContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

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
          setAddress(user.address)
          setUser(JSON.parse(value));
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

    if (!isEmpty(addressError) && !user?.Distribuitor) {
      Alert.alert("Error", addressError);
      return;
    }

    if (!file) {
      Alert.alert("Error", 'Campo "Subir Archivo" no puede estar vacío');
      return;
    }

    // show loading
    setLoading(true);

    var productoArray = cartArray.map(function (obj) {
      var rObj = {};
      rObj["id"] = obj.product.id;
      return rObj;
    });

    const fileData = new FormData();
    fileData.append("files", file);

    // const { data } = await api.post("upload", fileData, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });

    // FILE UPLOADING
    const data = await fetch("https://strapi.arpitools.com/api/upload", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fileData,
    })
      .then((response) => {
        setLoading(false);
        console.log("Server response", response);
        return response.json();
      })
      .catch((err) => {
        console.log("Error in file upload", err)
        setLoading(false);
      });

    let receipt = "";
    if (data[0]) {
      receipt = data[0]?.url;
    }

    setLoading(true);
    const postData = {
      data: {
        users_permissions_user: userid,
        products: productoArray,
        seller: sellerid,
        receipt: receipt,
        deliveryto: `${address}`,
        amount: `${totalCart.total.toFixed(2)}`,
        productlist: JSON.stringify(cartArray, [
          "product",
          "id",
          "attributes",
          "name",
          "quantity"
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

    // await api
    //   .post("orders", postData)
    //   .then((res) => {
    //     setShow(true);
    //   })
    //   .catch((error) => {
    //     Alert.alert("Error", error.message);
    //     console.error(error);
    //   });

    await fetch("https://strapi.arpitools.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        console.log("Order Server response", response);
        setLoading(false);
        return response.json();
      })
      .then(async (response) => {
        setLoading(false);
        console.log("Order Second response", response?.data?.attributes);
        if (response?.data) {
          setOrder(response);
          await removeItemQuantiyFromStock(cartArray);
          navigation.navigate("ModalReceipt", { order: response });
        }
      })
      .catch((err) => {
        console.log("Error in Order upload", err)
        setLoading(false);
      });
  };

  const removeItemQuantiyFromStock = async (productoArray) => {
    await AsyncStorage.getItem("@STORAGE_USER").then((value) => {
      console.log("Stored user", value);
      if (value != null) {
        let user = JSON.parse(value);
        productoArray?.map(async (item) => {
          console.log("Item", item);
          let stock = item?.product?.attributes?.stock - item?.quantity;
          console.log("New Stock value", stock);

          var payload = {
            data: { stock: stock },
          };

          await fetch(
            `https://strapi.arpitools.com/api/products/${item?.product?.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.Token}`,
              },
              body: JSON.stringify(payload),
            }
          )
            .then((response) => {
              console.log("Product Server response", response);
              return response?.json();
            })
            .then((response) => {
              console.log("Product Second response", response);
            })
            .catch((err) => console.log("Error in Product Stock update", err));
        });
      }
    });
  };
  
  // const displayAddress= () => {
  //   if (user?.Distribuitor) {
  //     return           <Text>{user?.address}</Text>;
  //   } else {
  //     <>
  //       <Input
  //       placeholder="Ingrese su dirección de envio"
  //       fontSize={20}
  //       style={{color:'white'}}
  //       onChangeText={setAddress}
  //       value={address}
  //       />
  //     </>
  //   }
  //}
  return (
    <>
      <ScrollView style={{ backgroundColor: "#1a1b1a" }}>
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
              borderColor: "#ef4a36",
              borderWidth: 2,
              borderRadius: 5,
              paddingHorizontal: 10,
              alignSelf: "center",
              width: "45%",
            }}
          >
            <Text style={[FONTS.h2, { color: "#cccccc" }]}>
              Total: {totalCart.total.toFixed(2)}
            </Text>
          </View>
        </View>
        {/* TODO */}
        <FormControl px={10} mt={5}>
          {/* <Text style={{ color: "white" }}>
            Usted es un {user?.Distribuitor ? "distribuidor" : "constructor"}
          </Text> */}
          <FormControl.Label>Dirección de entrega:</FormControl.Label>
          {user?.Distribuitor ? (
            <Text style={[FONTS.body3, { color: "#cccccc" }]}>
              {user?.address}
            </Text>
          ) : (
            <Input
              placeholder="Ingrese su dirección de envio"
              fontSize={20}
              style={{ color: "white" }}
              onChangeText={setAddress}
              value={address}
            />
          )}
        </FormControl>
        <View style={{ paddingLeft: 40, marginTop: 30, marginBottom: 10 }}>
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>
            Realizar la transferencia al Banco Guayaquil
          </Text>
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>
            Razón social: Arte y Pisos Cia Ltda
          </Text>
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>
            Número de cuenta 33613334
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

        {/* <Button
          mt="8"
          mx="2"
          mb="8"
          backgroundColor="#ef4a36"
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
        </Button> */}
        <View style={{width: '80%', alignSelf: 'center', marginVertical: 5}}>
          <Button
            onPress={onSend}
            _text={{
              color: "#000000",
              fontSize: 20,
              fontWeight: "bold",
            }}
            text={"Enviar"}
            loading={loading}
          />
        </View>
      </ScrollView>
      {/* {show && <ModalReceipt order={order} visible={show} setShow={setShow} />} */}
    </>
  );
};

export default Receipt;

const styles = StyleSheet.create({});
