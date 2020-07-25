import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import images from '../images';
import Input from '../Components/Input';
import {getNeweggProducts} from '../network/';

function ProductSearchScreen(props) {
  const [website, setWebsite] = useState(null);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [isLoadingMoreProducts, setisLoadingMoreProducts] = useState(false);

  onScrollHandler = () => {
    setPage(page + 1);
    setisLoadingMoreProducts(true);
  };
  useEffect(() => {
    getNeweggProducts(searchText, page * 10, (dataList) => {
      setData(dataList);
      setisLoadingMoreProducts(false);
    });
  }, [page]);
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
      <Input
        placeholder="Product Name"
        onChange={(input) => {
          setSearchText(input);
        }}
      />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.link}
          renderItem={({item}) => renderListItem(item)}
          onEndReached={onScrollHandler}
          onEndThreshold={0}
        />
      </View>
      <Button
        onPress={() => {
          props.navigation.navigate('Product');
        }}
        title="GO TO Product"></Button>
      <Button
        onPress={() => {
          getNeweggProducts(searchText, 10, (dataList) => {
            setData(dataList);
            setisLoadingMoreProducts(false);
          });
        }}
        title="Search"></Button>
      {isLoadingMoreProducts && <ActivityIndicator size="large" />}
    </View>
  );
}

function renderListItem({title, price, reviews, image}) {
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
        source={{uri: image}}
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

export default ProductSearchScreen;
