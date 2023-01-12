import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { FONTS } from "../Constants";
import { Feather, Entypo } from "@expo/vector-icons";
import api from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import imagePicker from "../Utils/imagePicker";
import { ImageBackground } from "react-native";

const DocPicker = ({ setFile }) => {
  const [doc, setDoc] = useState();
  const pickDocument = async () => {
    try {
      const response = await imagePicker();
      let { fileName: name, fileSize: size, uri } = response;
      let nameParts = name.split(".");
      let fileType = nameParts[nameParts.length - 1];
      var fileToUpload = {
        name: name,
        size: size,
        uri: uri,
        type: "image/" + fileType,
      };
      console.log(fileToUpload, "...............file");
      setDoc(fileToUpload);
      setFile(fileToUpload);
    } catch (error) {
      console.log(error);
    }
  };

  const postDocument = () => {
    const url = "http://192.168.10.107:8000/upload";
    const fileUri = doc.uri;
    const formData = new FormData();
    formData.append("document", doc);
    const options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(formData);

    fetch(url, options).catch((error) => console.log(error));
  };

  return (
    <View style={{ alignItems: "center" }}>
      {doc ? (
        <View
          style={{
            width: "80%",
            height: 120,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageBackground
            style={{
              width: "100%",
              height: "100%",
            }}
            source={{ uri: doc?.uri }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 0, right: 0 }}
              onPress={() => {
                setDoc(null);
                setFile(null);
              }}
            >
              <Entypo name="cross" size={24} color="white" />
            </TouchableOpacity>
            <Text
              style={[
                FONTS.h3,
                {
                  color: "#cccccc",
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                },
              ]}
            >
              {doc.name}
            </Text>
          </ImageBackground>
        </View>
      ) : (
        <TouchableOpacity
          onPress={pickDocument}
          style={{
            width: "80%",
            height: 120,
            backgroundColor: "#cccccc",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Text style={FONTS.h2}>Subir Archivo</Text>
          <Feather name="upload" size={36} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DocPicker;
