import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

function ProductSearchScreen(props) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>ProductSearch!</Text>
      <Button
        onPress={() => {
          props.navigation.navigate('Product');
        }}
        title="GO TO Product"></Button>
    </View>
  );
}

export default ProductSearchScreen;
