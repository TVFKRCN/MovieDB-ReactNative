import { View, Text, Button, ScrollView } from 'react-native';
import { useState, useCallback } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function MovieVideos({ data }) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View>
      <View className='mx-4 mb-4'>
        <Text className='text-white text-xl'>Trailers</Text>
      </View>

      {data.map((item, index) => {
        if (item.type === 'Trailer')
          return (
            <YoutubePlayer
              webViewStyle={{ opacity: 0.99 }}
              key={index}
              height={250}
              play={playing}
              videoId={item.key}
              onChangeState={onStateChange}
            />
          );
      })}
    </View>
  );
}
