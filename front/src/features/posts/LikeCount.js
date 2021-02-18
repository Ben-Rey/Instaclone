import React from "react";
import { Like } from "grommet-icons";

export default function LikeCount({ email, post }) {
  const nbLike = post.liked.length;
  const style = {
    p: {
      color: "white",
    },
  };
  console.log(email);
  return (
    <div>
      <Like
        color={post.liked.includes(email) ? "orange" : "black"}
        size="small"
      />
      <p style={style.p}>{nbLike}</p>
    </div>
  );
}
