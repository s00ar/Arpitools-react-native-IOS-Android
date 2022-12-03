import { useNavigation } from "@react-navigation/native";
import { Box, Flex, Spinner } from "native-base";
import React, { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import config from "../config";
import { FONTS, SIZES } from "../Constants";
import ProductContex from "../Context/Products/ProductContext";

const Items = (props) => {
  const productContext = useContext(ProductContex);
  const navigation = useNavigation();

  useEffect(() => {
    productContext.getProducts();
  }, []);

  console.log("productContext.productsArray");
  console.log(productContext.productsArray);

  return (
    <Box h={"100%"}>
      {productContext?.productsArray?.length && (
        productContext?.productsArray?.map((product) => {
          return (
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
                    // "https://arpitools.com/uploads/alambre_8_26e433ca80.jpg"
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
                  $ {product?.attributes?.price1}
                </Text>
              </Flex>
            </TouchableOpacity>
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
          <Spinner color="#4BD1A0" size="lg" />
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
  //         <Spinner color="#4BD1A0" size="lg" />
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
//           <Spinner color="#4BD1A0" size="lg" />
//         </Flex>
//       )}
//     </Box>
//   );
