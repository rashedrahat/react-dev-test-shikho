import Router from 'next/router';
import client from "../apollo-client";
import {gql} from "@apollo/client";

export const fetchPosts = async () => {
    const {data} = await client.query({
        query: gql`
              query {
                  posts {
                    id
                    data {
                      title
                    }
                  }
                }
            `,
    });

    return data
}

export const fetchComments = async () => {
    const {data} = await client.query({
        query: gql`
              query {
                  comments {
                    id
                    data {
                      body {
                        text
                      }
                    }
                  }
                }
            `,
    });

    return data
}

export const fetchAPost = async (id: string) => {
    const query = gql`
                  query Post($id: String!) {
                    post(_id: $id) {
                          id
                    data {
                      title
                      body {
                        html
                      }
                    }
                    comments {
                      id
                      data {
                        body {
                          text
                        }
                      }
                    }
                    }
                  }
                `;

    const {data} = await client.query({
        query: query,
        variables: {id}
    })

    return data
}

export const createPost = async (payload: any) => {
    const query = gql`
                  mutation Post($payload: any, $connect: any) {
                    createPost(payload: $payload, connect: $connect) {
                          id
                    }
                  }
                `;

    const {data} = await client.query({
        query: query,
        variables: {payload: payload.payload, connect: {comment_ids: payload.connect}}
    })

    return data
}

export const updatePost = async (payload: any) => {
    const query = gql`
                  mutation Post($id: String!, $disconnect: any, $payload: any, $connect: any) {
                    updatePost(_id: $id, disconnect: $disconnect, payload: $payload, connect: $connect) {
                          id
                    }
                  }
                `;

    const {data} = await client.query({
        query: query,
        variables: {id: payload['_id'], payload: payload.payload, connect: {comment_ids: payload.connect}, disconnect: {comment_ids: payload.disconnect}}
    })

    return data
}

export const redirectToTargetedURL = (url: string) => Router.push(url)