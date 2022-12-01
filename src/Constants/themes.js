import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#4729B8",
  primary_light: "#4D2CC8",
  primary_dark: "#241E92",
  secondary: "#9E8AE5",

  primary_alpha_750: "#4729B8BF",
  primary_alpha_500: "#4729B880",
  primary_alpha_250: "#4729B840",
  primary_alpha_100: "#4729B810",

  secondary_alpha_750: "#9E8AE5BF",
  secondary_alpha_500: "#9E8AE580",
  secondary_alpha_250: "#9E8AE540",
  secondary_alpha_100: "#9E8AE510",

  overlay: "#4729B8BF",

  white: "#fff",
  black: "#000000",
  green: "#37E39F",
  red: "#F9A8BA",
  gray: "#6A6A6A",
  lightGray: "#dbdbdb",
  lightGray1: "#f5f6fa",
  darkGray: "#404040",
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  paddingXS: 12,
  paddingSM: 14,
  paddingMD: 16,
  paddingLG: 32,
  paddingXL: 48,

  // border radius
  radiusXS: 4,
  radiusSM: 8,
  radiusMD: 12,
  radiusLG: 16,
  radiusXL: 24,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,

  modalWidth: width * 0.8,
};

export const FONTS = StyleSheet.create({
  h1: {
    fontWeight: "bold",
    fontSize: SIZES.h1,
    lineHeight: 36,
  },
  h2: {
    fontWeight: "bold",
    fontSize: SIZES.h2,
    lineHeight: 30,
  },
  h3: {
    fontWeight: "bold",
    fontSize: SIZES.h3,
    lineHeight: 22,
  },
  h4: {
    fontWeight: "bold",
    fontSize: SIZES.h4,
    lineHeight: 22,
  },
  body1: {
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
  text: {
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  italicText: {
    fontSize: SIZES.body4,
    lineHeight: 22,
    fontStyle: "italic",
  },
  boldText: {
    fontSize: SIZES.body4,
    lineHeight: 22,
    fontWeight: "bold",
  },
});

export const SHADOWS = StyleSheet.create({
  shadowHeader: {
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,

    elevation: 8,
  },
});

const appTheme = { COLORS, SIZES, FONTS, SHADOWS };

export default appTheme;
