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

type InitialState =
  | {
      tweets: { [tweetID: string]: TweetObj };
    }
  | {
      tweets: {};
    };

const initialState: InitialState = {
  tweets: {},
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
  reducers: {
    toggleTweet: (state, action) => {
      state.tweets[action.payload.id] = {
        ...state.tweets[action.payload.id],
        likes:
          action.payload.hasLiked === true
            ? state.tweets[action.payload.id].likes.filter(
                (uid: string) => uid !== action.payload.authedUser
              )
            : state.tweets[action.payload.id].likes.concat([
                action.payload.authedUser,
              ]),
      };
    },
    addTweet: (state, action) => {
      const tweet = action.payload;

      let replyingTo = {};
      if (tweet.replyingTo !== null) {
        replyingTo = {
          [tweet.replyingTo]: {
            ...state.tweets[tweet.replyingTo],
            replies: state.tweets[tweet.replyingTo].replies.concat([tweet.id]),
          },
        };
      }

      state.tweets = { ...state.tweets, [tweet.id]: tweet, ...replyingTo };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.pending, (state) => {
        state.tweets = {};
      })
      .addCase(
        fetchTweets.fulfilled,
        (state, action: PayloadAction<InitialState>) => {
          state.tweets = { ...action.payload };
        }
      );
  },
});

export default tweetsSlice.reducer;

export const { toggleTweet, addTweet } = tweetsSlice.actions;
