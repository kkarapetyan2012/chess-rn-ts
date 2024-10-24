import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChessBoard from '@/components/ChessBoard';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <ChessBoard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default App;
