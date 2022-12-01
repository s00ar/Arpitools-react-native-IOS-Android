import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { FONTS } from '../Constants';

const Header = (props) => {

	const navigation = useNavigation()

  return (
    <View style={styles.header}>
				<View style={styles.top}>
					{props.arrow ? <TouchableOpacity onPress={() => navigation.goBack()}>
						<FontAwesome5
							name="arrow-left"
							size={24}
							color={'black'}
						/>
					</TouchableOpacity>
					:
					<></>
					}
					<Text style={[FONTS.h2, styles.text]}>
						{props.title}
					</Text>
				</View>
			</View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
		marginTop: StatusBar.currentHeight,
		backgroundColor: '#ffffff',
	},
  top: {
		padding: 20,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	text: {
		color: 'black',
		marginLeft: 10,
	}
})