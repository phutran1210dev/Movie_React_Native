import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {ProcessBar} from '../components';
import {COLORS, FONTS, icons, SIZES} from '../constants';

const MovieDetail = ({navigation, route}) => {
  const [selectedMovie, SetSelectedMovie] = useState(null);

  useEffect(() => {
    const _selectedMovie = route.params.selectedMovie;
    SetSelectedMovie(_selectedMovie);
  }, [route.params.selectedMovie]);

  /**
   * @HeaderSection
   */
  const renderHeaderBar = () => {
    return (
      <View style={StyleHeaderDetail.Container}>
        <TouchableOpacity
          style={StyleHeaderDetail.WrapperIcon}
          onPress={() => navigation.goBack()}>
          <Image
            resizeMode="cover"
            source={icons.left_arrow}
            style={StyleHeaderDetail.IconBack}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={StyleHeaderDetail.WrapperIcon}
          onPress={() => console.log('share')}>
          <Image
            resizeMode="cover"
            source={icons.upload}
            style={StyleHeaderDetail.IconShare}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderHeaderSection = () => {
    return (
      <ImageBackground
        source={selectedMovie?.details.image}
        resizeMode="cover"
        style={StyleThumnail.MainThumnail}>
        <View style={StyleThumnail.ThumnailContent}>
          {renderHeaderBar()}
          <View style={StyleThumnail.WrapperSectionContent}>
            <LinearGradient
              start={{x: 0.0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['transparent', '#000']}
              style={StyleThumnail.SectionTextContent}>
              <Text style={StyleThumnail.TextContent}>
                {selectedMovie?.details.season}
              </Text>
              <Text style={StyleThumnail.TextNameContent}>
                {selectedMovie?.name}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    );
  };

  /**
   * @Category
   */
  const renderCategory = () => {
    return (
      <View style={CagegoryContainer.container}>
        <View style={[CagegoryContainer.CagegoryWrapper]}>
          <Text style={CagegoryContainer.AgeContent}>
            {selectedMovie?.details.age}
          </Text>
        </View>
        <View
          style={[
            CagegoryContainer.CagegoryWrapper,
            {paddingHorizontal: SIZES.padding},
          ]}>
          <Text style={CagegoryContainer.AgeContent}>
            {selectedMovie?.details.genre}
          </Text>
        </View>
        <View style={[CagegoryContainer.CagegoryWrapper]}>
          <Image
            source={icons.star}
            resizeMode="contain"
            style={CagegoryContainer.IconContent}
          />
          <Text style={CagegoryContainer.RatingContent}>
            {selectedMovie?.details.ratings}
          </Text>
        </View>
      </View>
    );
  };

  /**
   * @Detail
   */
  const renderDetail = () => {
    return (
      <View style={ContainerDetail.DetailContainer}>
        <View>
          <View style={ContainerDetail.WrapperMovieDetail}>
            <Text style={ContainerDetail.ContentMovieDetail}>
              {selectedMovie?.details.currentEpisode}
            </Text>
            <Text style={ContainerDetail.RunningTimeDetail}>
              {selectedMovie?.details.runningTime}
            </Text>
          </View>
          <ProcessBar
            containerStyle={{marginTop: SIZES.radius}}
            barStyle={{height: SIZES.ProcessDetail, borderRadius: SIZES.base}}
            barPercent={selectedMovie?.details.progress}
          />
        </View>
        {/* Watch */}
        <TouchableOpacity style={ContainerDetail.WrapperContinueWatch}>
          <Text style={{color: COLORS.white, ...FONTS.h2}}>
            {selectedMovie?.details.progress === '0%'
              ? 'WATCH NOW'
              : 'CONTINUE WATCH'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      {renderHeaderSection()}

      {/* CATEGORY & RATING */}
      {renderCategory()}

      {/* MOVIE DETAILS */}
      {renderDetail()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});
const StyleThumnail = StyleSheet.create({
  MainThumnail: {
    width: '100%',
    height: SIZES.height < 700 ? SIZES.height * 0.6 : SIZES.height * 0.7,
  },
  ThumnailContent: {
    flex: 1,
  },
  WrapperSectionContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  SectionTextContent: {
    flex: 1,
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  TextContent: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  TextNameContent: {
    marginTop: SIZES.base,
    color: COLORS.white,
    ...FONTS.h1,
  },
});
const StyleHeaderDetail = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform === 'ios' ? 60 : 40,
    paddingHorizontal: SIZES.padding,
  },
  WrapperIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: COLORS.transparentBlack,
    overflow: 'hidden',
  },
  IconBack: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
  IconShare: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
});

/**
 * @Category_Style
 */
const CagegoryContainer = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: SIZES.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CagegoryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.base,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray1,
  },
  AgeContent: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  RatingContent: {
    marginLeft: SIZES.base,
    color: COLORS.white,
    ...FONTS.h4,
  },
  IconContent: {
    width: 20,
    height: 20,
  },
});

const ContainerDetail = StyleSheet.create({
  DetailContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.padding,
    justifyContent: 'space-around',
  },
  WrapperMovieDetail: {
    flexDirection: 'row',
  },
  ContentMovieDetail: {
    flex: 1,
    color: COLORS.white,
    ...FONTS.h4,
  },
  RunningTimeDetail: {
    color: COLORS.lightGray,
    ...FONTS.h4,
  },
  WrapperContinueWatch: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: Platform.OS === 'ios' ? SIZES.padding * 2 : 0,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
  },
});

export default MovieDetail;
