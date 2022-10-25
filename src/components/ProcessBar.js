import {View, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constants';

const ProcessBar = ({containerStyle, barStyle, barPercent}) => {
  return (
    <View style={{...containerStyle}}>
      <View style={[processBar._processBar, {...barStyle}]} />

      <View style={[processBar.processBar, {width: barPercent, ...barStyle}]} />
    </View>
  );
};

const processBar = StyleSheet.create({
  _processBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    marginTop: SIZES.base,
    backgroundColor: COLORS.gray,
  },
  processBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginTop: SIZES.base,
    backgroundColor: COLORS.primary,
  },
});

export default ProcessBar;
