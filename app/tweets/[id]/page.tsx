import db from "@/app/lib/db";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tweet;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: number };
}) {
  const id = Number(params.id);
  const tweet = await getTweet(id);
  return (
    <div className="flex flex-col p-6">
      <span>{tweet?.tweet}</span>
      <span className="py-6">by {tweet!.user.username}</span>
    </div>
  );
}
