import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  ArrowUpward,
} from "@mui/icons-material";

import logo from "../../assets/logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to top, #111827, #1f2937)",
        color: "#f3f4f6",
        padding: "60px 20px",
        textAlign: "center",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-around",
        alignItems: "center",
        gap: { xs: 6, md: 2 },
        minHeight: "300px",
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Logo Section */}
      <Box sx={{ transform: { xs: "scale(0.9)", md: "scale(1)" } }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          <Link
            href="/"
            sx={{ display: "block", transition: "transform 0.3s ease" }}
          >
            <img
              src={logo}
              alt=""
              style={{
                width: "250px",
                height: "70px",
                filter: "brightness(1.1)",
              }}
            />
          </Link>
        </Typography>
      </Box>

      {/* Quick Links Section */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            mb: 3,
            position: "relative",
            display: "inline-block",
            backgroundImage: "linear-gradient(to right, #60a5fa, #7c3aed)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: "100%",
              height: "2px",
              background: "linear-gradient(to right, #60a5fa, #7c3aed)",
              borderRadius: "2px",
            },
          }}
        >
          Quick Links
        </Typography>
        {["Home", "About", "For You", "Profile"].map((item) => (
          <Link
            key={item}
            href={
              item === "Profile" || item === "About" ? item.toLowerCase() : "/"
            }
            underline="none"
            color="inherit"
            sx={{
              display: "block",
              mb: 1.5,
              transition: "all 0.3s ease",
              opacity: 0.8,
              "&:hover": {
                transform: "translateX(5px)",
                opacity: 1,
                color: "#60a5fa",
                textShadow: "0 0 20px rgba(96, 165, 250, 0.5)",
              },
            }}
          >
            {item}
          </Link>
        ))}
      </Box>

      {/* Community Section */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            mb: 3,
            position: "relative",
            display: "inline-block",
            backgroundImage: "linear-gradient(to right, #60a5fa, #7c3aed)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: "100%",
              height: "2px",
              background: "linear-gradient(to right, #60a5fa, #7c3aed)",
              borderRadius: "2px",
            },
          }}
        >
          Community
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
            <IconButton
              key={index}
              color="inherit"
              sx={{
                backgroundColor: "rgba(255,255,255,0.05)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(96, 165, 250, 0.2)",
                  transform: "translateY(-3px)",
                  "& svg": {
                    color: "#60a5fa",
                  },
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            >
              <Icon sx={{ fontSize: 24 }} />
            </IconButton>
          ))}
        </Box>
      </Box>

      {/* Scroll to Top Button */}
      <IconButton
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "rgba(96, 165, 250, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(96, 165, 250, 0.2)",
          color: "#60a5fa",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(96, 165, 250, 0.2)",
            transform: "translateY(-3px)",
            boxShadow: "0 0 20px rgba(96, 165, 250, 0.3)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        <ArrowUpward />
      </IconButton>
    </Box>
  );
};

export default Footer;
