import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

const Card = ({ children }) => {
	return <View style={styles.card}>{children}</View>;
};

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
	card: {
		alignItems: "center",
		backgroundColor: Colors.primary800,
		marginTop: deviceWidth < 380 ? 18 : 36,
		marginHorizontal: 24,
		padding: 16,
		borderRadius: 8,
		// shadow for android
		elevation: 4,
		//shadow for ios
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.25,
	},
});
