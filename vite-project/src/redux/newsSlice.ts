import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsState {
  articles: Article[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


const BASE_URL = 'https://newsapi.org/v2/everything?q=bitcoin';
const API_KEY = '84dbfb2c5e784833beb92aa1b66b83ca';


export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apiKey: API_KEY,
      },
    });
    console.log('API Response:', response.data.articles); 
    return response.data.articles;
  } catch (error) {
    console.error('API Error:', error); 
    throw error;
  }
});


const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    status: 'idle',
    error: null,
  } as NewsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
        console.log('Fetch News Pending');
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
        console.log('Updated Articles in State:', state.articles);
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        console.log('Fetch News Rejected:', action.error.message);
      });
  },
});

export default newsSlice.reducer;