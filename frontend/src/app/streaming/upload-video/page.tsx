'use client'

import Drag_input_field from "@/components/image_compress/Drag_input_field"
import React, { useCallback, useState } from "react"

interface UploadProgress {
  [filename: string]: number
}

export default function Page() {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({})

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const url = "https://api.vidguard.to/v1/upload/server?key=jJYOdq8a5e9o"

    acceptedFiles.forEach(async (file) => {
      const formData = new FormData()
      formData.append("file", file)

      const xhr = new XMLHttpRequest()
      xhr.open('POST', url, true)

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100)
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: percentComplete
          }))
        }
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log("Upload successful!", file.name)
        } else {
          console.error("Upload failed!", file.name)
        }
      }

      xhr.onerror = () => {
        console.error("Upload error:", file.name)
      }

      xhr.send(formData)
    })
  }, [])

  return (
    <div className="container mx-auto p-4">
      <Drag_input_field onDrop={handleDrop} />
      {Object.entries(uploadProgress).map(([filename, progress]) => (
        <div key={filename} className="mt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{filename}</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}