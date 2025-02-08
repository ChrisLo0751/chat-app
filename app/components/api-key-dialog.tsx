"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert } from "@mui/material"

interface ApiKeyDialogProps {
  open: boolean
  onClose: () => void
  onSave: (apiKey: string) => void
  currentApiKey: string
}

export default function ApiKeyDialog({ open, onClose, onSave, currentApiKey }: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = useState(currentApiKey)
  const [error, setError] = useState("")

  useEffect(() => {
    setApiKey(currentApiKey)
  }, [currentApiKey])

  const handleSave = () => {
    if (!apiKey.trim()) {
      setError("API Key is required")
      return
    }
    onSave(apiKey)
    onClose()
  }

  const handleClear = () => {
    setApiKey("")
    onSave("")
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{currentApiKey ? "Edit API Key" : "Enter OpenAI API Key"}</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          autoFocus
          margin="dense"
          label="API Key"
          type="password"
          fullWidth
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleClear} color="secondary">
          Clear
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

