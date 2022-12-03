import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  StatusBar,
  Alert,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { FONTS } from "../Constants";
import { FontAwesome, FontAwesome5, Entypo, Feather, MaterialIcons, Ionicons, Octicons, AntDesign } from "@expo/vector-icons";
import { Flex, Text } from "native-base";
import ButtonMenu from "./ButtonMenu";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginEmail from "../screens/LoginEmail";
import { setSession } from "../Services/Api";


const ModalMenu = (props) => {
  const navigation = useNavigation()

  const logoutArpitools = () => {
      AsyncStorage.removeItem('@STORAGE_USER');
      AsyncStorage.clear();
      setSession()
      navigation.navigate("LoginEmail");
  }
  
  const cerrarSesionAlert = () =>
    Alert.alert("Arpitools", "Confirma Cierre de Sesión ?", [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
            logoutArpitools();
        },
      },
    ]); 

  return (
    <Modal
      testID={"modal"}
      isVisible={props.visible}
      onRequestClose={() => {
        props.onClose();
      }}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      style={{
        width: "100%",
        height: "100%",
        padding: 0,
        position: "relative",
      }}
    >
      <Pressable
        style={{
          height: "100%",
          backgroundColor: "#24242435",
        }}
        onPress={() => {
          props.onClose();
        }}
      >
        <Pressable
          onPress={() => {}}
          style={{
            width: "70%",
            backgroundColor: 'white',
            position: "absolute",
            top: -StatusBar.currentHeight,
            left: -20,
            height: "200%",
          }}
        >
          <Pressable
            style={{
              backgroundColor: 'black',
              height: 160,
              width: "100%",
              paddingHorizontal: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: 'space-between'
            }}
          >
            <View>
              <Flex direction="row" alignItems="center">
                <FontAwesome
                  name="user-circle"
                  size={36}
                  color="#4BD1A0"
                  style={{ margin: 5 }}
                />
                <Text style={[FONTS.h2, { color: 'white' }]}>
                {user?.UserEmail}
                </Text>
              </Flex>
              <Flex>
                <Text color={'white'} mt={3}>Local: {user?.Distribuitor ? "distribuidor" : "constructor"} Dirección:{user?.address}</Text>
              </Flex>
            </View>
            <Entypo name="chevron-right" size={24} color="#4BD1A0" />
          </Pressable>

          {/* <ButtonMenu icon={<Feather name="shopping-bag" size={24} color="#4BD1A0" />} text='Mis compras' onPress={() => {props.onClose() ,navigation.navigate('Buys')}} /> */}
          {/* <ButtonMenu icon={<MaterialIcons name="favorite-border" size={24} color="#4BD1A0" />} text='Mis favoritos' onPress={() => {props.onClose() ,navigation.navigate('Favorites')}} /> */}
          <ButtonMenu icon={<FontAwesome5 name="house-user" size={24} color="#4BD1A0" />} text='Inicio' onPress={() => {props.onClose() ,navigation.navigate('Main')}} />
          <ButtonMenu icon={<Octicons name="person" size={24} color="#4BD1A0" />} text='Mi cuenta' onPress={() => {props.onClose() ,navigation.navigate('MyAccount')}} />
          <ButtonMenu icon={<FontAwesome name="credit-card" size={24} color="#4BD1A0" />} text='Metodo de pago' onPress={() => {props.onClose() ,navigation.navigate('PaymentMethod')}} />
          <ButtonMenu icon={<Ionicons name="md-megaphone-outline" size={24} color="#4BD1A0" />} text='Ayuda' onPress={() => {props.onClose() ,navigation.navigate('Help')}} />
          <ButtonMenu icon={<Feather name="info" size={24} color="#4BD1A0" />} text='Acerca de ArpiTools' onPress={() => {props.onClose() ,navigation.navigate('ArpiTools')}} />
          <ButtonMenu icon={<AntDesign name="logout" size={24} color="red" />} text='Salir' onPress={() => {
            cerrarSesionAlert();
          }} />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ModalMenu;

const styles = StyleSheet.create({});