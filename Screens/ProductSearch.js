import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import Input from '../Components/Input';

function ProductSearchScreen(props) {
  const [website, setWebsite] = useState(null);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
      <DropDownPicker
        placeholder="Select a website"
        items={[
          {label: 'Amazon', value: 'amazon'},
          {label: 'Newegg', value: 'newegg'},
        ]}
        containerStyle={{
          height: 40,
          flexDirection: 'row',
          marginHorizontal: 20,
          height: 50,
          marginVertical: 5,
        }}
        style={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          borderWidth: 0.4,
          borderColor: 'black',
        }}
        dropDownStyle={{
          borderWidth: 0.4,
          borderColor: 'black',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
        defaultValue={website}
        onChangeItem={(item) => setWebsite(item.value)}
      />
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
