import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../theme';
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

const { width, height } = Dimensions.get('window');

export default function AllMoviesScreen() {
  const navigation = useNavigation();
  const { params: data } = useRoute();

  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(data.data);
  }, []);

  return (
    <View
      contentContainerStyle={{ paddingBottom: 20 }}
      className='flex-1 bg-neutral-900'
    >
      <View className='w-full'>
        <SafeAreaView className='absolute z-20 w-full flex-row justify-between items-center px-4'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className='rounded-xl p-1'
          >
            <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
          </TouchableOpacity>
          <Text style={styles.text} className='text-2xl'>
            {data.title} Movies
          </Text>
        </SafeAreaView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className='mt-12'
      >
        <View className='flex-row justify-between flex-wrap'>
          {results.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push('Movie', item)}
              >
                <View className='space-y-2 mb-4'>
                  <Image
                    className='rounded-3xl'
                    source={{
                      uri: image185(item?.poster_path) || fallbackMoviePoster,
                    }}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className='text-neutral-300 ml-1'>
                    {item?.title.length > 22
                      ? item?.title.slice(0, 22) + '...'
                      : item?.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
