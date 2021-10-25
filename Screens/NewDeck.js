import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Input } from "react-native-elements";
import { getDecks, saveDeckTitle } from "../utils/api";

export const NewDeck = ({ navigation, route }) => {
	const { decks } = route.params;
	//console.log(decks);
	const [input, updateInput] = useState("");
	const isDisabled = () => (input === "" ? true : false);

	const handleSubmit = () => {
		getDecks().then((allDecks) => {
			const trimmedInput = input.replace(/ /g, "");
			if (!allDecks[trimmedInput]) {
				return saveDeckTitle(trimmedInput, input).then(() =>
					navigation.navigate("Deck", {
						deckTitle: input,
						numberOfCards: 0,
						isNewDeck: true,
					})
				);
			} else {
				alert("There is already a Deck with this title. Please choose another name.");
			}
		});
	};

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<Text style={styles.heading}>What is the title of your new deck?</Text>
			<Input
				placeholder="Deck Title"
				value={input}
				onChangeText={(newInput) => updateInput(newInput)}
			/>
			<TouchableOpacity
				style={[styles.button, isDisabled() ? styles.disabled : styles.active]}
				disabled={isDisabled()}
				onPress={handleSubmit}
			>
				<Text style={styles.buttonText}>Create Deck</Text>
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
	heading: {
		fontSize: 40,
		marginBottom: 30,
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
