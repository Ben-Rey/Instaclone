import React, { useState, useEffect, useRef } from "react";
import fire from "../../fire";
import { useSelector } from "react-redux";

import { Box, Button, Text, TextInput } from "grommet";

import CardConcave from "../../components/CardConcave";
import { Paragraph } from "grommet";
import {
  addPost,
  getPosts,
  likePost,
  deleteAllPosts,
} from "../../services/postsServices";
import LikeCount from "./LikeCount";
const Posts = () => {
  const posts = useSelector((state) => state.posts.value);
  const [content, setcontent] = useState();
  const userEmail = useRef(fire.auth().currentUser.email);

  const publish = (e) => {
    e.preventDefault();
    if (content) {
      addPost(content, userEmail.current);
      setcontent("");
    }
  };

  const like = (e, id) => {
    e.preventDefault();
    likePost(id);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box
      fill
      align="center"
      gap="medium"
      background="linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
    >
      <div style={{ height: "200px" }}>
        <Box margin={{ top: "30px" }} direction="row">
          <Button
            plain={false}
            primary
            label="delete all"
            onClick={(e) => deleteAllPosts(userEmail.current)}
          />
          <Box gap="small">
            <TextInput
              placeholder="content"
              value={content}
              onChange={(e) => setcontent(e.target.value)}
            />
          </Box>
          <Button label="publier" onClick={(e) => publish(e)} />
        </Box>
      </div>
      <Box
        margin={{ top: "30px" }}
        // height="200px"
        overflow="auto"
        gap="medium"
        height="large"
      >
        {posts ? (
          posts.map((post) => (
            <CardConcave key={post.id}>
              <Box direction="row" align="center" justify="around" pad="small">
                <Box>
                  <Box
                    pad={{ horizontal: "medium" }}
                    responsive={false}
                    width="medium"
                    wrap={true}
                  >
                    <Paragraph
                      level="3"
                      margin={{ vertical: "medium" }}
                      size="small"
                    >
                      {post.user}
                    </Paragraph>
                    <Paragraph margin={{ top: "none" }}>
                      {`Message: ${post.content}`}
                    </Paragraph>
                  </Box>
                </Box>
                <Button
                  plain={true}
                  focusIndicator={false}
                  color="primary"
                  icon={<LikeCount post={post} email={userEmail.current} />}
                  onClick={(e) => like(e, post.id)}
                />
              </Box>
            </CardConcave>
          ))
        ) : (
          <Text>Pas de posts</Text>
        )}
      </Box>
    </Box>
  );
};

export default Posts;
