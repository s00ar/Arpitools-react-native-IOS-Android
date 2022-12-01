import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRef } from "react";
import { SIZES } from "../Constants";

const CarouselImage = (images, width, height) => {
  let flatListRef = useRef()

  const CarouselItems = {
    url: images[0]
  }

  const renderItem = (item, index) => {
    console.log(item[index]);
    return <Image style={{ width: SIZES.width , height: 250, resizeMode: 'cover', marginVertical: 20 }} source={{ uri: item.uri }} />;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <FlatList
        data={CarouselItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={(ref) => {flatListRef.current = ref}}
        style = {styles.carousel}
      />
    </View>
  );
};

export default CarouselImage;

const styles = StyleSheet.create({
  carousel: {
    maxHeight: 300,
  }
});
