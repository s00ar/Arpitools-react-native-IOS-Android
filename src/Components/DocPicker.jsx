import { Entypo, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { FONTS } from "../Constants";
import imagePicker from "../Utils/imagePicker";

const DocPicker = ({ setFile }) => {
  const [doc, setDoc] = useState();
  const pickDocument = async () => {
    try {
      const response = await imagePicker();
      let { fileSize: size, uri } = response;
      const name = `${uri}`.split("/").pop();
      let fileType = `${name}`.split(".").pop();
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
