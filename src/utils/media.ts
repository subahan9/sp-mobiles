import mediaMap from "../../data/raw/media_map.json";
import postsData from "../../data/raw/posts.json";
import profileData from "../../data/raw/profile.json";

export interface InstagramPost {
  id: string;
  type: string;
  shortCode: string;
  caption: string;
  hashtags: string[];
  mentions: string[];
  url: string;
  commentsCount: number;
  likesCount: number;
  timestamp: string;
  displayUrl: string;
  videoUrl?: string;
  images?: string[];
  childPosts?: {
    id: string;
    type: string;
    displayUrl: string;
    videoUrl?: string;
  }[];
  locationName?: string;
}

export interface InstagramProfile {
  username: string;
  fullName: string;
  biography: string;
  followersCount: number;
  followsCount: number;
  postsCount: number;
  profilePicUrlHD: string;
}

export function getLocalMediaUrl(remoteUrl: string | undefined): string {
  if (!remoteUrl) return "";
  const localPath = (mediaMap as Record<string, string>)[remoteUrl];
  return localPath || remoteUrl;
}

export function getProfile(): InstagramProfile {
  const profile = profileData[0];
  return {
    username: profile?.username || "shasha_professional_mobiles",
    fullName: profile?.fullName || "SP MOBILES",
    biography: profile?.biography || "Premium repair services under 30 minutes.",
    followersCount: profile?.followersCount || 0,
    followsCount: profile?.followsCount || 0,
    postsCount: profile?.postsCount || 0,
    profilePicUrlHD: getLocalMediaUrl(profile?.profilePicUrlHD) || "/photos/profile_hd.jpg"
  };
}

export function getPosts(): InstagramPost[] {
  return (postsData as any[]).map(post => {
    return {
      id: post.id || "",
      type: post.type || "Image",
      shortCode: post.shortCode || "",
      caption: post.caption || "",
      hashtags: post.hashtags || [],
      mentions: post.mentions || [],
      url: post.url || "",
      commentsCount: post.commentsCount || 0,
      likesCount: post.likesCount || 0,
      timestamp: post.timestamp || "",
      displayUrl: getLocalMediaUrl(post.displayUrl),
      videoUrl: post.videoUrl ? getLocalMediaUrl(post.videoUrl) : undefined,
      images: Array.isArray(post.images) ? post.images.map((url: string) => getLocalMediaUrl(url)) : [],
      childPosts: Array.isArray(post.childPosts) ? post.childPosts.map((child: any) => ({
        id: child.id || "",
        type: child.type || "Image",
        displayUrl: getLocalMediaUrl(child.displayUrl),
        videoUrl: child.videoUrl ? getLocalMediaUrl(child.videoUrl) : undefined
      })) : [],
      locationName: post.locationName || ""
    };
  });
}
