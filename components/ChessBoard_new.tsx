import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ChessBoard = () => {
  const [horsePosition, setHorsePosition] = useState({ row: 5, col: 2 });
  const [possibleMoves, setPossibleMoves] = useState([]);

  const handleSquarePress = (row, col) => {
    // If the clicked square is a possible move, move the horse there
    if (possibleMoves.some(move => move.row === row && move.col === col)) {
      setHorsePosition({ row, col });
      setPossibleMoves([]); // Clear possible moves after horse moves
    } 
    else if (horsePosition.row === row && horsePosition.col === col) {
      // If the clicked square is the current horse position, calculate possible moves
      const moves = calculatePossibleMoves(row, col);
      setPossibleMoves(moves);
    }
  };

  const calculatePossibleMoves = (row, col) => {
    const possibleMoves = [
      { row: row - 2, col: col - 1 },
      { row: row - 2, col: col + 1 },
      { row: row - 1, col: col - 2 },
      { row: row - 1, col: col + 2 },
      { row: row + 1, col: col - 2 },
      { row: row + 1, col: col + 2 },
      { row: row + 2, col: col - 1 },
      { row: row + 2, col: col + 1 },
    ];

    // Filter out positions that are outside the board
    return possibleMoves.filter(
      (move) => move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8
    );
  };

  const isSquareBlack = (row, col) => {
    return (row + col) % 2 === 1; // Chessboard pattern: sum of row and col determines the color
  };

  return (
    <View style={styles.board}>
      {[...Array(8)].map((_, row) => (
        <View key={row} style={styles.row}>
          {[...Array(8)].map((_, col) => {
            const isHorse = horsePosition.row === row && horsePosition.col === col;
            const isPossibleMove = possibleMoves.some(
              (move) => move.row === row && move.col === col
            );

            return (
              <TouchableOpacity
                key={col}
                style={[
                  styles.square,
                  {
                    backgroundColor: isPossibleMove
                      ? '#aaffaa' // Highlight possible moves in green
                      : isHorse
                      ? '#ffaa00' // Highlight current horse position in orange
                      : isSquareBlack(row, col)
                      ? '#444'
                      : '#fff', // Standard black and white chessboard colors
                  },
                ]}
                onPress={() => handleSquarePress(row, col)}
              >
                {isHorse && <Text style={styles.horse}>🐴</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  horse: {
    fontSize: 20,
  },
});

export default ChessBoard;
