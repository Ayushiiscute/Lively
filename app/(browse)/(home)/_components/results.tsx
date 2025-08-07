import React from "react";

import { getStreams } from "@/lib/feed-service";
import { Skeleton } from "@/components/ui/skeleton";
export interface User {
  id: string;
  username: string;
  imageUrl: string;
  externalUserId: string;
  bio?: string;
  following: Follow[];
  followedBy: Follow[];
  blocking: Block[];
  blockedBy: Block[];
  stream?: Stream;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stream {
  id: string;
  name: string;
  thumbnailUrl?: string;
  ingressId?: string;
  serverUrl?: string;
  streamKey?: string;
  isLive: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  follower: User;
  following: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Block {
  id: string;
  blockerId: string;
  blockedId: string;
  blocker: User;
  blocked: User;
}
import { ResultCard, ResultCardSkeleton } from "../result-card";

export async function Results() {
  const data = await getStreams();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Streams we think you&apos;ll like
      </h2>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">No streams found.</div>
      )}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data.map((result: Stream) => (
          <ResultCard key={result.id} data={{ ...result, thumbnailUrl: result.thumbnailUrl ?? null }} />
        ))}
      </div>
    </div>
  );
}

export function ResultsSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
