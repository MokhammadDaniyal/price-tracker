import React, {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Button,
  Dimensions,
  TouchableHighlight,
  FlatList,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Input from '../Components/Input';

import images from '../images';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const hoursPicker = [
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
  {label: '6', value: 6},
  {label: '7', value: 7},
  {label: '8', value: 8},
  {label: '9', value: 9},
  {label: '10', value: 10},
  {label: '11', value: 11},
  {label: '12', value: 12},
];
function ProductScreen(props) {
  const list = [
    {
      name: 'Send me push notification once the price drops below ',
      checked: false,
      id: '0',
      inputField: true,
      inputValue: 0,
      isError: false,
    },
    {
      name: 'Send me push notifications daily at',
      checked: false,
      id: '1',
      hoursPicker: true,
      inputValue: 0,
      hoursPickerText: 'select time',
      isError: false,
    },
    {
      name: 'Send me push notifications weekly starting on',
      checked: false,
      id: '2',
      dayPicker: true,
      inputValue: 0,
      dayPickerText: 'select day',
      isError: false,
    },
    {
      name: 'Send me emails about this product daily at',
      checked: false,
      id: '3',
      hoursPicker: true,
      inputValue: 0,
      hoursPickerText: 'select time',
      isError: false,
    },
    {
      name: 'Send me emails about this product weekly starting on ',
      checked: false,
      id: '4',
      dayPicker: true,
      inputValue: 0,
      dayPickerText: 'select day',
      isError: false,
    },
  ];
  const [modalList, setModalList] = useState(list);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [pickerItemId, setPickerItemId] = useState('0');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dropBelowPrice, setDropBelowPrice] = useState(0);
  const [isTrackingAlready, setIsTrackingAlready] = useState(false);
  const product = {
    image: images.ps4,
    title: 'Play station 4 slim',
    description: "Ps5 is coming out soon, don't waste your money!",
    price: 350,
  };
  const oldPrice = 400;
  const monthMap = {
    0: 'January',
    1: 'Febuary',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  resetModalState = () => {
    setModalList(list);
    setPickerItemId('0');
    setDropBelowPrice(0);
    if (isTrackingAlready) {
      setIsTrackingAlready(false);
      return;
    }
    setIsModalVisible(true);
  };
  handleTimeConfirm = (time) => {
    const listToUpdate = [...modalList];
    listToUpdate.splice(pickerItemId, 1, {
      ...listToUpdate[pickerItemId],
      inputValue: time,
      isError: false,
      hoursPickerText: time.getHours() + ':' + time.getMinutes(),
    });
    setModalList(listToUpdate);
    setIsTimePickerVisible(false);
  };

  handleDateConfirm = (date) => {
    const listToUpdate = [...modalList];
    listToUpdate.splice(pickerItemId, 1, {
      ...listToUpdate[pickerItemId],
      inputValue: date,
      isError: false,
      dayPickerText:
        date.getDate() +
        ' of ' +
        monthMap[date.getMonth()] +
        ' at ' +
        date.getHours() +
        ':' +
        date.getMinutes(),
    });
    setModalList(listToUpdate);
    setIsDatePickerVisible(false);
  };

  handleTimeOpen = (item) => {
    setPickerItemId(item.id);
    setIsTimePickerVisible(true);
  };

  handleDateOpen = (item) => {
    setPickerItemId(item.id);
    setIsDatePickerVisible(true);
  };

  handleListSelect = (item) => {
    const listToUpdate = [...modalList];
    listToUpdate.splice(item.id, 1, {
      ...listToUpdate[item.id],
      isError: false,
      checked: !item.checked,
    });
    setModalList(listToUpdate);
  };

  handleSavePreferences = () => {
    const errorElem = modalList.find((elem) => {
      if (elem.checked && elem.inputValue === 0) {
        return elem;
      }
      return undefined;
    });
    if (errorElem) {
      const listToUpdate = [...modalList];
      listToUpdate.splice(errorElem.id, 1, {
        ...errorElem,
        isError: true,
      });
      setModalList(listToUpdate);
    } else {
      const hasSelected = modalList.some((elem) => elem.checked);
      if (hasSelected) {
        setIsTrackingAlready(true);
      }
      setIsModalVisible(false);
    }
  };

  renderListItem = ({item}) => {
    return (
      <View
        key={item.name}
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 10,
        }}>
        <Icon
          style={{paddingTop: 10}}
          name={item.checked ? 'circle' : 'circle-o'}
          size={27}
          color="#68a0cf"
          onPress={() => handleListSelect(item)}
        />
        <View style={{flex: 1, flexDirection: 'row', paddingLeft: 5}}>
          <Text style={{fontSize: 19, flex: 1}}>
            {item.name}{' '}
            {item.hoursPicker && (
              <Text
                style={{
                  color: item.isError ? 'red' : '#0645AD',
                }}
                onPress={() => handleTimeOpen(item)}>
                {item.hoursPickerText}
              </Text>
            )}
            {item.dayPicker && (
              <Text
                style={{color: item.isError ? 'red' : '#0645AD'}}
                onPress={() => handleDateOpen(item)}>
                {item.dayPickerText}
              </Text>
            )}
            {item.inputField && (
              <View
                style={{
                  height: 25,
                  width: 50,
                }}>
                <TextInput
                  keyboardType="numeric"
                  style={{
                    flex: 1,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    borderColor: item.isError ? 'red' : 'lightgray',
                  }}
                  value={dropBelowPrice}
                  onChangeText={(text) => {
                    setDropBelowPrice(text);
                  }}
                />
              </View>
            )}
          </Text>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            // TODO: probs won't work on Anrdoid ?
            headerTextIOS="Pick a time"
            onConfirm={(time) => handleTimeConfirm(time)}
            onCancel={() => setIsTimePickerVisible(false)}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            // TODO: probs won't work on Anrdoid ?
            headerTextIOS="Pick a date"
            onConfirm={(date) => handleDateConfirm(date)}
            onCancel={() => setIsDatePickerVisible(false)}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <ImageBackground
          style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}
          source={images.ps4}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: 5,
            }}>
            <TouchableHighlight
              style={{
                ...styles.trackItemButton,
                backgroundColor: isTrackingAlready ? 'red' : '#68a0cf',
              }}
              onPress={resetModalState}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  padding: 5,
                  fontSize: 17,
                }}>
                {isTrackingAlready ? 'Stop tracking item' : 'Track this item'}
              </Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          paddingLeft: 10,
          flex: 1,
          justifyContent: 'space-around',
          // alignItems: 'center',
          flexDirection: 'column',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <View style={{alignItems: 'center', marginTop: 15, marginBottom: 15}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              {product.title}
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: 'red',
              flex: 1,
              alignItems: 'flex-start',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            <Text style={{fontSize: 19}}>
              Current price is:{' '}
              <Text
                style={[
                  product.price > oldPrice ? {color: 'red'} : {color: 'green'},
                ]}>
                {product.price} CAD
              </Text>
            </Text>
            <Text style={{fontSize: 19}}>
              {oldPrice && (
                <Text>
                  Price when started tracking was:{' '}
                  <Text
                    style={[
                      product.price < oldPrice
                        ? {color: 'red'}
                        : {color: 'green'},
                    ]}>
                    {oldPrice} CAD
                  </Text>
                </Text>
              )}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Description:</Text>
          <Text style={{fontSize: 19, marginTop: 10}}>
            {product.description}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <Text>3</Text>
        </View>
      </View>
      <Modal
        style={{flex: 1}}
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn={'slideInUp'}
        animationOut={'slideOutUp'}>
        <View
          style={{
            height: 470,
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 15,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20, padding: 5, textAlign: 'center'}}>
              Let us know when would you want to be notified:
            </Text>
            <FlatList data={modalList} renderItem={renderListItem} />
            <TouchableHighlight
              style={{
                ...styles.trackItemButton,
                marginBottom: 10,
              }}
              onPress={handleSavePreferences}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  padding: 5,
                  fontSize: 17,
                }}>
                Save preferences
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  trackItemButton: {
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
export default ProductScreen;
