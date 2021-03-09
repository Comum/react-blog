export interface Post {
  id: number;
  name: string;
}

export interface Information {
  posts?: Post[];
  title?: string;
  hero?: string;
  text?: string;
}
