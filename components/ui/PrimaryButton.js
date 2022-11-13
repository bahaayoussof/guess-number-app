import { StyleSheet, Text, View, Pressable } from "react-native";

const PrimaryButton = ({ children, onPress }) => {
	return (
		<View style={styles.buttonOuterContainer}>
			<Pressable
				style={({ pressed }) =>
					pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer
				}
				onPress={onPress}
				android_ripple={{ color: "#640233" }}
			>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</View>
	);
};

export default PrimaryButton;

const styles = StyleSheet.create({
	buttonOuterContainer: {
		borderRadius: 28,
		margin: 4,
		overflow: "hidden",
	},
	buttonInnerContainer: {
		backgroundColor: "#911854",
		paddingVertical: 8,
		paddingHorizontal: 18,
		elevation: 2,
	},
	buttonText: {
		color: "white",
		textAlign: "center",
	},
	pressed: {
		opacity: 0.75,
	},
});
