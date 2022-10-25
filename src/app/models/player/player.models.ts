export interface Player {
  id: string;
  name: string;
  avatar: number;
}

export interface PlayerList extends Player {
  isCurrent: boolean;
  avatarPath: string;
}

export interface AvatarListItem {
  id: number;
  path: string;
}
