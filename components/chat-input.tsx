"use client"

import { useState, type FormEvent } from "react"
import { Paper, TextField, IconButton, Box } from "@mui/material"
import { Send } from "@mui/icons-material"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSend(input)
      setInput("")
    }
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        backgroundColor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Box sx={{ maxWidth: "800px", mx: "auto", display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          disabled={disabled}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
        <IconButton type="submit" color="primary" disabled={!input.trim() || disabled} sx={{ alignSelf: "flex-end" }}>
          <Send />
        </IconButton>
      </Box>
    </Paper>
  )
}

