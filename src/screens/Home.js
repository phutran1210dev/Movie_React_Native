import React from 'react';
import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {ProcessBar, Profiles} from '../components';
import {COLORS, dummyData, FONTS, icons, images, SIZES} from '../constants';

const Home = ({navigation}) => {
  /**
   * State
   */

  /**
   *
   * @HEADER
   */
  const renderHeader = () => {
    return (
      <View style={StyleHeader.containerHeader}>
        <TouchableOpacity
          style={StyleHeader.btnButton}
          onPress={() => {
            console.log('Home Netflix');
          }}>
          <Image
            style={StyleHeader.contentProfile}
            source={images.profile_photo}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={StyleHeader.btnButton}
          onPress={() => console.log('share')}>
          <Image style={StyleHeader.contentAirplay} source={icons.airplay} />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   *
   * @NEWSECTION
   */
  // const newSeassonScrollX = new Animated.Value(0);
  const newSeassonScrollX = React.useRef(new Animated.Value(0)).current;
  const renderItem = ({item, index}) => {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() =>
          navigation.navigate('MovieDetail', {selectedMovie: item})
        }>
        <View key={index} style={StyleCard.CardWrapper}>
          <ImageBackground
            resizeMode="cover"
            source={item.thumbnail}
            style={StyleCard.CardContent}>
            <View style={StyleCard.WrapperContent}>
              <View style={StyleCard.PlayIconContainer}>
                <View style={StyleCard.PlayIconOverplay}>
                  <Image
                    style={StyleCard.PlayIcon}
                    source={icons.play}
                    resizeMode="contain"
                  />
                </View>
                <Text style={StyleCard.TextContent}>Play Now</Text>
              </View>
              {item?.stillWatching?.length > 0 && (
                <View style={StyleCard.TextWatchingWrapper}>
                  <Text style={StyleCard.TextWatching}>Still Watching</Text>
                  <Profiles profiles={item?.stillWatching} />
                </View>
              )}
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const renderNewSection = () => {
    return (
      <Animated.FlatList
        style={StyleScrollView.FlatListContainer}
        snapToAlignment="center"
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        data={dummyData.newSeason}
        // snapToOffsets={Array.from({length: dummyData.newSeason?.length}).map(
        //   (item, index) => {
        //     return SIZES.width * index;
        //   },
        // )}
        snapToInterval={SIZES.width}
        keyExtractor={item => item?.id.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: newSeassonScrollX}}}],
          {
            useNativeDriver: false,
            listener: event => {},
          },
        )}
        renderItem={renderItem}
      />
    );
  };

  /**
   *
   * @DOTSECTION
   */
  const renderDots = () => {
    const dotsPosition = Animated.divide(newSeassonScrollX, SIZES.width);
    return (
      <View style={StyleDot.container}>
        {dummyData?.newSeason.map((item, index) => {
          const opacity = dotsPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          const dotWidth = dotsPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 20, 6],
            extrapolate: 'clamp',
          });
          const dotColor = dotsPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={[StyleDot.Dot, {width: dotWidth, color: dotColor}]}
            />
          );
        })}
      </View>
    );
  };

  /**
   *+
   * @WatchingSection
   */
  const renderItemWatching = ({item, index}) => {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => {
          navigation.navigate('MovieDetail', {selectedMovie: item});
        }}>
        <View style={{marginRight: SIZES.padding}}>
          <Image
            source={item?.thumbnail}
            resizeMode="cover"
            style={StyleWatching.CardThumnail}
          />
          <Text style={StyleWatching.CardTextThumnail}>{item?.name}</Text>
          <ProcessBar
            containerStyle={{marginTop: SIZES.radius}}
            barStyle={{height: SIZES.ProcessHeight}}
            barPercent={item?.overallProgress}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const watchingSection = () => {
    return (
      <View style={StyleWatching.WachingContainer}>
        <View style={StyleWatching.WachingWrapper}>
          <Text style={StyleWatching.TextWatching}>Continue Watching</Text>
          <Image
            source={icons.right_arrow}
            resizeMode="cover"
            style={StyleWatching.NextBtn}
          />
        </View>
        <FlatList
          style={StyleWatching.FlatListContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dummyData?.continueWatching}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItemWatching}
        />
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={StyleHeader.container}>
        {renderHeader()}
        <ScrollView style={StyleScrollView.container}>
          {renderNewSection()}
          {renderDots()}
          {watchingSection()}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const StyleHeader = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    // paddingTop: SIZES.padding,
  },
  btnButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  contentProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contentAirplay: {
    width: 25,
    height: 25,
    tintColor: COLORS.primary,
  },
});
const StyleCard = StyleSheet.create({
  CardWrapper: {
    width: SIZES.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CardContent: {
    width: SIZES.width * 0.75,
    height: SIZES.width * 0.75,
    justifyContent: 'flex-end',
    borderRadius: 40,
    overflow: 'hidden',
  },
  WrapperContent: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    marginBottom: SIZES.radius,
    paddingHorizontal: SIZES.radius,
  },
  PlayIconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  PlayIconOverplay: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.transparentWhite,
  },
  PlayIcon: {
    width: 15,
    height: 15,
    tintColor: COLORS.white,
  },
  TextContent: {
    marginLeft: SIZES.base,
    color: COLORS.white,
    ...FONTS.h3,
  },
  TextWatchingWrapper: {
    justifyContent: 'center',
  },
  TextWatching: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});
const StyleScrollView = StyleSheet.create({
  container: {
    paddingBottom: 100,
    marginTop: 10,
  },
});
const StyleDot = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.padding,
  },
  Dot: {
    borderRadius: SIZES.radius,
    marginHorizontal: 3,
    width: 6,
    height: 6,
    backgroundColor: COLORS.primary,
  },
});
const StyleWatching = StyleSheet.create({
  WachingContainer: {
    marginTop: SIZES.padding,
  },
  WachingWrapper: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  TextWatching: {
    flex: 1,
    color: COLORS.white,
    ...FONTS.h2,
  },
  NextBtn: {
    width: 20,
    height: 20,
    tintColor: COLORS.primary,
  },
  FlatListContainer: {
    marginTop: SIZES.padding,
    paddingLeft: SIZES.padding,
    paddingRight: SIZES.padding,
  },
  CardWrapper: {
    marginLeft: SIZES.padding,
    marginRight: SIZES.padding,
  },
  CardThumnail: {
    width: SIZES.width / 3,
    height: SIZES.width / 3 + 60,
    borderRadius: 20,
    overflow: 'hidden',
  },
  CardTextThumnail: {
    flex: 1,
    marginTop: SIZES.base,
    color: COLORS.white,
    ...FONTS.h4,
  },
  CardWrapperLeft: {
    marginLeft: SIZES.padding,
  },
  CardWrapperRight: {
    marginRight: SIZES.padding,
  },
});
export default Home;
