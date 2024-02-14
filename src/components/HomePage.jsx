import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import ShowPage from "./ShowPage";

const API_URL = "https://602e7c2c4410730017c50b9d.mockapi.io/users";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  // Function to convert image URL to Blob
  const imageUrlToBlob = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      console.log("Blob:", blob);
      return blob;
    } catch (error) {
      console.error("Error fetching image:", error);
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
    <div>
      <Grid container className="justify-center">
        <Grid
          item
          xs={12}
          sm={4}
          className="h-[100vh] overflow-y-scroll scrollbar-hide"
        >
          <div className="flex justify-center align-middle lg:text-2xl lg:p-3 sticky">
            <h1>
              <b>User List</b>
            </h1>
          </div>
          {loading ? (
            <Grid
              item
              className="flex items-center justify-center h-full text-xl font-bold"
            >
              <CircularProgress />
            </Grid>
          ) : error ? (
            <Typography color="error">No Data to Show : {error} </Typography>
          ) : (
            <Grid container spacing={2} className="w-[100%]">
              {users.map((user) => (
                <Grid item className="w-full " key={user.id}>
                  <ProfileCard
                    profile={user}
                    isSelected={selectedUser && selectedUser.id === user.id}
                    onClick={() => handleClick(user)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
        <Grid xs={12} md={8} sm={8} item className="border border-5 p-3">
          <div className="flex justify-center align-middle lg:text-2xl lg:p-3 sticky">
            <h1>
              <b>User Details</b>
            </h1>
          </div>
          {loading ? (
            <Grid
              item
              className="flex items-center justify-center h-full text-xl font-bold"
            >
              <CircularProgress />
            </Grid>
          ) : error ? (
            <Typography color="error">No Data to Show : {error}</Typography>
          ) : selectedUser ? (
            <ShowPage selectedUser={selectedUser} />
          ) : (
            <Typography>Select a user to view details</Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
