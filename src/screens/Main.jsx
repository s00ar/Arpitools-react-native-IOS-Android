import React, { useContext, useEffect } from "react";
import { Alert, BackHandler, ScrollView, Text } from "react-native";
import Categoris from "../Components/Categoris";
import Items from "../Components/Items";
import ProductContext from "../Context/Products/ProductContext";

const Main = (props) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Espera", "Seguro quieres salir de la aplicación", [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Salir", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const { selectedProduct } = useContext(ProductContext);

  // const route = useRoute()
  // console.log(route.name)

  // console.log(navigation.state.routeName)
  return (
    <>
      {/* <Categoris /> */}
      <ScrollView style={{ backgroundColor: "#1a1b1a" }}>
        <Items
          onPress={() => {
            props.navigation.navigate("ItemScreen");
          }}
        />
      </ScrollView>
      {/* <ModalMenu 
      isVisible={show}
      onClose={() => {
        setShow(false);
      }}
      /> */}
    </>
  );
};

export default Main;
