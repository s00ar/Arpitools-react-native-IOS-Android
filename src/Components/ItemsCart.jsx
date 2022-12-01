import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { Box, Center, Flex, Spinner } from "native-base";
import { COLORS, FONTS, SIZES } from "../Constants";
import ProductContex from "../Context/Products/ProductContext";
import { RemoveCartContext } from "../Context/Products/ProductContext";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import config from "../config";

const ItemsCart = () => {
  const { cartArray } = useContext(ProductContex);
  const removeItem = useContext(RemoveCartContext);
  const navigation = useNavigation();

  console.log(cartArray);
  return (
    <View>
      {cartArray.length ? (
        cartArray.map((product) => (
          <View
            key={product.product.id}
            style={{ flexDirection: "row", padding: 3 }}
          >
            <Image
              source={{
                uri:
                 config.api.page_url +
                  product.product.attributes.thumbnail.data.attributes.url,
              }}
              alt="Imagen en carrito"
              style={{ width: 130, height: 130 }}
            />
            <Flex direction="column" ml={5} w={"60%"} justify={"space-around"}>
              <Box>
                <Text style={[FONTS.body2, { color: "#cccccc" }]}>
                  {product.product.attributes.name}
                </Text>
              </Box>
              <View>
                <Text style={[FONTS.body3, { color: "#cccccc" }]}>
                  $ {product.product.attributes.price1}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    marginTop: 5,
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Text style={[FONTS.h3, { color: "#cccccc" }]}>Cantidad</Text>
                  <View
                    style={{
                      backgroundColor: "#cccccc",
                      width: 30,
                      borderRadius: 5,
                      marginHorizontal: 6,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {product.quantity}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderColor: "#4bd1a0",
                      borderWidth: 2,
                      borderRadius: 5,
                      paddingLeft: 10,
                      flex: 1,
                    }}
                  >
                    <Text style={{ color: "#cccccc" }}>
                      Total: ${product.quantity * product.product.attributes.price1}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      removeItem(product);
                    }}
                  >
                    <MaterialIcons name="delete" size={24} color="#CCCCCC" />
                  </TouchableOpacity>
                </View>
              </View>
            </Flex>
          </View>
        ))
      ) : (
        <>
          <Text
            style={[
              FONTS.body2,
              { color: "#cccccc", textAlign: "center", marginTop: 150 },
            ]}
          >
            Carrito vacio
          </Text>
        </>
      )}
    </View>
  );
};

export default ItemsCart;

const styles = StyleSheet.create({});
