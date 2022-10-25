import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {COLORS} from '../constants';

const TabIcon = ({focused, icon}) => {
  return (
    <View style={styles.container}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[
          styles.ImgContainer,
          {tintColor: focused ? COLORS.primary : COLORS.gray},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImgContainer: {
    width: 25,
    height: 25,
  },
});

export default TabIcon;
