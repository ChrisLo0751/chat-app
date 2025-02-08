"use client"

import { Box, Button, Typography, Tooltip, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SettingsIcon from "@mui/icons-material/Settings"

interface SidebarProps {
  onNewChat: () => void
  onEditApiKey: () => void
}

export default function Sidebar({ onNewChat, onEditApiKey }: SidebarProps) {
  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        backgroundColor: "#f9f9f9",
        color: "black",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
     <Button
      variant="outlined"
      startIcon={<AddIcon />}
      onClick={onNewChat}
      sx={{
        color: "black",
        borderColor: "rgba(0,0,0,0.2)",
        "&:hover": {
          borderColor: "black",
          bgcolor: "rgba(0,0,0,0.05)",
        },
        mb: 2,
      }}
    >
      New chat
    </Button>


      {/* Chat history or other sidebar content can go here */}

      <Box
        sx={{
          mt: "auto",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          pt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          ChatGPT Clone
        </Typography>
        <Tooltip title="Edit API Key">
          <IconButton onClick={onEditApiKey} >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

