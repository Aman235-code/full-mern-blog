import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hostinger.com%2Ftutorials%2Fwp-content%2Fuploads%2Fsites%2F2%2F2021%2F09%2Fhow-to-write-a-blog-post.png&f=1&nofb=1&ipt=98136aa1509bce7f4e8fb646e5073348ecfbcb641d1a005d3ec040341adba486&ipo=images",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
