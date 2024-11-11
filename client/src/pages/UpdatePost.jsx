import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePost() {
  const [file, setfile] = useState(null);
  const [formData, setformData] = useState({});
  const [publishError, setpublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const { postId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setpublishError(data.message);
          return;
        }
        if (res.ok) {
          setpublishError(null);
          setformData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser.user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setpublishError(data.message);
        return;
      }

      if (res.ok) {
        setpublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setpublishError("Something went wrong ", error);
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update a post</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => {
              setformData({
                ...formData,
                title: e.target.value,
              });
            }}
            value={formData.title}
          />
          <Select
            onChange={(e) => {
              setformData({
                ...formData,
                category: e.target.value,
              });
            }}
            value={formData.category}
          >
            <option value={"uncategorized"}>Select a category</option>
            <option value={"javascript"}>JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value={"nextjs"}>Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setfile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
          >
            upload image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          value={formData.content}
          placeholder="Write something...."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setformData({
              ...formData,
              content: value,
            });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
