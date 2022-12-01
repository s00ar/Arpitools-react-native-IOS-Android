import {
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import MainHeader from "../Components/MainHeader";
import Items from "../Components/Items";
import ProductContext from "../Context/Products/ProductContext";
import Categoris from "../Components/Categoris";
import { BackHandler } from 'react-native'

const Serches = (props) => {


 

  return (
    <>
      <Categoris/>
      <ScrollView style={{backgroundColor: '#1a1b1a'}}>
        <Items onPress={() => {
          props.navigation.navigate('ItemScreen')}}/>
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

export default Serches;

