import { Paper, Typography, Box } from "@mui/material"
import type { Message } from "@/types/chat"
import { SmartToy, Person } from "@mui/icons-material"

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        backgroundColor: isUser ? "grey.100" : "white",
        display: "flex",
        gap: 2,
        maxWidth: "800px",
        mx: "auto",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "4px",
          backgroundColor: isUser ? "primary.main" : "secondary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        {isUser ? <Person /> : <SmartToy />}
      </Box>
      <Typography
        sx={{
          whiteSpace: "pre-wrap",
          flex: 1,
          fontFamily: "monospace",
        }}
      >
        {message.content}
      </Typography>
    </Paper>
  )
}

