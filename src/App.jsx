import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">CDP Support Agent</h1>
        <ChatInterface />
      </div>
    </div>
  )
}

export default App