import { Button } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS } from "../Constants";

const Login = (props) => {
  return (
    <View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <View>
          <View
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.black,
              width: 100,
              height: 100,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 30 }}>Logo</Text>
          </View>
          <Text style={FONTS.h1}>
            App <Text style={[FONTS.h1, { color: COLORS.primary }]}>Icon</Text>
          </Text>
        </View>
        <View>
          <View>
            <Text>Bienvenido</Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              omnis illo eaque vitae doloribus distinctio .
            </Text>
          </View>

          <View>
            <Button
              onPress={() => {
                props.navigation.navigate("LoginEmail");
              }}
              color={COLORS.primary}
            >
              LOGIN
            </Button>
            <Button
              onPress={() => {
                props.navigation.navigate("Signup");
              }}
              color={COLORS.secondary}
            >
              SIGNUP
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
