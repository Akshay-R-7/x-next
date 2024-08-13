import React from 'react'
import Input from '@/components/Input'
import Feed from '@/components/Feed'

export default function page() {
  return (
    <div className="max-w-xl mx-auto border-r border-l min-h-screen">
      <div className="py-3 px-3 sticky top-0 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
      </div>
      <Input />
      <Feed />
    </div>
  )
}
