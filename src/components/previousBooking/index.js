import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { colors, commonStyles } from '../../styles';
import { utils } from '../../utils';
import { styles } from './styles';
import { CustomButton } from '../customButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating, AirbnbRating } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { rateReviewRequest } from '../../utils/service';
import FloatingTextInput from '../floatingTextInput';

const PreviousBooking = (props) => {

  const [rateParkingModal, setRateParkingModal] = useState(false)
  const [sentFeedBackModal, setSentFeedBackModal] = useState(false)
  const [isRateClicked, setRateClicked] = useState(false)
  const [rate, setRate] = useState(0)
  const [review, setReview] = useState('')
  const dispatch = useDispatch()

  const handleRateParking = () => {
    setSentFeedBackModal(false)
  }

  const  onHandlePublishFeedback = async() => {
    const reqData = {
      place: 3,
      rating: rate,
      review
    }
    setRateParkingModal(false)
    const resp1 = await dispatch(rateReviewRequest(reqData))
    if(resp1?.status){
      setSentFeedBackModal(true)
      setRateClicked(false)
    }
  }

  const  onHandleCloseFeedback = () => {
    setSentFeedBackModal(false)
  }

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating)
    setRate(rating)
    setRateClicked(true)
  }

  return (
    <>
      <View style={[styles.container, {width: props?.fullView ? null : 305}]}>
        <View style={commonStyles.flexRow}>
            <View style={commonStyles.flex8}>
                <Text style={[commonStyles.text_large_thick, commonStyles.lightBlackTextColor]}>
                    NCP Car Park Manchester
                </Text>
                <View style={[ commonStyles.marginTop8, commonStyles.flexRow, , commonStyles.alignItemsCenter]}>
                    {/* <Image source={require('../../assets/marker.png')} style={[commonStyles.marginRight8, commonStyles.size24]} /> */}
                    <Icon name="location-sharp" size={25} color={'black'} />
                    <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor]}>
                        Toronto, Canada
                    </Text>
                </View>
            </View>
        </View>
        <View style={[commonStyles.marginTop16, commonStyles.flexRow, commonStyles.justifyContentBetween]}>
            <View>
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                    In time
                </Text>
                <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor, commonStyles. centerTextAlign]}>
                    10:00AM
                </Text>
            </View>
            <View>
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                    out time 
                </Text>
                <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor, commonStyles. centerTextAlign]}>
                    5:00 PM
                </Text>
            </View>
            <View>
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.centerTextAlign, commonStyles.marginBottom5]}>
                    Total Time
                </Text>
                <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor, commonStyles. centerTextAlign]}>
                  5:00 PM
                </Text>
            </View>
        </View>
        <View style={[commonStyles.flexRow, commonStyles.justifyContentBetween, commonStyles.alignItemsCenter, commonStyles.marginTop15]}>
            <View style={commonStyles.flexRow}>
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor, commonStyles.marginRight8]}>
                  Total Paid
                </Text>
                <Text style={[commonStyles.text_xs_bold, commonStyles.blackTextColor]}>
                  $8.00
                </Text>
            </View>
            <TouchableOpacity style={styles.rateContainer} onPress={() => setRateParkingModal(true)}>
                <View style={[commonStyles.flexRow, commonStyles.alignItemsCenter, commonStyles.justifyContentCenter]}>
                {/* <Image source={require('../../assets/heart.png')} /> */}
                <Icon name="heart-outline" size={25} color={colors.base} />
                <Text style={[commonStyles.text_xs_thick, commonStyles.blueTextColor, commonStyles.marginLeft5]}>
                  Rate parking
                </Text>
                </View>
            </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={rateParkingModal}
        statusBarTranslucent={true}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => {
          setRateParkingModal(false)
          setRateClicked(false)
          setReview('')
        }} >
          <View style={styles.modalContainer}>
            <View style={[styles.modalSubContainer, { height: isRateClicked ? utils.getWindowHeight() * 0.75 : utils.getWindowHeight() * 0.42}]}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={() => setRateParkingModal(false)}>
                <Text style={[commonStyles.text_large_thick, commonStyles.lightBlackTextColor]}>
                  NCP Car Park Manchester
                </Text>
                <TouchableOpacity onPress={() => {
                  setRateParkingModal(false)
                  setRateClicked(false)
                  setReview('')
                }}> 
                  <Icon name="close" size={25} color={'black'} />
              </TouchableOpacity>
              </View>
              <View style={[commonStyles.flexRow, commonStyles.marginTop8, commonStyles.alignItemsCenter]}>
                <Icon name="location-sharp" size={25} color={'black'} />
                {/* <Image source={require('../../assets/marker.png')} style={[commonStyles.marginRight8, commonStyles.size24]} /> */}
                <Text style={[commonStyles.text_xs, commonStyles.darkGreyTextColor]}>
                    Toronto, Canada
                </Text>
              </View>
              <Text style={[commonStyles.text_xxl_thick, commonStyles.darkBlackTextColor, commonStyles.marginTop16]}>
                How did we do?
              </Text>
              <Text style={[{alignSelf: 'flex-start'},commonStyles.text_large, commonStyles.darkBlackTextColor, commonStyles.marginTop16]}>
                Your rating helps us to improve
              </Text>
              <View style={{ paddingVertical: 20}}>
              <AirbnbRating
                onFinishRating={ratingCompleted}
                defaultRating={0}
                showRating={false}
              />
              </View>
              {isRateClicked && <>
                <Text style={[commonStyles.text_xxl_thick, commonStyles.marginBottom24]}>
                  Okay
                </Text>
                <FloatingTextInput
                  style={commonStyles.marginTop24} 
                  label={'What could Have been Better?'}
                  onChangeText={(review) => setReview(review)}
                  value={review}/>
                <CustomButton 
                label={'Publish Feedback'} 
                disabled = {!(rate && review)}
                isPrimaryButton 
                onPress={onHandlePublishFeedback} 
                style={commonStyles.marginTop24}/>
              </>}
            </View>
          </View>
      </Modal>
      <Modal
        visible={sentFeedBackModal} 
        statusBarTranslucent={true}
        transparent={true}
        animationType={'fade'}
        onRequestClose={handleRateParking}>
          <TouchableOpacity style={styles.modalContainer} onPress={handleRateParking}>
            <View style={[styles.modalSubContainer, { height: utils.getWindowHeight() * 0.55}]}>
              <Icon name="checkmark-circle-outline" size={100} color={'#00AF54'} style={commonStyles.alignSelfCenter} />
              <Text style={[commonStyles.text_xxl_thick, commonStyles.darkBlackTextColor, commonStyles.alignSelfCenter]}>
                Thanks for your Feeback
              </Text>
              <Text style={[commonStyles.marginTop16, commonStyles.darkBlackTextColor, commonStyles.text_xs_thick, commonStyles.alignSelfCenter]}>
                It will help us improve our service.
              </Text>
              <CustomButton label={'Close'} style={commonStyles.marginTop24} onPress={onHandleCloseFeedback} />
            </View>
          </TouchableOpacity>
      </Modal>
    </>
  );
}

export default PreviousBooking;
