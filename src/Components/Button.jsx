import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Divider, Flex, Text } from "native-base";
import { Feather } from "@expo/vector-icons";


const Button = ({ disabled = false, loading, text, icon, onPress }) => {
  return (
    <View>
      {loading ? <View
        style={styles.container}
      >
        <ActivityIndicator color={"white"} size="small" style={{marginVertical: 0.5}} />
      </View> :
        <TouchableOpacity
          disabled={disabled}
          style={styles.container}
          // onPress={onPress}
          onPressIn={onPress}
        >
          {icon}
          <Text style={styles.title}>{text}</Text>
        </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ef4a36',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4%',
    borderRadius: 10,
    marginTop: '3%'
  },
  title: {
    color: 'white',
    fontSize: 16
  }
})

export default Button;
