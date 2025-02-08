"use client"

import { useState } from "react"
import { Box, Typography, Container, IconButton, Tooltip, Snackbar } from "@mui/material"
import type { Message } from "../types/chat"
import PersonIcon from "@mui/icons-material/Person"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import ErrorIcon from "@mui/icons-material/Error"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import RefreshIcon from "@mui/icons-material/Refresh"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined"

interface ChatMessageProps {
  message: Message
  onRefresh?: () => void
}

export default function ChatMessage({ message, onRefresh }: ChatMessageProps) {
  const [liked, setLiked] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const isUser = message.role === "user"
  const isError = message.role === "error"

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content).then(() => {
      setCopySuccess(true)
    })
  }

  const handleLike = () => {
    setLiked(!liked)
  }

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: isError ? "#FFF4E5" : isUser ? "white" : "#f7f7f8",
        py: 3,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: isUser ? "flex-end" : "flex-start",
          }}
        >
          {!isUser && !isError && (
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "2px",
                backgroundColor: "#10a37f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                mr: 2,
                flexShrink: 0,
              }}
            >
              <SmartToyIcon fontSize="small" />
            </Box>
          )}
          {isError && (
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "2px",
                backgroundColor: "#FFA726",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                mr: 2,
                flexShrink: 0,
              }}
            >
              <ErrorIcon fontSize="small" />
            </Box>
          )}
          <Box sx={{ maxWidth: "75%" }}>
            <Typography
              sx={{
                whiteSpace: "pre-wrap",
                fontFamily: "'Söhne', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.5,
                textAlign: isUser ? "right" : "left",
                color: isError ? "#D84315" : "inherit",
              }}
            >
              {message.content}
            </Typography>
            {!isUser && !isError && (
              <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 1 }}>
                <Tooltip title="Copy">
                  <IconButton size="small" onClick={handleCopy}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Refresh">
                  <IconButton size="small" onClick={onRefresh}>
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={liked ? "Unlike" : "Like"}>
                  <IconButton size="small" onClick={handleLike}>
                    {liked ? <ThumbUpIcon fontSize="small" /> : <ThumbUpOutlinedIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
          {isUser && (
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "2px",
                backgroundColor: "#5436DA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                ml: 2,
                flexShrink: 0,
              }}
            >
              <PersonIcon fontSize="small" />
            </Box>
          )}
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        message="Copied to clipboard"
      />
    </Box>
  )
}

