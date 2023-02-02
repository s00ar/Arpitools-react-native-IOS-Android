import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  Linking,
  Platform,
} from "react-native";
import React, { useContext, useEffect } from "react";
// import { Box, Button } from "native-base";
import { COLORS, FONTS, SIZES } from "../Constants";
import ProductContex from "../Context/Products/ProductContext";
import { useRef } from "react";
import { useState } from "react";
import ModalFlatImages from "./ModalFlatImages";
import MainHeader from "./MainHeader";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SUM_ALL } from "../Context/types";
import config from "../config";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { Input } from "native-base";

const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };

import * as FileSystem from "expo-file-system";
import Button from "./Button";

const Item = () => {
  const { selectedProduct, addToCart, cartArray, sumAll } =
    useContext(ProductContex);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(1);
  // added this to check for distribuitor and to only show items to the user that it should be shown.
  const [isDistributor, setIsDistributor] = useState(false);

  const [loading, setLoading] = useState(false);

  let flatListRef = useRef();
  const onViewRef = useRef(({ changed }) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const [storedQuantity, setStoredQuantity] = useState(0);

  useEffect(() => {
    if(cartArray?.length > 0){
      const products = cartArray.filter((item) => item.product.id == selectedProduct.id)
      let count = 0;
      products.map((item) => {
        count += parseInt(item?.quantity) ?? 0;
      })
      setStoredQuantity(count);
    } else {
      setStoredQuantity(0);
    }
  }, [cartArray]);

  // console.log("Selected Product", selectedProduct);
  // console.log("Thumbnail", config.api.page_url +
  //   selectedProduct.attributes.thumbnail.data.attributes.url);;

  const downloadFile = async (fileUrl) => {
    // const fileUrl = `${FileSystem.documentDirectory}/download.pdf`;

    // FileSystem.downloadAsync(remoteUrl, localPath)
    //   .then(({ uri }) => {
    //     console.log(uri);
    //   });
    const fileSplit = fileUrl.split("/");
    const file = fileSplit[fileSplit.length - 1];

    FileSystem.downloadAsync(fileUrl, FileSystem.documentDirectory + file)
      .then(async ({ uri }) => {
        // console.log("Finished downloading to ", uri);
        const permissions = MediaLibrary.getPermissionsAsync();
        if (permissions?.granted) {
          saveFile(uri);
        } else {
          // MediaLibrary.requestPermissionsAsync().then(response => {
          //   console.log("Permission response", response);
          //   if (response?.granted) {
          //     saveFile(uri)
          //   }
          // })

          if (Platform.OS == "android") {
            const downloadDir =
              FileSystem.StorageAccessFramework.getUriForDirectoryInRoot(
                "Download/Data"
              );
            const permission =
              await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(
                downloadDir
              );

            if (!permission.granted) {
              return alert(
                "Permissions denied for Download folder. File downloading failed"
              );
            }

            saveFile(uri, permission);
          } else {
            saveFile(uri);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveFile = async (uri, permission) => {
    // console.log("File", uri);

    if (Platform.OS == "ios") {
      Sharing.shareAsync(uri).then((data) => {
        alert("File downloaded successfully.");
      });
    } else {
      // MediaLibrary.createAssetAsync(uri).then(asset => {
      //   console.log('asset', asset);
      //   MediaLibrary.createAlbumAsync('arpitools', asset)
      //     .then(() => {
      //       alert("Downloaded")
      //     })
      //     .catch(error => {
      //       console.log("Error in downloading the file", error);
      //     });
      // });

      let fileSplit = String(uri).split("/");
      let fileExtension = fileSplit[fileSplit.length - 1].split(".");
      const extension = fileExtension[fileExtension - 1];

      const mimeType =
        extension == "pdf" ? "application/pdf" : `image/${extension}`;
      const filename = fileSplit[fileSplit?.length - 1];

      const contents = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const destinationUri =
        await FileSystem.StorageAccessFramework.createFileAsync(
          permission.directoryUri,
          filename,
          mimeType
        );
      FileSystem.writeAsStringAsync(destinationUri, contents, {
        encoding: FileSystem.EncodingType.Base64,
      })
        .then(() => {
          alert("Archivo descargado exitosamente.");
        })
        .catch((err) => {
          alert(
            "No se pudo descargar el archivo. Intente nuevamente en unos momentos."
          );
        });
    }
  };

  const navigation = useNavigation();

  // console.log(selectedProduct.data.attributes.thumbnail.data.attributes.url);

  const numericRegex = /^[0-9]*$/

  return (
    <ScrollView>
      <View style={{ height: SIZES.height - 76, padding: 10, backgroundColor: "#1a1b1a" }}>
        <View style={{}}>
          <View
            style={{
              backgroundColor: "#ffffff66",
              position: "absolute",
              zIndex: 100,
              right: 15,
              top: 10,
              width: 40,
              // height: 20,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Text style={{ textAlign: "center" }}>
              {currentIndex + 1} /  `{selectedProduct.attributes.thumbnail.data.attributes.images.length}`
            </Text> */}
          </View>

          {/* <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={selectedProduct.attributes.thumbnail.data.images}
            keyExtractor={(item, index) => index.toString()}
            pagingEnabled
            ref={(ref) => {
              flatListRef.current = ref;
            }}
            viewabilityConfig={viewConfigRef}
            onViewableItemsChanged={onViewRef.current}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setShow(true)}> */}

          {selectedProduct.attributes.thumbnail.data.attributes.url && (
            <Image
              source={{
                uri:
                  config.api.page_url +
                  selectedProduct.attributes.thumbnail.data.attributes.url,
              }} /* Use item to set the image source */
              // key={index}
              /* Important to set a key for list items,
                                but it's wrong to use indexes as keys, see below */
              style={{
                width: '100%',
                height: 250,
                resizeMode: "cover",
              }}
            />
          )}
          {/* </TouchableOpacity>
            )}
          /> */}
        </View>

        <View>
          <Text
            style={[
              FONTS.h2,
              { margin: 10, color: "#cccccc", marginTop: 20, marginBottom: 20 },
            ]}
          >
            {selectedProduct.attributes.name}
          </Text>
          <Text style={{ color: "#cccccc", marginLeft: 10 }}>
            {selectedProduct.attributes.description}
          </Text>
        </View>

        <View style={{ justifyContent: "flex-end", flex: 1 }}>
          {selectedProduct?.attributes?.specifications?.data && (
            <TouchableOpacity
              style={{ margin: 10 }}
              onPress={() => {
                downloadFile(
                  config.api.page_url +
                  selectedProduct.attributes.specifications.data[0].attributes
                    .url
                );
              }}
            >
              <Text style={{ color: "#ef4a36" }}>
                Descargar ficha tecnica en PDF{" "}
                <Feather name="download" size={24} color="#ef4a36" />
              </Text>
            </TouchableOpacity>
          )}
          <Text style={[FONTS.body2, { color: "#cccccc", marginLeft: 10 }]}>
            $ {
              (isDistributor == true && selectedProduct.attributes.price1)
            }
            {
              (isDistributor == false && selectedProduct.attributes.price2)

              // selectedProduct.attributes.price1>0 ? selectedProduct.attributes.price1 : selectedProduct.attributes.price2
            }
          </Text>
          <View
            style={{ flexDirection: "row", padding: 10, alignItems: "center" }}
          >
            <Text
              style={[
                FONTS.body2,
                { color: "#cccccc", marginRight: 10, },
              ]}
            >
              Cantidad
            </Text>
            <View
              style={{
                backgroundColor: "#cccccc",
                flexDirection: "row",
                width: 100,
                alignItems: "center",
                justifyContent: "space-around",
                marginRight: "auto",
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                disabled={price === 1}
                onPress={() => {
                  setPrice(parseInt(price, 10) - 1)
                }}
                style={{ paddingLeft: 6 }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: price === 1 ? "#aaaaaa" : "#000000",
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>
              {/* <Text style={{ fontSize: 16 }}>{price}</Text> */}

              <Input
                width="50%"
                style={{ marginLeft: 6 }}
                onChangeText={(e) => {
                  if (numericRegex.test(e) && e > 0) {
                    setPrice(e)
                  } else {
                    alert("Valor ingresado invalido. Por favor ingrese solo valores numéricos mayores a 0.")
                  }
                }}>
                {price}
              </Input>

              <TouchableOpacity
                onPress={() => setPrice(parseInt(price, 10) + 1)}
                disabled={price === (selectedProduct.attributes.stock - storedQuantity)}
                style={{ paddingRight: 6 }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color:
                      price === (selectedProduct.attributes.stock - storedQuantity)
                        ? "#aaaaaa"
                        : "#000000",
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderColor: "#ef4a36",
                borderWidth: 2,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Text
                style={[FONTS.h2, { color: "#cccccc", textAlign: "center" }]}
              >
                ${(selectedProduct.attributes.price1 > 0 ? (parseFloat(selectedProduct.attributes.price1 * price).toFixed(2)) : parseFloat(selectedProduct.attributes.price2 * price).toFixed(2))
                }
              </Text>
            </View>
          </View>
          {/* <Button
            mt="2"
            mx="2"
            mb="2"
            backgroundColor={selectedProduct?.stock < 1 ? "grey" : "#ef4a36"}
            size="35"
            borderRadius={5}
            w="60%"
            p="1"
            alignSelf={"center"}
            onPress={async () => {
              await addToCart(price),
                // await sumAll(price, selectedProduct.price + price),
                navigation.navigate("Main");
            }}
            disabled={selectedProduct?.stock < 1}
          >
            Agregar al Carrito
          </Button> */}
          <Button
            disabled={selectedProduct?.stock < 1}
            loading={loading}
            text={selectedProduct?.stock < 1 ? "Sin stock disponible" : "Agregar al Carrito"}
            onPress={async () => {
              setLoading(true);
              await addToCart(price),
                // await sumAll(price, selectedProduct.price + price), 
                setTimeout(() => {
                  setLoading(false);
                  navigation.navigate("Main");
                }, 1000);
            }}
          />
        </View>

        <ModalFlatImages
          visible={show}
          onClose={() => {
            setShow(false);
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Item;

const styles = StyleSheet.create({});
