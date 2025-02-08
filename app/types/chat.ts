export interface Message {
  role: "user" | "assistant"
  content: string
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  error?: string
}

export interface ApiKeyDialogProps {
  open: boolean
  onClose: () => void
  onSave: (apiKey: string) => void
}

