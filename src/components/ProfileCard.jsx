import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

export default function ProfileCard({
  isSelected,
  onClick,
  profile,
  selectedUser,
}) {
  const [loading, setLoading] = React.useState(false);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

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
    <Card
      sx={{
        backgroundColor: isSelected ? "#f0f0f0" : "inherit",
      }}
      className="cursor-pointer w-full"
      onClick={onClick}
    >
      <CardHeader
        avatar={
          loading ? (
            <div className="animate-pulse">
              <Avatar
                sx={{
                  bgcolor: red[500],
                  width: "5rem",
                  height: "5rem",
                  md: { width: 12, height: 12 },
                }}
                className="hover:scale-125 transition-transform mx-auto pb-4 hover:outline hover:outline-blue-900"
              />
            </div>
          ) : (
            <Avatar
              sx={{
                bgcolor: red[500],
                width: "5rem",
                height: "5rem",
                md: { width: 12, height: 12 },
              }}
              aria-label="recipe"
              src={profile.avatar}
              className="hover:scale-125 transition-transform mx-auto"
            />
          )
        }
        subheaderTypographyProps={{ variant: "body2", color: "textSecondary" }}
        titleTypographyProps={{ variant: "h5", color: "textPrimary" }}
        title={`${profile?.profile?.firstName} ${profile?.profile?.lastName}`}
        subheader={truncateText(profile?.Bio, 40)}
      />
    </Card>
  );
}
