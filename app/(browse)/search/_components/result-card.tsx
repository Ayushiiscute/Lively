import React from "react";
import Link from "next/link";
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
import { formatDistanceToNow } from "date-fns";
//
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedMark } from "@/components/verified-mark";

export function ResultCard({
  data,
}: {
  data: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    updatedAt: Date;
    user: User;
  };
}) {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="w-full flex gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
              {data.user.username}
            </p>
            <VerifiedMark />
          </div>
          <p className="text-sm text-muted-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(data.updatedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function ResultCardSkeleton() {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}
