import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";

//importación de la pantallas
import LoginEmail from "./src/screens/LoginEmail";
import Signup from "./src/screens/Signup";
import Main from "./src/screens/Main";
import LogoPage from "./src/screens/LogoPage";
import Cart from "./src/screens/Cart";
import DataProviders from "./src/Components/DataProviders";
import ProductState from "./src/Context/Products/ProductState";
import ItemScreen from "./src/screens/ItemScreen";
import Receipt from "./src/screens/Receipt";
import ModalReceiptScreen from "./src/screens/ModalReceiptScreen";
import Buys from "./src/screens/Buys";

import { LogBox } from "react-native";
import Favorites from "./src/screens/Favorites";
import MyAccount from "./src/screens/MyAccount";
import PaymentMethod from "./src/screens/PaymentMethod";
import Help from "./src/screens/Help";
import ArpiTools from "./src/screens/ArpiTools";
import MainHeader from "./src/Components/MainHeader";
import Serches from "./src/screens/Serches";

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <ProductState>
          <Stack.Navigator initialRouteName="">
            <Stack.Screen
              name="LogoPage"
              component={LogoPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="LoginEmail"
              component={LoginEmail}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Main"
              component={Main}
              options={{
                header: MainHeader,
                headerTransparent: false,
              }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                header: MainHeader,
                headerTransparent: false,
              }}
            />
            <Stack.Screen
              name="ItemScreen"
              component={ItemScreen}
              options={{
                header: MainHeader,
                headerTransparent: false,
              }}
            />
            <Stack.Screen
              name="Receipt"
              component={Receipt}
              options={{
                header: MainHeader,
                headerTransparent: false,
              }}
            />
            <Stack.Screen
              name="ModalReceipt"
              component={ModalReceiptScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Buys"
              component={Buys}
              options={{
                header: MainHeader,
                headerTransparent: false,
              }}
            />
            <Stack.Screen
              name="Favorites"
              component={Favorites}
              options={{
                header: MainHeader,
                headerTransparent: false,
              }}
            />
            <Stack.Screen
              name="MyAccount"
              component={MyAccount}
              options={{
                header: MainHeader,
                headerTransparent: false,
              }}
            />
            <Stack.Screen
              name="PaymentMethod"
              component={PaymentMethod}
              options={{
                header: MainHeader,
                headerTransparent: false,
              }}
            />
            <Stack.Screen
              name="Help"
              component={Help}
              options={{
                header: MainHeader,
                headerTransparent: false,
              }}
            />
            <Stack.Screen
              name="ArpiTools"
              component={ArpiTools}
              options={{
                header: MainHeader,
                headerTransparent: false,
              }}
            />
            <Stack.Screen
              name="Serches"
              component={Serches}
              options={{
                header: MainHeader,
                headerTransparent: false,
              }}
            />
          </Stack.Navigator>
          <StatusBar backgroundColor="black" style="light" />
        </ProductState>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
