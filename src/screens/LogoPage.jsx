import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Image, Box, Flex } from "native-base";
import React from "react";
import { StyleSheet, View } from "react-native";
import { setSession } from "../Services/Api";

const LogoPage = () => {
  const navigation = useNavigation();

  setTimeout(() => {
    // Commented out on client's request, AUTO logoff is not allowed.
    setSession()
    navigation.navigate("LoginEmail");

    // AsyncStorage.getItem("@USER_EMAIL").then((payload) => {
    //   if(payload){
    //     navigation.navigate("Main");
    //   } else {
    //     navigation.navigate("LoginEmail");
    //   }
    // });
  }, 1000);

  return (
    <Flex justify="center" align="center" bg="#010101" w={"100%"} h={"100%"}>
      <View style={{ position: "relative" }}>
        <Image
            source={require("../../assets/LogoNombre.png")}
            alt=""
            style={{ alignSelf: "center", marginTop: 50 }}
            />

        {/* <Box style={styles.triangle}></Box>
        <Box style={styles.mid}></Box> */}
      </View>
    </Flex>
  );
};

export default LogoPage;

// const styles = StyleSheet.create({
//   triangle: {
//     borderBottomColor: "white",
//     borderTopColor: "transparent",
//     borderLeftColor: "transparent",
//     borderRightColor: "transparent",
//     borderTopWidth: 0,
//     borderLeftWidth: 100,
//     borderRightWidth: 100,
//     borderBottomWidth: 200,
//   },
//   mid: {
//     backgroundColor: "#010101",
//     width: 50,
//     height: 200,
//     position: "absolute",
//     left: 50,
//     bottom: -35,
//     transform: [{ rotate: "-27deg" }],
//   },
// });
