import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect } from "react";

const ShowPage = ({ selectedUser }) => {
  const [loading, setLoading] = React.useState(false);

  const imageUrlToBlob = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const blob = await response.blob();
      console.log("Blob:", blob);
      setLoading(false);
      return blob;
    } catch (error) {
      console.error("Error fetching image:", error);
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    if (selectedUser) {
      imageUrlToBlob(selectedUser.avatar)
        .then((blob) => {
          console.log("Blob object:", blob);
        })
        .catch((error) => {
          console.error("Error converting URL to Blob:", error);
        });
    }
  }, [selectedUser]);

  return (
    <Card className="w-full mx-auto mt-8">
      <CardContent className="text-center">
        <div className="mx-auto m-4">
          {loading ? (
            <div className="animate-pulse">
              <Avatar
                sx={{
                  bgcolor: red[500],
                  width: "8rem",
                  height: "8rem",
                  md: { width: 12, height: 12 },
                }}
                aria-label="recipe"
                className="hover:scale-125 transition-transform mx-auto hover:outline hover:outline-blue-900"
              />
            </div>
          ) : (
            <Avatar
              sx={{
                bgcolor: red[500],
                width: "8rem",
                height: "8rem",
                md: { width: 12, height: 12 },
              }}
              aria-label="recipe"
              src={selectedUser.avatar}
              className="hover:scale-125 transition-transform mx-auto hover:outline hover:outline-blue-900"
            />
          )}
        </div>
        <Typography variant="h5" component="h2" className="mb-4">
          Name: {selectedUser.profile.firstName} {selectedUser.profile.lastName}
        </Typography>
        <Typography variant="body1" color="textSecondary" className="mb-2">
          Email: {selectedUser.profile.email}
        </Typography>
        <Typography variant="body1" color="textSecondary" className="mb-2">
          UserName: {selectedUser.profile.username}
        </Typography>
        <Typography variant="body1" color="textSecondary" className="mb-2">
          JobTitle: {selectedUser.jobTitle}
        </Typography>
        <Typography variant="body1" color="textSecondary" className="mb-2">
          Bio: {selectedUser.Bio}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ShowPage;
