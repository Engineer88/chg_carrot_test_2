import Link from "next/link";
import { initialTweets } from "../page";

interface TweetListProps {
  initialTweets: initialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  return (
    <div className="flex flex-col justify-between items-center py-3 bg-neutral-600 gap-3">
      {initialTweets.map((tweet) => (
        <Link key={tweet.id} href={`/tweets/${tweet.id}`}>
          <div className="text-lg font-semibold p-6 bg-neutral-400">
            <span>{tweet.tweet}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
