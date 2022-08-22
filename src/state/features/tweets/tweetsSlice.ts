import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getInitialData } from "../../../utils/api";

type TweetObj = {
  id: string;
  text: string;
  author: string;
  timestamp: number;
  likes: string[] | [];
  replies: string[] | [];
  replyingTo: null | string;
};

type Tweet = {
  tweetID: TweetObj;
};

type InitialState = {
  Tweets: Tweet[];
};

const initialState: InitialState = {
  Tweets: [],
};

// Generates pending, fulfilled and rejected action types
export const fetchTweets = createAsyncThunk("tweets/fetchTweets", async () => {
  try {
    const { tweets } = await getInitialData();
    return tweets;
  } catch (error) {
    console.log(error.message);
  }
});

const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTweets.fulfilled,
      (state, action: PayloadAction<Tweet[]>) => {
        state.Tweets = action.payload;
      }
    );
  },
});

export default tweetsSlice.reducer;
