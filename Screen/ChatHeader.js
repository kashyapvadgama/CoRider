//import libraries
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons, Entypo, Feather } from '@expo/vector-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { ScaledSheet, s, vs, ms, mvs } from 'react-native-size-matters';

//create components
const ChatHeader = ({ name, from, to, memberImages = [] }) => {
  return (
    <View style={styles.header}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={ms(24)} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>{name}</Text>
        </View>

        <View style={styles.iconsRight}>
          <TouchableOpacity style={{ marginRight: ms(10) }}>
            <Feather name="edit" size={ms(24)} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile and Route */}
      <View style={styles.infoRow}>
        <View style={styles.imageGroup}>
          {memberImages.slice(0, 4).map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={[styles.profileImage, { left: ms(index * -10) }]}
            />
          ))}
          <View>
            <Text style={styles.label}>
              From <Text style={styles.value}>{from}</Text>
            </Text>
            <Text style={styles.label}>
              To <Text style={styles.value}>{to}</Text>
            </Text>
          </View>
        </View>

        {/* Menu Trigger */}
        <Menu>
          <MenuTrigger>
            <Entypo name="dots-three-vertical" size={ms(24)} color="black" />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                marginTop: vs(30),
                paddingVertical: ms(4),
                borderRadius: ms(12),
                width: s(150),
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: ms(2) },
                shadowOpacity: 0.2,
                shadowRadius: ms(4),
                elevation: ms(6),
              },
            }}
          >
            <MenuOption onSelect={() => alert('Members')} style={styles.menuItem}>
              <Ionicons name="people-outline" size={ms(20)} />
              <Text style={styles.menuText}>Members</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert('Share Number')} style={styles.menuItem}>
              <Ionicons name="call-outline" size={ms(20)} />
              <Text style={styles.menuText}>Share Number</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert('Report')} style={styles.menuItem}>
              <Ionicons name="close-circle-outline" size={ms(20)} />
              <Text style={styles.menuText}>Report</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

//styling for components

const styles = ScaledSheet.create({
  header: {
    padding: ms(16),
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: ms(24),
    marginLeft: ms(20),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(12),
    justifyContent: "space-between",
  },
  imageGroup: {
    flexDirection: 'row',
    marginRight: ms(12),
  },
  profileImage: {
    width: ms(32),
    height: ms(32),
    borderRadius: ms(16),
    borderWidth: ms(2),
    borderColor: '#fff',
    position: 'relative',
    backgroundColor: '#ccc',
  },
  label: {
    color: '#555',
  },
  value: {
    fontWeight: 'bold',
    color: '#222',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: ms(10),
  },
  menuText: {
    marginLeft: ms(10),
    fontSize: ms(14),
  },
});

//make components available for other
export default ChatHeader;
