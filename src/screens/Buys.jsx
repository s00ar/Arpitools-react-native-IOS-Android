import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import MainHeader from "../Components/MainHeader";
import ItemsCart from "../Components/ItemsCart";
import { Button } from "native-base";
import { FONTS, SIZES } from "../Constants";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import BuyItem from "../Components/BuyItem";

const Buys = (props) => {
  const scrollView = useRef();

  const [scrollEnd, setScrollEnd] = useState(false)

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

  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#1a1b1a" }}
        ref={scrollView}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            setScrollEnd(true)
            // enableSomeButton();
          }
          else{setScrollEnd(false)}
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Main')}
          style={{
            width: "100%",
            backgroundColor: "#4bd1a0",
            flexDirection: "row",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            padding: 5
          }}
        >
          <Entypo
            name="chevron-thin-left"
            size={24}
            color="black"
            style={{ position: "absolute", left: 2 }}
          />
          <Text style={[FONTS.h1, { color: "#000000", textAlign: "center" }]}>
            Mis Compras
          </Text>
        </TouchableOpacity>
        <BuyItem />
        <BuyItem />
        <BuyItem />
        <BuyItem />
        <BuyItem />
      </ScrollView>
      <View style={{ position: "relative" }}>
        {scrollEnd ? (
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
        <View style={{ backgroundColor: "#1a1b1a" }}>
          
        </View>
      </View>
    </>
  )
}

export default Buys