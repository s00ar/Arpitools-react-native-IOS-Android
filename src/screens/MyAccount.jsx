import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "native-base";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FONTS } from "../Constants";
import { setSession } from "../Services/Api";

const MyAccount = ({ navigation }) => {
  const [user, setUser] = useState({});
  //recuperamos los datos almacenados del usuario logeado
  const getDataUser = async () => {
    try {
      await AsyncStorage.getItem("@STORAGE_USER").then((value) => {
        if (value != null) {
          setUser(JSON.parse(value));
          console.log("User info", value);
        }
      });
    } catch (error) {
      console.log("Error in getDataUser => " + error);
    }
  }; //end getDataUser

  useEffect(() => {
    getDataUser();
  }, []);

  const delAccount = async () => {
    await fetch(`https://strapi.arpitools.com/api/users/${user?.UserId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user?.Token}`
      },
      body: JSON.stringify({ blocked: true })
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        alert("Account deleted successfully!")
        logoutArpitools();
      })
      .catch((err) => {
        alert("Error in deleting account: " + err);
        console.log("error in deleting account", err);
      })
  };

  const logoutArpitools = () => {
    AsyncStorage.removeItem('@STORAGE_USER');
    AsyncStorage.removeItem('@USER_EMAIL');
    AsyncStorage.clear();
    setSession()
    navigation.navigate("LoginEmail");
  }

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
            Mi Cuenta
          </Text>
        </TouchableOpacity>
        <View style={{ justifyContent: "space-between", height: "65%" }}>
          <View style={{ paddingLeft: 40, marginTop: 30, marginBottom: 10 }}>
            <Text style={[FONTS.body2, { color: "#cccccc", marginBottom: 8 }]}>
              Tipo de local: {user?.Distribuitor ? "distribuidor" : "constructor"}
            </Text>
            <Text style={[FONTS.body2, { color: "#cccccc", marginBottom: 8 }]}>
              Dirección: {user?.address}
            </Text>
            <Text style={[FONTS.body2, { color: "#cccccc", marginBottom: 8 }]}>
              R.U.C: {user?.RUC}
            </Text>
            <Text style={[FONTS.body2, { color: "#cccccc", marginBottom: 8 }]}>
              Correo electrónico: {user?.UserEmail}
            </Text>
            <Text style={[FONTS.body2, { color: "#cccccc", marginBottom: 8 }]}>
              Nombre y apellido: {user?.FullName}
            </Text>
            <Text style={[FONTS.body2, { color: "#cccccc", marginBottom: 8 }]}>
              Telefono de contacto: {user?.phone}
            </Text>
          </View>
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
            Modificar Datos
          </Button> */}

          <Button
            backgroundColor="#f00"
            size="lg"
            borderRadius={5}
            w="60%"
            p={1}
            alignSelf={"center"}
            onPress={delAccount}
            _text={{
              color: "#000000",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Eliminar cuenta
          </Button>
        </View>
      </View>
    </>
  );
};

export default MyAccount;
