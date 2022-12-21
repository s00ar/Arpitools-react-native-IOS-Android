import {
  StyleSheet,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
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
import { FONTS } from "../Constants";
import { isEmpty } from "lodash";
import {
  validateCodeArpi,
  validateConfirmPassword,
  validateEmail,
  validateName,
  validateAddress,
  validatePassword,
  validatePhone,
  validateRuc,
  validateType,
} from "../Utils/Validations";
import api from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const TriangleCorner = (props) => {
//   return (
//     <>
//       <View style={[styles.triangleCorner, props.style]} />
//       <View style={[styles.triangleCorner, props.style]} />
//     </>
//   );
// };
// const Rectangle = () => {
//   return <View style={styles.rectangle} />;
// };

const Signup = (props) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ruc, setRuc] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAdress] = useState("");
  const [seller, setSeller] = useState("");

  //obtenemos los datos del usuario actual
  const getAxiosUser = async (value) => {
    await api
      .get("users/me?populate=*", {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
      .then(async (res) => {
        console.log("user");
        console.log(res.data);

        var user = {
          Token: value,
          UserId: res.data.id,
          Distribuitor: res.data.distribuitor,
          RUC: res.data.RUC,
          address: res.data.address,
          arpicode: res.data.arpicode,
          FullName: res.data.fullname,
          phone: res.data.phone,
          UserEmail: res.data.email,
          SellerId: res.data.seller?.id,
          SellerName: res.data.seller?.name,
          SellerPhone: res.data.seller?.phone,
        };
        await AsyncStorage.setItem("@STORAGE_USER", JSON.stringify(user));
      })
      .catch((err) => {
        console.error("Error getAxiosUser => " + err.message);
      });
  }; // end getAxiosUser

  const onContinue = async () => {
    const codeError = validateCodeArpi(code);
    if (!isEmpty(codeError)) {
      Alert.alert("Error", codeError);
      return;
    } else {
      let isCorrectCode = false;
      const { data } = await api.get("sellers?fields[0]=arpicode", {
        headers: {
          Authorization: `Bearer 5cfcbd8d63112fc1ac5909e9340c39d47fd9595759d5a3f3787b4898cb44c7dddfbd0dbf2a280fa2fe731ac3ae767428bafb4da0c7d1f66a54cd4f5d675cee4ae2a3eb08b52efb54ae786665e3473b5b27588c328c077f9f00943d7c3ad41b16d2f78bf3ebaf63b127937ae4dce50bc9982f5310781e0914024569e00c5dd073`,
        },
      });
      for (const sellers of data.data) {
        if (sellers.attributes.arpicode === code) {
          isCorrectCode = true;
          setSeller(sellers?.id)
          break;
        }
      }
      if (isCorrectCode) {
        if (step === 1) {
          setStep(2);
          return;
        }
      } else {
        Alert.alert("Error", "in correct code ");
        return;
      }
    }
    const typeError = validateType(type);
    if (!isEmpty(typeError)) {
      Alert.alert("Error", typeError);
      return;
    }
    const nameError = validateName(name);
    if (!isEmpty(nameError)) {
      Alert.alert("Error", nameError);
      return;
    }
    const phoneError = validatePhone(phone);
    if (!isEmpty(phoneError)) {
      Alert.alert("Error", phoneError);
      return;
    } else {
      if (step === 2) {
        setStep(3);
        return;
      }
    }
    const emailError = validateEmail(email);
    if (!isEmpty(emailError)) {
      Alert.alert("Error", emailError);
      return;
    }
    const rucError = validateRuc(ruc);
    if (!isEmpty(rucError)) {
      Alert.alert("Error", rucError);
      return;
    }
    const addressError = validateAddress(address);
    if (!isEmpty(addressError)) {
      Alert.alert("Error", addressError);
      return;
    }
    const passwordError = validatePassword(password);
    if (!isEmpty(passwordError)) {
      Alert.alert("Error", passwordError);
      return;
    }
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
    );
    if (!isEmpty(confirmPasswordError)) {
      Alert.alert("Error", confirmPasswordError);
      return;
    }

    api
      .post("auth/local/register", {
        username: name + ruc,
        fullname: name,
        phone:phone,
        email: email,
        password: password,
        RUC: ruc,
        address: address,
        // arpicode: code,
        seller: seller,
        distribuitor: type == "ferreteria" ? true : false,
      })
      .then((res) => {
        console.log("res", res);

        getAxiosUser(res?.data?.jwt);
        AsyncStorage.setItem("@USER_EMAIL", email);
        AsyncStorage.setItem("@USER_NAME", name);
        AsyncStorage.setItem("@USER_ADDRESS", address);
        AsyncStorage.setItem("@USER_ISDISTRIBUTOR", type == "ferreteria" ? true : false);

        props.navigation.navigate("Main");
      })
      .catch((error) => {
        Alert.alert("Error", error?.response?.data.error.message);
        console.error(error);
      });
  };

  return (
    <Flex bg="#ffffff" h={"100%"} w={"100%"} justify="center" align="center">
      <Box
        bg="#000000"
        h={"200%"}
        w={"170%"}
        style={{ transform: [{ rotate: "-45deg" }], position: "absolute" }}
      ></Box>
      <Box>
        <Image source={require("../../assets/LogoNombre.png")} alt="" />
        <Heading
          size="xl"
          fontWeight="800"
          color="#cccccc"
          _dark={{
            color: "warmGray.50",
          }}
          alignSelf="center"
        >
          Registro
        </Heading>
        {step == 1 ? (
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Codigo de vendedor</FormControl.Label>
              <Input
                style={{ color: "white" }}
                placeholder="Código Arpi"
                fontSize={20}
                keyboardType={"numeric"}
                maxLength={8}
                onChangeText={setCode}
                value={code}
              />
            </FormControl>
            <Button
              mt="2"
              backgroundColor="#ef4a36"
              size="lg"
              borderRadius={10}
              onPress={onContinue}
            >
              Continuar
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text style={{ color: "white" }}>Tenes cuenta?</Text>
              <Pressable
                onPress={() => {
                  props.navigation.navigate("LoginEmail");
                }}
              >
                <Text style={{ color: "#ef4a36" }}> Inicia Sesión</Text>
              </Pressable>
            </HStack>
          </VStack>
        ) : step == 2 ? (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
                marginTop: 25,
              }}
            >
              <TouchableOpacity
                onPress={() => setType("ferreteria")}
                style={[
                  type === "ferreteria"
                    ? { backgroundColor: "#ef4a36" }
                    : { backgroundColor: "transparent" },
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: "#ef4a36",
                    width: "50%",
                    padding: 10,
                    borderBottomLeftRadius: 5,
                    borderTopLeftRadius: 5,
                  },
                ]}
              >
                {/* <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <Rectangle />
                    <TriangleCorner />
                  </View> */}

                <Text style={[FONTS.body3, { color: type === "ferreteria" ? "black" : "#cccccc" }]}>
                  Ferreteria
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setType("constructora")}
                style={[
                  type === "constructora"
                    ? { backgroundColor: "#ef4a36" }
                    : { backgroundColor: "transparent" },
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: "#ef4a36",
                    width: "50%",
                    padding: 10,
                    borderBottomRightRadius: 5,
                    borderTopRightRadius: 5,
                  },
                ]}
              >
                <Text style={[FONTS.body3, { color: type === "constructora" ? "black" : "#cccccc" }]}>
                  Constructora
                </Text>
              </TouchableOpacity>
            </View>
            <VStack space={3} mt="2">
              <FormControl>
                <FormControl.Label>Nombre y Apellido</FormControl.Label>
                <Input
                  style={{ color: "white" }}
                  placeholder="Nombre y Apellido"
                  fontSize={20}
                  onChangeText={setName}
                  value={name}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Telefono</FormControl.Label>
                <Input
                  style={{ color: "white" }}
                  placeholder="+59355555555"
                  fontSize={20}
                  onChangeText={setPhone}
                  value={phone}
                  maxLength={13}
                />
              </FormControl>

              <Button
                mt="2"
                backgroundColor="#ef4a36"
                size="lg"
                borderRadius={10}
                onPress={onContinue}
              >
                Continuar
              </Button>
            </VStack>
          </>
        ) : (
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                style={{ color: "white" }}
                placeholder="Ingresa email"
                fontSize={20}
                onChangeText={setEmail}
                value={email}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>RUC</FormControl.Label>
              <Input
                style={{ color: "white" }}
                placeholder="Ingresar RUC"
                fontSize={20}
                onChangeText={setRuc}
                value={ruc}
                maxLength={13}
                keyboardType={"numeric"}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Dirección</FormControl.Label>
              <Input
                style={{ color: "white" }}
                placeholder="Ingrese su domicilio"
                fontSize={20}
                onChangeText={setAdress}
                value={address}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input
                style={{ color: "white" }}
                placeholder="Ingresar contraseña"
                fontSize={20}
                onChangeText={setPassword}
                value={password}
                secureTextEntry
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirmación contraseña</FormControl.Label>
              <Input
                style={{ color: "white" }}
                placeholder="Reingresar contraseña"
                fontSize={20}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry
              />
            </FormControl>

            <Button
              mt="2"
              backgroundColor="#ef4a36"
              size="lg"
              borderRadius={10}
              onPress={() => {
                onContinue();
              }}
            >
              Continuar
            </Button>
          </VStack>
        )}
      </Box>
    </Flex>
  );
};

export default Signup;

const styles = StyleSheet.create({
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 40,
    borderTopWidth: 40,
    borderRightColor: "#ef4a36",
    borderTopColor: "transparent",
  },
  rectangle: {
    width: 50 * 2,
    height: 40,
    backgroundColor: "transparent",
    borderColor: "#ef4a36",
    borderWidth: 2,
    borderRightWidth: 0,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
});
