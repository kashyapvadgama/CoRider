import { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import ChatBubble from './ChatBubble';
import ChatHeader from './ChatHeader';
import InputBar from './InputBar';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [tripInfo, setTripInfo] = useState({ name: '', from: '', to: '' });
  const [memberImages, setMemberImages] = useState([]); 

  const fetchMessages = async (pageNumber = 0) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(`https://qa.corider.in/assignment/chat?page=${pageNumber}`);
      const data = await res.json();

      // Only set trip info and images on first page
      if (pageNumber === 0) {
        setTripInfo({ name: data.name, from: data.from, to: data.to });

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

      if (data.chats.length === 0) {
        setHasMore(false);
      } else {
        // Append new older messages at the end (since FlatList is inverted)
        setMessages((prevMessages) => [...prevMessages, ...data.chats.reverse()]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMessages(0);
  }, []);

  const renderItem = ({ item, index }) => {
    return <ChatBubble message={item} />;
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
        onEndReached={() => fetchMessages(page)}
        onEndReachedThreshold={0.2}
        ListFooterComponent={loading ? <ActivityIndicator style={{ marginVertical: 10 }} /> : null}
      />
      <InputBar to={tripInfo.to} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
