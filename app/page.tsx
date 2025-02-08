"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Box, CircularProgress, Alert, Snackbar, AppBar, Toolbar, Typography, Button } from "@mui/material"
import { useChat } from "ai/react"
import ChatMessage from "./components/chat-message"
import ChatInput from "./components/chat-input"
import ApiKeyDialog from "./components/api-key-dialog"
import Sidebar from "./components/sidebar"
import type { Message } from "./types/chat"

export default function Home() {
  const [apiKey, setApiKey] = useState("")
  const [showApiDialog, setShowApiDialog] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const { messages, append, isLoading, reload, setMessages } = useChat({
    api: "/api/chat",
    body: { apiKey },
    enabled: !!apiKey,
    onError: (error) => {
      console.error("Chat error:", error)
      setErrorMessage(error.message || "An error occurred during the chat.")
      setSnackbarOpen(true)
    },
  })

  const handleSend = async (content: string) => {
    try {
      const response = await append({ content, role: "user" })
      console.log("API response:", response) // 检查返回值格式
    } catch (error) {
      console.error("Error sending message:", error)
      setErrorMessage("Failed to send message. Please try again.")
      setSnackbarOpen(true)
    }
  }
  

  const handleSaveApiKey = (key: string) => {
    setApiKey(key)
    setShowApiDialog(false)
  }

  const handleNewChat = () => {
    setErrorMessage("The function is in devlopment.")
    setSnackbarOpen(true)
  }

  const handleEditApiKey = () => {
    setShowApiDialog(true)
  }

  const handleRefreshMessage = async (index: number) => {
    if (index % 2 === 0 || index === messages.length - 1) {
      // Can't refresh user messages or the last message
      return
    }

    const previousMessages = messages.slice(0, index)
    const userMessage = messages[index - 1]

    try {
      setMessages(previousMessages)
      await append(userMessage)
    } catch (error) {
      console.error("Error refreshing message:", error)
      setErrorMessage("Failed to refresh message. Please try again.")
      setSnackbarOpen(true)
    }
  }

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setSnackbarOpen(false)
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar onNewChat={handleNewChat} onEditApiKey={handleEditApiKey} />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: '#fff' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          ref={chatContainerRef}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            pb: 16,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.map((message, i) => (
            <ChatMessage key={i} message={message as Message} onRefresh={() => handleRefreshMessage(i)} />
          ))}
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>
        <ChatInput onSend={handleSend} disabled={isLoading || !apiKey} />
      </Box>

      <ApiKeyDialog
        open={showApiDialog}
        onClose={() => setShowApiDialog(false)}
        onSave={handleSaveApiKey}
        currentApiKey={apiKey}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

