//import libraries
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 


//create components
const ChatBubble = ({ message }) => {
  const isSelf = message.sender.self;
  return (
    <View style={[styles.container, isSelf ? styles.rightAlign : styles.leftAlign]}>
      {!isSelf && (
        <View style={styles.avatarContainer}>
          <Image source={{ uri: message.sender.image }} style={styles.avatar} />
        </View>
      )}
      <View style={[styles.bubble, isSelf ? styles.selfBubble : styles.otherBubble]}>
        <Text style={{ color: isSelf ? '#fff' : '#000' }}>{message.message}</Text>
      </View>
    </View>
  );
};


//styling for components
const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(10), 
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: scale(15), 
  },
  leftAlign: {
    justifyContent: 'flex-start',
  },
  rightAlign: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '70%',
    padding: moderateScale(10),     
    borderRadius: moderateScale(12),    
    marginTop: verticalScale(5),                                                     
  },
  selfBubble: {
    backgroundColor: '#0078fe',
    borderBottomRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: '#eee',
    borderTopLeftRadius: 0,
  },
  avatarContainer: {
    marginRight: scale(10),     
    alignSelf: 'flex-start',
    marginTop: verticalScale(5),    
  },
  avatar: {
    width: scale(30),   
    height: scale(30),  
    borderRadius: scale(15),    
  },
});

//make components available for other
export default ChatBubble;
