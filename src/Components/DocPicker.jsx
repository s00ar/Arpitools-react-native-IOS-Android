import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { FONTS } from "../Constants";
import { Feather, Entypo } from "@expo/vector-icons";
import api from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const DocPicker = ({ setFile }) => {
  const [doc, setDoc] = useState();
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then(async (response) => {
      if (response.type == "success") {
        let { name, size, uri } = response;
        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType,
        };
        console.log(fileToUpload, "...............file");
        setDoc(fileToUpload);
        setFile(fileToUpload);
      }
    });
    // console.log(result);
    // console.log("Doc: " + doc.uri);
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
        <View>
          <TouchableOpacity
            onPress={() => {
              setDoc(null);
              setFile(null);
            }}
          >
            <Entypo
              name="cross"
              size={24}
              color="white"
              style={{ position: "absolute", top: 0, right: 0 }}
            />
          </TouchableOpacity>
          <Text
            style={[
              FONTS.h2,
              { color: "#cccccc", marginTop: 30, marginBottom: 20 },
            ]}
          >
            {doc.name}
          </Text>
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
