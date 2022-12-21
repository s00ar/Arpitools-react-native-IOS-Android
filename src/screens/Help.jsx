import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { FONTS } from "../Constants";

const Help = (props) => {
  return (
    <>
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#1a1b1a" }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Main")}
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
            Ayuda
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderColor: "#ef4a36",
            borderWidth: 2,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
            alignSelf: "center",
            padding: 10,
            marginTop: 30,
          }}
          onPress={() => { 
            Linking.openURL('mailto:support@arpitools.com')
          }}
        >
          <Text style={[FONTS.body2, { color: "#cccccc", marginLeft: 20 }]}>
            Contactanos
          </Text>
          <MaterialIcons
            name="phone-enabled"
            size={24}
            color="#ef4a36"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            borderColor: "#ef4a36",
            borderWidth: 2,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
            alignSelf: "center",
            padding: 10,
            marginTop: 10,
          }}
        >
          <Text style={[FONTS.body2, { color: "#cccccc", marginLeft: 20 }]}>
            Preguntas Frecuentes
          </Text>
          <FontAwesome
            name="angle-down"
            size={24}
            color="#ef4a36"
            style={{ marginRight: 20, alignSelf: "center" }}
          />
        </TouchableOpacity> */}

        <View
          style={{
            paddingLeft: 40,
            marginTop: 30,
            marginBottom: 10,
            width: "90%",
          }}
        >
          <Text style={[FONTS.body1, { color: "#cccccc", textAlign: 'center' }]}>
          Bienvenido a la sección de ayuda de nuestra aplicación móvil.</Text>
          <Text style={[FONTS.body3, { color: "#cccccc" }]}>
Para comenzar a utilizar nuestra aplicación, simplemente descárgala desde el App Store o Google Play y sigue los pasos de registro. Una vez que hayas iniciado sesión, podrás acceder a todas las funcionalidades de la aplicación.
Si tienes alguna duda o problema mientras utilizas nuestra aplicación, no dudes en ponerte en contacto con nosotros a través de nuestro sitio http://arpitools.com/.</Text>
          <Text style={[FONTS.body2, { color: "#cccccc", textAlign: 'center' }]}> ¡Gracias por utilizar nuestra aplicación!
          </Text>
        </View>
      </View>
    </>
  );
};

export default Help;
