import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export const Score = ({ route, navigation }) => {
	const { correctAnswers, incorrectAnswers, deckTitle } = route.params;
	const totalAnswers = correctAnswers + incorrectAnswers;
	const percentage = 100 / (totalAnswers / correctAnswers);
	return (
		<View style={styles.container}>
			<View style={styles.results}>
				<Text style={styles.percentage}>{percentage.toFixed(0)}%</Text>
				<Text style={styles.score}>
					You answered correctly {correctAnswers} of {totalAnswers} questions!
				</Text>
			</View>
			<View>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Deck")}>
					<Text style={styles.buttonText}>Back to Deck</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, { marginTop: 10, backgroundColor: "#444" }]}
					onPress={() =>
						navigation.navigate("Quiz", {
							deckTitle,
						})
					}
				>
					<Text style={[styles.buttonText, { color: "white" }]}>Restart Quiz</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
	},
	results: {
		justifyContent: "space-between",
		alignItems: "center",
	},
	percentage: {
		fontSize: 60,
		fontWeight: "bold",
	},
	score: {
		fontSize: 30,
		textAlign: "center",
	},
	button: {
		justifyContent: "center",
		alignSelf: "center",
		borderWidth: 2,
		width: 150,
		height: 60,
		borderRadius: 8,
	},
	buttonText: {
		alignSelf: "center",
		fontSize: 20,
	},
});
