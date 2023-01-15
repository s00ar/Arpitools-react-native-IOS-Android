import * as ImagePicker from "expo-image-picker";

export default imagePicker = async () => {
  try {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0];
    }
  } catch (error) {
    console.log(error);
  }
};
