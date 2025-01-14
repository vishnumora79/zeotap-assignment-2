import { useState } from 'react'
import { searchDocumentation } from '../utils/search'

function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      type: 'user',
      content: input
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await searchDocumentation(input)
      const botMessage = {
        type: 'bot',
        content: response
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        content: "I'm sorry, I couldn't process your request. Please try again."
      }
      setMessages(prev => [...prev, errorMessage])
    }

    setIsLoading(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.type === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <div className="inline-block p-3 rounded-lg bg-gray-200">
              Searching...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about CDPs..."
          className="flex-1 p-2 border border-gray-300 rounded"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          Ask
        </button>
      </form>
    </div>
  )
}

export default ChatInterface