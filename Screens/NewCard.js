import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { CheckBox, Input, Button } from "react-native-elements";
import { addCardToDeck, getDeck } from "../utils/api";

const check_props = [
  { label: 'Correct', value: 'Correct' },
  { label: 'Incorrect', value: 'Incorrect' },
];

export const NewCard = ({ navigation, route }) => {
	const [input, setInput] = useState("");
	const [selectedAnswer, setSelectedAnswer] = useState(null);

	const isDisabled = () => (input === "" || selectedAnswer === null ? true : false);

	const handleSubmit = () => {
		if (input !== "" && selectedAnswer !== null) {
			const deckTitle = route.params.deckTitle;
			const deck = deckTitle.replace(/ /g, "");
			const card = {
				question: input,
				answer: selectedAnswer,
			};
			addCardToDeck(deck, card).then(() => {
				getDeck(deck).then((updatedDeck) =>
					navigation.navigate("Deck", {
						deckTitle,
						deck: updatedDeck,
						numberOfCards: updatedDeck.questions.length,
					})
				);
			});
		} else {
			alert("You must fill the question and the answer!");
		}
	};
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<Input
				placeholder="Type your question here"
				value={input}
				onChangeText={(newInput) => setInput(newInput)}
			/>
			<CheckBox
				checked={check_props}
				// initial={null}
				// formHorizontal={true}
				// labelHorizontal={false}
				// buttonColor={"#444"}
				onPress={(value) => setSelectedAnswer(value)}
			/>
			<TouchableOpacity
				style={[styles.button, isDisabled() ? styles.disabled : styles.active]}
				onPress={handleSubmit}
				disabled={isDisabled()}
			>
				<Text style={styles.buttonText}>Submit</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		justifyContent: "center",
		alignSelf: "center",
		borderWidth: 2,
		width: 150,
		height: 60,
		borderRadius: 8,
		marginTop: 20,
	},
	buttonText: {
		alignSelf: "center",
		color: "#fff",
		fontSize: 20,
	},
	active: {
		backgroundColor: "#444",
	},
	disabled: {
		backgroundColor: "#999999",
		borderWidth: 0,
	},
});