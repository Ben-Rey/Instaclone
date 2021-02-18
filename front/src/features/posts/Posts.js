import React, { useState, useEffect, useRef } from "react";
import fire from "../../fire";
import { useSelector } from "react-redux";

import { Box, Button, Text, TextInput } from "grommet";

import CardConcave from "../../components/CardConcave";
import { Like } from "grommet-icons";
import { Paragraph } from "grommet";
import {
  addPost,
  getPosts,
  likePost,
  deleteAllPosts,
} from "../../services/postsServices";

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
                  <Box pad={{ horizontal: "medium" }} responsive={false}>
                    <Paragraph level="3" margin={{ vertical: "medium" }}>
                      {post.user}
                    </Paragraph>
                    <Paragraph margin={{ top: "none" }}>
                      {post.content}
                    </Paragraph>
                  </Box>
                </Box>
                <Button
                  plain={true}
                  focusIndicator={false}
                  color="primary"
                  icon={
                    <Like
                      color={post.liked ? "orange" : "black"}
                      size="small"
                    />
                  }
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
