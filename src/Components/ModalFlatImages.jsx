import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  StatusBar,
  FlatList,
  Image,
  Modal
} from "react-native";
import React, {useContext, useRef, useState} from "react";
// import Modal from "react-native-modal";
import { FONTS, SIZES } from "../Constants";
import { FontAwesome, Entypo, Feather, MaterialIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Flex, Text } from "native-base";
import ButtonMenu from "./ButtonMenu";
import ProductContext from "../Context/Products/ProductContext";

const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };


const ModalFlatImages = (props) => {

  const { selectedProduct } = useContext(ProductContext);

  const [currentIndex, setCurrentIndex] = useState(0);

  let flatListRef = useRef();
  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      onRequestClose={() => {
        props.onClose();
      }}
      style={{
        width: '100%',
        height: "100%",
        padding: 0,
        position: "relative",
      }}
    >
      <View style={{ backgroundColor: 'black', paddingTop: 20 }}>
        <Pressable
        style={{ marginLeft: 20}}
          onPress={() => {
            props.onClose();
          }}
        >
            <Entypo name="circle-with-cross" size={36} color="white" />
        </Pressable>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={selectedProduct.images}
            keyExtractor={(item, index) => index.toString()}
            pagingEnabled
            ref={(ref) => {
              flatListRef.current = ref;
            }}
            viewabilityConfig={viewConfigRef}
            onViewableItemsChanged={onViewRef.current}
            renderItem={({ item, index }) => (
                  <View style={{
                    width: SIZES.width ,
                  }}>
                    <Image
                      source={{ uri: item }} /* Use item to set the image source */
                      key={index} /* Important to set a key for list items,
                                 but it's wrong to use indexes as keys, see below */
                      style={{
                        width: SIZES.width ,
                        height: SIZES.height,
                        resizeMode: "contain",
                      }}
                    />
                  </View>
            )}
          />
      </View>
    </Modal>
  )
}

export default ModalFlatImages

const styles = StyleSheet.create({})