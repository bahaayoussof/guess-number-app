import { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

const GameScreen = ({ userNumber, onGameOver }) => {
	const generatedRandomNumber = (min, max, exclude) => {
		const randomNum = Math.floor(Math.random() * (max - min)) + min;

		if (randomNum === exclude) {
			return generatedRandomNumber(min, max, exclude);
		} else {
			return randomNum;
		}
	};

	const initialGuess = generatedRandomNumber(0, 100, userNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);

	const [guessRounds, setGuessRounds] = useState([initialGuess]);

	const guessRoundsListLength = guessRounds.length;

	let minBoundary = 1;
	let maxBoundary = 100;

	const newGuessHandler = direction => {
		if (
			(direction === "lower" && currentGuess < userNumber) ||
			(direction === "greater" && currentGuess > userNumber)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [
				{
					text: "Sorry!",
					style: "cancel",
				},
			]);
			return;
		}
		if (direction === "lower") {
			maxBoundary = currentGuess;
		} else {
			minBoundary = currentGuess + 1;
		}
		console.log({ minBoundary });
		console.log({ maxBoundary });
		const newRandomNumber = generatedRandomNumber(minBoundary, maxBoundary, currentGuess);
		setCurrentGuess(newRandomNumber);
		setGuessRounds(prevGuessRounds => [newRandomNumber, ...prevGuessRounds]);
	};

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver(guessRounds.length);
		}
	}, [currentGuess, userNumber, onGameOver]);

	useEffect(() => {
		minBoundary = 1;
		maxBoundary = 100;
	}, []);

	return (
		<View style={styles.screen}>
			<Title>Opponent's Guess</Title>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card>
				<InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={newGuessHandler.bind(this, "lower")}>
							<Ionicons name="md-remove" size={24} color="white" />
						</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={newGuessHandler.bind(this, "greater")}>
							<Ionicons name="md-add" size={24} color="white" />
						</PrimaryButton>
					</View>
				</View>
			</Card>
			<View style={styles.listContainer}>
				{/* {guessRounds.map(guessRound => (
					<Text key={guessRound}>{guessRound}</Text>
        ))} */}

				<FlatList
					data={guessRounds}
					renderItem={itemData => (
						<GuessLogItem
							roundNumber={guessRoundsListLength - itemData.index}
							guess={itemData.item}
						/>
					)}
					keyExtractor={item => item}
				/>
			</View>
		</View>
	);
};

export default GameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
	},
	instructionText: {
		marginBottom: 12,
	},
	buttonsContainer: {
		flexDirection: "row",
	},
	buttonContainer: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
	},
});
