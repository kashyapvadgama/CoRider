//import libraries
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { MaterialIcons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 

//create components
const InputBar = ({ to }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.wrapper}>
      {/* Floating Menu */}
      {menuVisible && (
        <View style={styles.menuWrapper}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuButton} onPress={() => alert('Camera')}>
              <Ionicons name="camera" size={moderateScale(20)} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => alert('Video')}>
              <Ionicons name="videocam" size={moderateScale(20)} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => alert('Gallery')}>
              <MaterialIcons name="photo-library" size={moderateScale(20)} color="white" />
            </TouchableOpacity>
          </View>
          {/* Triangle Pointer */}
          <View style={styles.triangle} />
        </View>
      )}

      {/* Input Bar */}
      <View style={styles.container}>
        <TextInput
          placeholder={`Reply to  @${to}`}
          style={styles.input}
        />

        <TouchableOpacity style={styles.icon} onPress={toggleMenu}>
          <Entypo name="attachment" size={moderateScale(24)} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon}>
          <Ionicons name="send" size={moderateScale(24)} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

//styling for components
const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(8), 
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: verticalScale(40), 
    borderRadius: moderateScale(20), 
    paddingHorizontal: moderateScale(15), 
    backgroundColor: '#f2f2f2',
  },
  icon: {
    marginLeft: scale(10), 
  },
  menuWrapper: {
    position: 'absolute',
    bottom: verticalScale(60), 
    right: scale(10),
    alignItems: 'center',
    zIndex: 1,
  },
  menuContainer: {
    backgroundColor: '#0A8F08',
    borderRadius: moderateScale(30),
    flexDirection: 'row',
    paddingVertical: moderateScale(5),
    elevation: 5,
  },
  menuButton: {
    padding: moderateScale(10), 
    backgroundColor: '#0A8F08',
    borderRadius: moderateScale(25), 
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: moderateScale(8), 
    borderRightWidth: moderateScale(8),
    borderTopWidth: moderateScale(10),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#0A8F08',
    alignSelf: 'flex-end',
    marginRight: scale(40), 
  },
});


//make components available for other
export default InputBar;
