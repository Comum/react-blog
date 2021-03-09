import type { Post, Information } from "../Types/post";

const fetchPost = (id: number): Promise<Information> => {
  return fetch("/data/info.json")
    .then((res) => res.json())
    .then((data) => {
      if (!(id in data)) {
        return undefined;
      }

      return data[id];
    });
};

const fetchPosts = async (): Promise<Post[]> => {
  return fetch("/data/info.json")
    .then((res) => res.json())
    .then((data) => {
      const keys = Object.keys(data);

      return keys.map((key) => {
        return { id: parseInt(key, 10), name: data[key].name };
      });
    });
};

export { fetchPost, fetchPosts };
