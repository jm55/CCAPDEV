import { getDb } from '../conn.js';

const postsCollection = getDb().collection('posts');

export function addPost (post) {
    return postsCollection.insertOne(post);
}

export function addPosts (posts) {
    return postsCollection.insertMany(posts);
}

export function getPosts () {
    return postsCollection.find({}).toArray();
}

export function deleteAllPosts () {
    return postsCollection.deleteMany({});
}