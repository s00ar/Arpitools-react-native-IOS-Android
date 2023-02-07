import { useNavigation } from "@react-navigation/native";
import { Box, Flex, Spinner, View } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import config from "../config";
import { FONTS, SIZES } from "../Constants";
import ProductContex from "../Context/Products/ProductContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Items = (props) => {
  const productContext = useContext(ProductContex);
  const navigation = useNavigation();
// useState also added by Santi added this to check for distribuitor and to only show items to the user that it should be shown.
  const [isDistributor, setIsDistributor] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      productContext.getProducts();
    }, 1000);
  }, []);
  
  const [user, setUser] = useState({});
  //recuperamos los datos almacenados del usuario logeado
  const getDataUser = async () => {
    try {
      await AsyncStorage.getItem("@STORAGE_USER").then((value) => {
        if (value != null) {
          setUser(JSON.parse(value));
        }
      });
    } catch (error) {
      console.log("Error in getDataUser => " + error);
    }
  }; //end getDataUser

  useEffect(() => {
    if(productContext?.loading){
      getDataUser();
    }
  }, [productContext?.loading]);

  return (
    <Box h={"100%"}>
      {productContext?.productsArray?.length > 0 && (
        productContext?.productsArray
        .filter(product => {
          if (user?.Distribuitor && (product?.attributes?.price1 === 0 || product?.attributes?.price1 === null)) {
            return false;
          } else if (!user?.Distribuitor && (product?.attributes?.price2 === 0 || product?.attributes?.price2 === undefined)) {
            return false;
          }
          return true;
        })
        .map((product, index) => {
          return (
            <View key={index}>
            {(
              (user?.Distribuitor === true && product?.attributes?.stock > 0 && (product?.attributes?.price1 != 0  || product?.attributes?.price1 != undefined))
              ||
              (user?.Distribuitor === false &&  product?.attributes?.stock > 0 && (product?.attributes?.price2 > 0 || product?.attributes?.price2 != undefined))
              ) && (
              
              <TouchableOpacity
                key={product.id}
                style={{ flexDirection: "row", padding: 3 }}
                onPress={async () => {
                  await productContext.getProduct(product?.id),
                    // productContext.selectedProduct &&
                    //   navigation.navigate("ItemScreen");
                    props.onPress();
                }}
              >
                <Image
                  source={{
                    uri:
                      config.api.page_url +
                      product?.attributes?.thumbnail?.data?.attributes?.url,
                  }}
                  alt=""
                  style={{ width: 130, height: 130 }}
                />
                <Flex
                  direction="column"
                  ml={5}
                  w={"60%"}
                  justify={"space-around"}
                >
                  <Box>
                    <Text style={[FONTS.body2, { color: "#cccccc" }]}>
                      {product?.attributes?.name}
                    </Text>
                    <Text
                      style={[FONTS.body4, { color: "#cccccc", width: "100%" }]}
                    >
                      {product?.attributes?.description}
                    </Text>
                  </Box>
                  <Text
                    style={[FONTS.boldText, FONTS.body3, { color: "#cccccc" }]}
                  >
                    $ {user?.Distribuitor && product?.attributes?.price1}{!user?.Distribuitor && product?.attributes?.price2}
                  </Text>
                </Flex>
              </TouchableOpacity>
          )}
            </View>
          );
        })
      )}
      {productContext?.loading && (
        <Flex
          align={"center"}
          justify={"center"}
          bg={"#000000"}
          h={SIZES.height - 78}
        >
          <Spinner color="#ef4a36" size="lg" />
        </Flex>
      )}
    </Box>
  );

  //         return (
  //           <TouchableOpacity
  //             key={product.id}
  //             style={{ flexDirection: "row", padding: 3 }}
  //             onPress={async () => {
  //               await productContext.getProduct(product.id),
  //                 // productContext.selectedProduct &&
  //                 //   navigation.navigate("ItemScreen");
  //                 props.onPress();
  //             }}
  //           >
  //             <Image
  //               source={{ uri: product.thumbnail }}
  //               alt=""
  //               style={{ width: 130, height: 130 }}
  //             />
  //             <Flex direction="column" ml={5} w={'60%'} justify={'space-around'}>
  //               <Box>
  //                 <Text style={[FONTS.body2,{color: '#cccccc'}]}>{product.title}</Text>
  //                 <Text style={[FONTS.body4,{color: '#cccccc', width: '100%'}]}>{product.description}</Text>
  //               </Box>
  //               <Text style={[FONTS.boldText, FONTS.body3, {color: '#cccccc'}]}>
  //                 $ {product.price}
  //               </Text>
  //             </Flex>
  //           </TouchableOpacity>
  //         );
  //       })
  //     ) : (
  //       <Flex align={'center'} justify={'center'} bg={'#000000'} h={SIZES.height - 78}>
  //         <Spinner color="#ef4a36" size="lg" />
  //       </Flex>
  //     )}
  //   </Box>
  // );
};

export default Items;

const styles = StyleSheet.create({});

// TODO console.log("https://arpitools.com" + product.attributes.thumbnail.data.attributes.url);
//           return (
//             <TouchableOpacity
//               key={product.id}
//               style={{ flexDirection: "row", padding: 3 }}
//               onPress={async () => {
//                 await productContext.getProduct(product.id),
//                   // productContext.selectedProduct &&
//                   //   navigation.navigate("ItemScreen");
//                   props.onPress();
//               }}
//             >
//               <Image
//?                 source={{ uri: "https://arpitools.com" + product.attributes.thumbnail.data.attributes.url}}
//                 alt=""
//                 style={{ width: 130, height: 130 }}
//               />
//               <Flex
//                 direction="column"
//                 ml={5}
//                 w={"60%"}
//                 justify={"space-around"}
//               >
//                 <Box>
//                   <Text style={[FONTS.body2, { color: "#cccccc" }]}>
//                     {product.attributes.name}
//                   </Text>
//                   <Text
//                     style={[FONTS.body4, { color: "#cccccc", width: "100%" }]}
//                   >
//                     {product.attributes.description}
//                   </Text>
//                 </Box>
//                 <Text
//                   style={[FONTS.boldText, FONTS.body3, { color: "#cccccc" }]}
//                 >
//                   $ {product.attributes.price1}
//                 </Text>
//               </Flex>
//             </TouchableOpacity>
//           );
//         })
//       ) : (
//         <Flex
//           align={"center"}
//           justify={"center"}
//           bg={"#000000"}
//           h={SIZES.height - 78}
//         >
//           <Spinner color="#ef4a36" size="lg" />
//         </Flex>
//       )}
//     </Box>
//   );
