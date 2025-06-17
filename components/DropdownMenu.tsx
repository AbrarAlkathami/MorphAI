import React, { useState } from 'react';
import { StyleSheet, View, } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'GPT 4o', value: '1' },
  { label: '4o-mini', value: '2' },
  { label: 'DeepSeek', value: '3' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.dropdownWrapper}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#2e2e2e' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={{ display: 'none' }}
          containerStyle={styles.dropdowncontainer}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select model' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
         
        />
      </View>
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',    backgroundColor:'transparent',
  },
  dropdownWrapper: {
    width: 200,
    position: 'relative',
    
  },
  label: {
    position: 'absolute',
    top: -10,
    right: 10,
    backgroundColor:'transparent',
        paddingHorizontal: 4,
    fontSize: 12,
    zIndex: 1,
    color: '#7d7d7d',
    
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    backgroundColor:'transparent',
    paddingHorizontal: 8,
    width: '100%',
    
  },
  item: {
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderBottomWidth: 0.5,
  borderBottomColor: '#5a5a5a',
},
itemWrapper: {
  backgroundColor: '#474747', // ensure it matches the container to hide the white
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderBottomWidth: 0.5,
  borderBottomColor: '#5a5a5a',
},

itemText: {
  color: '#d1d1d1',
  fontSize: 14,
},

selectedItem: {
  backgroundColor: '#2e2e2e',
  borderRadius: 8,

  
},

selectedItemText: {
  color: '#ffffff',
  fontWeight: 'bold',
  
},
  dropdowncontainer: {
  backgroundColor: '#474747',
  borderRadius: 12,
  borderWidth: 0,
  
  
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#7d7d7d',
        borderRadius:12,
        backgroundColor:'transparent',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#7d7d7d',
        backgroundColor:'transparent',
  },
});
