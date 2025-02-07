import TweetList from "./components/tweet-list";
import db from "./lib/db";
import { Prisma } from "@prisma/client";

async function getInitialTweets() {
  const tweet = await db.tweet.findMany({
    select: {
      tweet: true,
      created_at: true,
      id: true,
    },

    orderBy: {
      created_at: "desc",
    },
  });

  return tweet;
}

export type initialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();
  return (
    <div>
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}
