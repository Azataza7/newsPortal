export interface post {
  id: number;
  title: string;
  image: string | null;
  createdAt: string;
}

export interface fullPost {
  id: number;
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
}

export interface comment {
  id: number;
  post_id: number;
  author: string;
  text: string;
}

export type userComment = Omit<comment, "id">