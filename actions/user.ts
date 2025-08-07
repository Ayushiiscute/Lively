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
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const updateUser = async (values: Partial<User>) => {
  const self = await getSelf();

  const validData = {
    bio: values.bio,
  };

  const user = await db.user.update({
    where: { id: self.id },
    data: validData,
  });

  revalidatePath(`/${self.username}`);
  revalidatePath(`/u/${self.username}`);

  return user;
};
