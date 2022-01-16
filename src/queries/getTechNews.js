import axios from 'axios';

const getTechNews = async () => {
  const { data } = await axios({
    url: 'http://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=7d388446bacc4062b8ac74146bb87a55',
  });
  return data;
};

export default getTechNews;
