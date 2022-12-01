import React, { useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import Item from "../Components/Item";

const ItemScreen = (props) => {
  useEffect(() => {
    const backAction = () => {
      props.navigation.navigate("Main");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View>
      <Item />
    </View>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({});
