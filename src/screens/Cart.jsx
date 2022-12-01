import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Button } from "native-base";
import React, { useContext, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ItemsCart from "../Components/ItemsCart";
import { FONTS, SIZES } from "../Constants";
import ProductContex from "../Context/Products/ProductContext";

const Cart = (props) => {
  const scrollView = useRef();

  const [scrollEnd, setScrollEnd] = useState(false);

  const { cartArray, dataRecipe } = useContext(ProductContex);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  let totalArr = [];

  const sumall = cartArray
    .map((item) => item.quantity)
    .reduce((prev, curr) => prev + curr, 0);

  // let multi = cartArray.map(item => item.product.price).reduce((prev, curr) => prev + curr, 0)

  // multi = multi * selectedProduct.map(item => item.quantity)

  // totalArr.push( ...totalArr, multi)

  // console.log( 'TOTALARR _____________' ,totalArr);

  for (i = 0; i < cartArray.length; i++) {
    totalArr.push(
      cartArray[i].product.attributes.price1 * cartArray[i].quantity
    );
  }

  let total = totalArr.reduce((a, b) => a + b, 0);

  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#1a1b1a" }}
        ref={scrollView}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            setScrollEnd(true);
            // enableSomeButton();
          } else {
            setScrollEnd(false);
          }
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Main")}
          style={{
            width: "100%",
            backgroundColor: "#4bd1a0",
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
            Carrito
          </Text>
        </TouchableOpacity>
        <ItemsCart />
      </ScrollView>
      <View style={{ position: "relative" }}>
        {scrollEnd || cartArray.length < 5 ? (
          <></>
        ) : (
          <Button
            style={{
              position: "absolute",
              top: -60,
              width: SIZES.width,
              backgroundColor: "#1a1b1a55",
              height: 60,
              alignItems: "flex-end",
            }}
            onPress={() => scrollView.current.scrollToEnd({ animated: true })}
          >
            <FontAwesome name="angle-double-down" size={24} color="white" />
          </Button>
        )}
        {cartArray.length ? (
          <View style={{ backgroundColor: "#1a1b1a" }}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginTop: 5,
                justifyContent: "space-around",
                alignContent: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column" }}>
                  <Text style={[FONTS.h3, { color: "#cccccc" }]}>
                    Cantidad De
                  </Text>
                  <Text style={[FONTS.h3, { color: "#cccccc" }]}>
                    Productos
                  </Text>
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
                  <Text style={{ textAlign: "center" }}>{sumall}</Text>
                </View>
              </View>
              <View
                style={{
                  borderColor: "#4bd1a0",
                  borderWidth: 2,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  alignSelf: "center",
                }}
              >
                <Text style={[FONTS.h2, { color: "#cccccc" }]}>
                  Total: ${total}
                </Text>
              </View>
            </View>
            <Button
              mt="3"
              mx="2"
              mb="8"
              backgroundColor="#4BD1A0"
              size="35"
              borderRadius={5}
              w="60%"
              p="1"
              alignSelf={"center"}
              onPress={() => {
                dataRecipe(sumall, total), props.navigation.navigate("Receipt");
              }}
              _text={{
                color: "#000000",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Comprar
            </Button>
          </View>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({});
