import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isEmpty } from "lodash";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  VStack,
} from "native-base";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import api, { setSession, unAuthApi } from "../Services/Api";
import { validateEmail, validatePassword } from "../Utils/Validations";

const LoginEmail = (props) => {
  const [forgot, setForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  //almacenamos todos los datos de usuario actual para utilizarlos en la orden de compra

  const authUser = async () => {
    await unAuthApi
      .post("auth/local", {
        identifier: email,
        password,
      })
      .then((res) => {
        setSession(res.data.jwt);

        getAxiosUser(res.data.jwt);
        AsyncStorage.setItem("@USER_EMAIL", email);
        setEmail("");
        setPassword("")
        props.navigation.navigate("Main");
      })
      .catch((err) => {
        Alert.alert("Error", err.response.data.error.message);
        console.error("Error authUser => " + err.message);
      });
  }; //end authUser

  const onContinue = async () => {
    if (forgot) {
      const emailError = validateEmail(email);
      if (!isEmpty(emailError)) {
        Alert.alert("Error", emailError);
        return;
      }
      setLoading(true);
      unAuthApi
        .post("auth/forgot-password", {
          email: email,
        })
        .then((res) => {
          setLoading(false);
          console.log("res", res);
          Alert.alert(
            "Éxito",
            "Revise su casilla de mail para el link de reseteo de contraseña. Si no aparece en unos instantes por favor revise su carpeta de spam."
          );
        })
        .catch((err) => {
          setLoading(false);
          // Alert.alert("Error", err.response.data.error.message);
          console.error(err.response.data);
        });

      // props.navigation.navigate("Main");
    } else {
      const emailError = validateEmail(email);
      if (!isEmpty(emailError)) {
        Alert.alert("Error", emailError);
        return;
      }
      const passwordError = validatePassword(password);
      if (!isEmpty(passwordError)) {
        Alert.alert("Error", passwordError);
        return;
      }
      unAuthApi
        .post("auth/local", {
          identifier: email,
          password,
        })
        .then((res) => {
          console.log(res);
          AsyncStorage.setItem("@USER_EMAIL", email); // Store the Email for future use.
          props.navigation.navigate("Main");
        })
        .catch((err) => {
          Alert.alert("Error", err.response.data.error.message);
          console.error(err.response.data);
        });

      authUser();
    }
  };

  return (
    <Flex bg="#ffffff" h={"100%"} w={"100%"} justify="center" align="center">
      <Box
        bg="#000000"
        h={"200%"}
        w={"170%"}
        style={{ transform: [{ rotate: "-45deg" }], position: "absolute" }}
      ></Box>
      <Box style={{ position: "relative" }}>
        {forgot ? (
          <TouchableOpacity
            style={{ position: "absolute", top: -30, left: 0 }}
            onPress={() => setForgot(false)}
          >
            <FontAwesome5 name="arrow-left" size={24} color={"white"} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <Image source={require("../../assets/LogoNombre.png")} alt="" />
        <Heading
          size="xl"
          fontWeight="800"
          color={forgot ? "#cccccc" : "#ffffff"}
          _dark={{
            color: "warmGray.50",
          }}
          alignSelf="center"
        >
          {forgot ? "Olvidé mi contraseña" : "Inicia sesión"}
        </Heading>
        {forgot ? (
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Ingresa tu Email"
                style={{ color: "white" }}
                fontSize={20}
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
              />
            </FormControl>
            <Button
              mt="2"
              backgroundColor="#ef4a36"
              size="lg"
              borderRadius={10}
              onPress={onContinue}
              disabled={loading}
            >
              {loading ? "Espere un instante..." : "Continuar"}
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text style={{ color: "white" }}>No tienes una cuenta?</Text>
              <Pressable
                onPress={() => {
                  props.navigation.navigate("Registrarse");
                }}
              >
                <Text style={{ color: "#ef4a36" }}> Registrate Aqui</Text>
              </Pressable>
            </HStack>
          </VStack>
        ) : (
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Ingresa tu Email"
                style={{ color: "white" }}
                fontSize={20}
                onChangeText={setEmail}
                value={email}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input
                style={{ color: "white" }}
                type="password"
                placeholder="Ingresa tu Contraseña"
                fontSize={20}
                onChangeText={setPassword}
                value={password}
                secureTextEntry
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
              <Text style={{ color: "white" }}>Soy un nuevo usuario.</Text>
              <Pressable
                onPress={() => {
                  props.navigation.navigate("Signup");
                }}
              >
                <Text style={{ color: "#ef4a36" }}> Registrate Aqui</Text>
              </Pressable>
            </HStack>
            <Pressable
              onPress={() => {
                setForgot(true);
              }}
            >
              <Text style={{ color: "#ef4a36", alignSelf: "center" }}>
                {" "}
                Olvidé mi Contraseña
              </Text>
            </Pressable>
          </VStack>
        )}
      </Box>

      {/* <Header arrow title='Iniciar Sesión' /> */}
      {/* <Center w="100%" h="90%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input type="password" />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: COLORS.primary_alpha_750,
                }}
                alignSelf="flex-end"
                mt="1"
              >
                Olvidaste tu contraseña?
              </Link>
            </FormControl>
            <Button mt="2" backgroundColor={COLORS.primary} onPress={() => {props.navigation.navigate('Main')}}>
              Ingresar
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Soy un nuevo usuario.{" "}
              </Text>
              <Link
                _text={{
                  color: COLORS.primary_alpha_750,
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => {props.navigation.navigate('Signup')}}
              >
                Registrarse
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center> */}
    </Flex>
  );
};

export default LoginEmail;

const styles = StyleSheet.create({});
