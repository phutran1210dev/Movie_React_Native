import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../constants';

const Profiles = ({profiles}) => {
  if (profiles?.length <= 3) {
    return (
      <View style={styles.container}>
        {profiles?.map((item, index) => (
          <View
            key={`profile-${index}`}
            style={[index === 0 ? null : styles.containerProfile]}>
            <Image
              source={item?.profile}
              resizeMode="cover"
              style={styles.profileImage}
            />
          </View>
        ))}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {profiles?.map((item, index) => {
          if (index <= 2) {
            return (
              <View
                key={`profile-${index}`}
                style={[index === 0 ? null : styles.containerProfile]}>
                <Image
                  source={item?.profile}
                  resizeMode="cover"
                  style={styles.profileImage}
                />
              </View>
            );
          }
        })}
        <Text style={styles.TextProfile}>+{profiles?.length - 3}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerProfile: {
    marginLeft: -15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.black,
  },
  TextProfile: {
    marginLeft: SIZES.base,
    color: COLORS.white,
    ...FONTS.h4,
  },
});

export default Profiles;
