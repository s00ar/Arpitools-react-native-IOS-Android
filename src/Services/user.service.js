export const getUserData = async () => {
  try {
    await AsyncStorage.getItem("@STORAGE_USER").then((value) => {
      if (value != null) {
        return value;
      }
    });
  } catch (error) {
    console.log("Error in getDataUser => " + error);
  }
};
