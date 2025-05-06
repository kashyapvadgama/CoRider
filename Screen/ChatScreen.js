//import libraries
import { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import ChatBubble from './ChatBubble';
import ChatHeader from './ChatHeader';
import DateSeparator from './DateSeparator';
import InputBar from './InputBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; // Import scaling functions

//create components

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tripInfo, setTripInfo] = useState({ name: '', from: '', to: '' });
  const [memberImages, setMemberImages] = useState([]); 

  const fetchMessages = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`https://qa.corider.in/assignment/chat?page=${page}`);
      const data = await res.json();

      if (page === 0) {
        setTripInfo({ name: data.name, from: data.from, to: data.to });

        // Get 4 unique user profile images
        const imageSet = new Set();
        const images = [];

        for (let chat of data.chats) {
          const img = chat.sender?.image;
          if (img && !imageSet.has(img)) {
            imageSet.add(img);
            images.push(img);
          }
          if (images.length >= 4) break;
        }

        setMemberImages(images);
      }

      setMessages(prev => [...data.chats.reverse(), ...prev]);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []); 

  const renderItem = ({ item, index }) => {
    const currentDate = new Date(item.time).toDateString();
    const prevDate = index < messages.length - 1
      ? new Date(messages[index + 1].time).toDateString()
      : null;

    const showDate = currentDate !== prevDate;

    return (
      <>
        {showDate && <DateSeparator date={currentDate} />}
        <ChatBubble message={item} />
      </>
    );
  };

  return (
      <View style={styles.container}>
        <ChatHeader
          name={tripInfo.name}
          from={tripInfo.from}
          to={tripInfo.to}
          memberImages={memberImages}
        />
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={renderItem}
          inverted  
          onEndReached={fetchMessages}
          onEndReachedThreshold={0.3}
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
          initialNumToRender={10} 
          maxToRenderPerBatch={20} 
        />
        <InputBar to={tripInfo.to} />
      </View>
  );
};

//styling for components
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: moderateScale(24),    
    marginLeft: scale(20), 
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(12), 
    justifyContent: "space-between",
  },
  imageGroup: {
    flexDirection: 'row',
    marginRight: scale(12),     
  },
  profileImage: {
    width: scale(32),   
    height: scale(32),  
    borderRadius: scale(16),    
    borderWidth: scale(2),  
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
    padding: moderateScale(10),     
  },
  menuText: {
    marginLeft: scale(10),  
    fontSize: moderateScale(14),    
  },
});

//make components available for other
export default ChatScreen;
