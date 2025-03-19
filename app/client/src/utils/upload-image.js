const uploadImage = async (file) => {
  // 1. Request an S3 upload URL from the backend
  const res = await fetch("/api/generate-upload-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ filename: file.name, contentType: file.type }),
  });

  if (!res.ok) throw new Error("Failed to get upload URL");

  const { uploadUrl, key } = await res.json();

  // 2. Upload file to S3 using the signed URL
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!uploadRes.ok) throw new Error("Upload to S3 failed");

  console.log("File uploaded:", key);
  const url = `https://${
    import.meta.env.VITE_AWS_S3_BUCKET_NAME
  }.s3.amazonaws.com/${key}`;
  return url;
};

// in another file, call the uploadImage function and pass in image file
export default uploadImage;
