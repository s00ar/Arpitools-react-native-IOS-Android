import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  StatusBar,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { FONTS } from "../Constants";
import { FontAwesome, FontAwesome5, Entypo, Feather, MaterialIcons, Ionicons, Octicons, AntDesign } from "@expo/vector-icons";
import { Flex, Text } from "native-base";
import ButtonMenu from "./ButtonMenu";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginEmail from "../screens/LoginEmail";
import { setSession } from "../Services/Api";
import { useEffect } from "react";


const ModalMenu = (props) => {
  const navigation = useNavigation()
  const [userEmail, setUserEmail] = useState("");
  const [isDistributor, setIsDistributor] = useState(false);
  const [address, setAddress] = useState("");
  const [user, setUser] = useState({});

//Retrieve the user data to display all needed fields
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
}; //end getDataUser

  useEffect(() => {
    AsyncStorage.getItem("@USER_EMAIL").then((data) => {
      setUserEmail(data);
    });
    AsyncStorage.getItem("@USER_ISDISTRIBUTOR").then((data) => {
      setIsDistributor(data);
    });
    AsyncStorage.getItem("@USER_ADDRESS").then((data) => {
      setAddress(data);
    });    
  })
  
  useEffect(() => {
    getDataUser();
  }, []);

  const logoutArpitools = () => {
      AsyncStorage.removeItem('@STORAGE_USER');
      AsyncStorage.removeItem('@USER_EMAIL');
      AsyncStorage.clear();
      setSession()
      navigation.navigate("LoginEmail");
  }
  
  const cerrarSesionAlert = () =>
    Alert.alert("Arpitools", "Confirma cierre de sesión ?", [
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
                  color="#ef4a36"
                  style={{ margin: 5 }}
                />
                <Text style={[FONTS.h4, { color: 'white' }]}>
                {userEmail ?? ''}
                </Text>
              </Flex>
              <Flex>
                {/* <Text color={'white'} mt={3}>
                {user?.Distribuitor ? "distribuidor" : "constructor"}
                </Text> */}
                <Text color={'white'} mt={3}>
                Dirección: {user?.address}
                {/* Added this to try to make the address work also addingthe user usestate at the begining */}
                </Text>
              </Flex>
            </View>
            {/* <Entypo name="chevron-right" size={24} color="#ef4a36" /> */}
          </Pressable>

          {/* <ButtonMenu icon={<Feather name="shopping-bag" size={24} color="#ef4a36" />} text='Mis compras' onPress={() => {props.onClose() ,navigation.navigate('Buys')}} /> */}
          {/* <ButtonMenu icon={<MaterialIcons name="favorite-border" size={24} color="#ef4a36" />} text='Mis favoritos' onPress={() => {props.onClose() ,navigation.navigate('Favorites')}} /> */}
          <ButtonMenu icon={<FontAwesome5 name="house-user" size={24} color="#ef4a36" />} text='Inicio' onPress={() => {props.onClose() ,navigation.navigate('Main')}} />
          <ButtonMenu icon={<Octicons name="person" size={24} color="#ef4a36" />} text='Mi cuenta' onPress={() => {props.onClose() ,navigation.navigate('MyAccount')}} />
          <ButtonMenu icon={<FontAwesome name="credit-card" size={24} color="#ef4a36" />} text='Metodo de pago' onPress={() => {props.onClose() ,navigation.navigate('PaymentMethod')}} />
          <ButtonMenu icon={<Ionicons name="md-megaphone-outline" size={24} color="#ef4a36" />} text='Ayuda' onPress={() => {props.onClose() ,navigation.navigate('Help')}} />
          <ButtonMenu icon={<Feather name="info" size={24} color="#ef4a36" />} text='Acerca de ArpiTools' onPress={() => {props.onClose() ,navigation.navigate('ArpiTools')}} />
          <ButtonMenu icon={<AntDesign name="logout" size={24} color="red" />} text='Salir' onPress={() => {
            cerrarSesionAlert();
          }} />
        </Pressable>
      </Pressable>
      <Text>v1.2.1</Text>
    </Modal>
  );
};

export default ModalMenu;

const styles = StyleSheet.create({});