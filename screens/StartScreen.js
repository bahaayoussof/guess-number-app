import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

const StartScreen = ({ onPickNumber }) => {
	const [inputNumber, setInputNumber] = useState("");

	const inputHandler = enteredText => {
		setInputNumber(enteredText);
	};

	const resetHandler = () => {
		setInputNumber("");
	};

	const confirmHandler = () => {
		const chosenNumber = parseInt(inputNumber);

		if (isNaN(chosenNumber) || chosenNumber <= 0) {
			Alert.alert("Invalid number!", "Number has to be a number between 1 and 99.", [
				{
					text: "Okay",
					style: "destructive",
					onPress: resetHandler,
				},
			]);
			return;
		}

		onPickNumber(chosenNumber);
	};

	return (
		<View style={styles.rootContainer}>
			<Title>Guess My Number</Title>
			<Card style={styles.inputContainer}>
				<InstructionText>Enter a Number</InstructionText>
				<TextInput
					style={styles.numberInput}
					maxLength={2}
					keyboardType="number-pad"
					autoCapitalize="none"
					autoCorrect={false}
					onChangeText={inputHandler}
					value={inputNumber}
				/>

				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={resetHandler}>Reset</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
					</View>
				</View>
			</Card>
		</View>
	);
};

export default StartScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		marginTop: 100,
		alignItems: "center",
	},
	numberInput: {
		borderBottomColor: Colors.accent500,
		borderBottomWidth: 2,
		color: Colors.accent500,
		marginVertical: 8,
		width: 50,
		textAlign: "center",
		fontSize: 32,
		// fontWeight: "bold",
		fontFamily: "open-sans-bold",
	},
	buttonsContainer: {
		flexDirection: "row",
	},
	buttonContainer: {
		flex: 1,
	},
});
