import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, FlatList, Image} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import images from '../images';
import Input from '../Components/Input';

function ProductSearchScreen(props) {
  const [website, setWebsite] = useState(null);
  return (
    <View
      style={{
        backgroundColor: 'white',
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
      <View style={{flex: 1, flexDirection: 'row'}}>
        <FlatList data={DATA} renderItem={({item}) => renderListItem(item)} />
      </View>
      <Text>ProductSearch!</Text>
      <Button
        onPress={() => {
          props.navigation.navigate('Product');
        }}
        title="GO TO Product"></Button>
    </View>
  );
}

function renderListItem({title, price, reviews}) {
  return (
    <View
      style={{
        borderColor: 'black',
        borderWidth: 0.2,
        backgroundColor: '#F6F6F6',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        height: 200,
        borderRadius: 10,
        marginVertical: 5,
      }}>
      <Image
        style={{flex: 1, height: 150, marginLeft: 10}}
        source={images.ps4}
      />
      <View
        style={{
          paddingTop: 20,
          marginLeft: 20,
          marginRight: 10,
          flex: 1,
          flexDirection: 'column',
          height: '100%',
        }}>
        <View
          style={{
            flex: 1.5,
            flexGrow: 1,
            alignSelf: 'baseline',
          }}>
          <Text
            style={{flex: 1, fontSize: 19}}
            numberOfLines={5}
            ellipsizeMode="tail">
            {title}
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <Text style={{fontSize: 16, paddingBottom: 20}}>Price: {price}</Text>
        </View>
      </View>
    </View>
  );
}
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title:
      'First Item with a very very very very very very very very very very very very very very very very long description',
    price: 2500,
    reviews: 1231123,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title:
      'Second Item with much much much much much much much much much much much much much much much much much much much much much much much much long description',
    price: 2500,
    reviews: 1231123,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Short description',
    price: 2500,
    reviews: 1231123,
  },
];

export default ProductSearchScreen;
