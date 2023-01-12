import * as ImagePicker from "expo-image-picker";

export default imagePicker = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.5,
  });

  if (!result.canceled) {
    return result.assets[0];
  }
};
