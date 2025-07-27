"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCw, RotateCcw, Move, ZoomIn, ZoomOut, Download } from "lucide-react"

interface PhotoEditorProps {
  imageUrl: string
  onSave: (editedImageUrl: string) => void
  onCancel: () => void
}

export function PhotoEditor({ imageUrl, onSave, onCancel }: PhotoEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)

  const drawImage = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !imageRef.current || !imageLoaded) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = imageRef.current

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Configurar transformaciones
    ctx.save()
    ctx.translate(canvas.width / 2 + position.x, canvas.height / 2 + position.y)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(scale, scale)

    // Dibujar imagen centrada
    ctx.drawImage(img, -img.width / 2, -img.height / 2)
    ctx.restore()
  }, [rotation, scale, position, imageLoaded])

  // Cargar imagen inicial
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      imageRef.current = img
      setImageLoaded(true)
    }
    img.src = imageUrl
  }, [imageUrl])

  // Redibujar cuando cambien los parámetros
  useEffect(() => {
    if (imageLoaded) {
      drawImage()
    }
  }, [drawImage, imageLoaded])

  const handleRotateLeft = () => {
    setRotation((prev) => prev - 90)
  }

  const handleRotateRight = () => {
    setRotation((prev) => prev + 90)
  }

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 3))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.1))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left - position.x,
        y: e.clientY - rect.top - position.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setPosition({
        x: e.clientX - rect.left - dragStart.x,
        y: e.clientY - rect.top - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleSave = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Crear un canvas final con las dimensiones deseadas
    const finalCanvas = document.createElement("canvas")
    finalCanvas.width = 300
    finalCanvas.height = 300
    const finalCtx = finalCanvas.getContext("2d")

    if (!finalCtx) return

    // Dibujar fondo blanco
    finalCtx.fillStyle = "#ffffff"
    finalCtx.fillRect(0, 0, 300, 300)

    // Dibujar la imagen editada escalada al tamaño final
    finalCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 300, 300)

    // Convertir a base64
    const editedImageUrl = finalCanvas.toDataURL("image/jpeg", 0.9)
    onSave(editedImageUrl)
  }

  const handleReset = () => {
    setRotation(0)
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Move className="w-5 h-5" />
          Editor de Foto
        </CardTitle>
        <p className="text-sm text-gray-600">Ajusta la posición, rotación y zoom de la imagen</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Canvas para editar */}
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="border-2 border-gray-300 rounded-lg cursor-move bg-gray-50"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        {/* Controles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button variant="outline" onClick={handleRotateLeft} className="flex items-center gap-2 bg-transparent">
            <RotateCcw className="w-4 h-4" />
            Rotar Izq
          </Button>
          <Button variant="outline" onClick={handleRotateRight} className="flex items-center gap-2 bg-transparent">
            <RotateCw className="w-4 h-4" />
            Rotar Der
          </Button>
          <Button variant="outline" onClick={handleZoomIn} className="flex items-center gap-2 bg-transparent">
            <ZoomIn className="w-4 h-4" />
            Acercar
          </Button>
          <Button variant="outline" onClick={handleZoomOut} className="flex items-center gap-2 bg-transparent">
            <ZoomOut className="w-4 h-4" />
            Alejar
          </Button>
        </div>

        {/* Información de transformaciones */}
        <div className="text-sm text-gray-600 text-center space-y-1">
          <p>
            Rotación: {rotation}° | Escala: {(scale * 100).toFixed(0)}%
          </p>
          <p className="text-xs">Arrastra la imagen para moverla</p>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleReset}>
            Restablecer
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
