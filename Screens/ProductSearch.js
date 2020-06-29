import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import Input from '../Components/Input';

function ProductSearchScreen(props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
      <Input placeholder="Product Name" />

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
