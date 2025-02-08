"use client"

import { useState, type FormEvent, useRef, useEffect } from "react"
import { Paper, TextField, IconButton, Box } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textFieldRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.style.height = "auto"
      textFieldRef.current.style.height = `${textFieldRef.current.scrollHeight}px`
    }
  }, [textFieldRef]) // Removed unnecessary dependency: input

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
        left: 260,
        right: 0,
        p: 2,
      }}
    >
      <Box sx={{ maxWidth: "58rem", mx: "auto", display: "flex", alignItems: "flex-end", position: "relative", border: "none" }}>
        <TextField
          fullWidth
          multiline
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Send a message..."
          disabled={disabled}
          inputRef={textFieldRef}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 1.5,
              paddingRight: "4.5rem",
              backgroundColor: "white",
              minHeight: "6rem",
              "& fieldset": {
                borderColor: "#e5e5e5",
              },
              "&:hover fieldset": {
                borderColor: "#d1d1d1",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#f3f3f3",
              },
            },
          }}
        />
        <IconButton
          type="submit"
          disabled={!input.trim() || disabled}
          sx={{
            ml: 1,
            backgroundColor: "#000",
            color: "white",
            position: "absolute",
            right: "1rem",
            bottom: "1rem",
            "&:hover": {
              backgroundColor: "#eee",
            },
            "&.Mui-disabled": {
              backgroundColor: "#e5e5e5",
              color: "#a0a0a0",
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}

