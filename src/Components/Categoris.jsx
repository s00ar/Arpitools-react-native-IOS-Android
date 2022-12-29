import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, {useContext} from "react";
import { FONTS } from "../Constants";
import ProductContext from "../Context/Products/ProductContext";
import { useNavigation } from "@react-navigation/native";


const Categoris = () => {

  const { productArray, serchProduct, constProductArray, value, serchValue } = useContext(ProductContext)
  const navigation = useNavigation()
  
    const filterSearch = (text) => {
      const newData = constProductArray.filter((item) => {
        console.log("Item", item);
        if(item?.category){
          const itemData = item?.category?.toUpperCase()
          const textData = text.toUpperCase()
          return itemData.indexOf(textData) > -1
        }
        return item;
      })
      serchProduct(newData)
    }

  return (
    <View>{/* 
      <ScrollView
        horizontal={true}
        style={{ backgroundColor: "#1a1b1a" }}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
          }}
          onPress={() => {navigation.navigate('Serches') ,filterSearch('smartphones')}}
        >
          <Text style={[FONTS.body2, { color: "#cccccc" }]}>
            Material electrico
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Text style={[FONTS.body2, { color: "#cccccc" }]}>
            Material ferretero
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Text style={[FONTS.body2, { color: "#cccccc" }]}>Piso flotante</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Text style={[FONTS.body2, { color: "#cccccc" }]}>Ceramicas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Text style={[FONTS.body2, { color: "#cccccc" }]}>Porcelanato</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Text style={[FONTS.body2, { color: "#cccccc" }]}>Logistica</Text>
        </TouchableOpacity>
      </ScrollView> */}
    </View>
  );
};

export default Categoris;
