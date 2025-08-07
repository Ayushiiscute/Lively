"use server";

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
import { revalidatePath } from "next/cache";
//
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) {
      throw new Error("No stream found");
    }

    const validData = {
      name: values.name,
      thumbnailUrl: values.thumbnailUrl,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch (error) {
    console.error("updateStream", error);
    throw new Error("Internal server error");
  }
};
