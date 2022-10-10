export interface Player {
  id: string;
  name: string;
}

export interface PlayerList extends Player {
  isCurrent: boolean;
}
