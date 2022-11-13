import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const NumberContainer = ({ children }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.numberText}>{children}</Text>
		</View>
	);
};

export default NumberContainer;

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: Colors.accent500,
		padding: 12,
		margin: 16,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	numberText: {
		color: Colors.accent500,
		fontSize: 28,
		// fontWeight: "bold",
		fontFamily: "open-sans-bold",
	},
});
