"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Player } from "@/types/player"
import { Upload, User, Trophy, BarChart3, X, Plus } from "lucide-react"
import { PhotoEditor } from "@/components/photo-editor"

interface AddPlayerFormProps {
  onClose: () => void
  onSubmit: (player: Omit<Player, "id">) => void
  editingPlayer?: Player | null
}

export function AddPlayerForm({ onClose, onSubmit, editingPlayer }: AddPlayerFormProps) {
  const [formData, setFormData] = useState({
    name: editingPlayer?.name || "",
    position: editingPlayer?.position || "",
    teams: editingPlayer?.teams || [],
    age: editingPlayer?.age?.toString() || "",
    height: editingPlayer?.height || "",
    weight: editingPlayer?.weight || "",
    nationality: editingPlayer?.nationality || "",
    photo: editingPlayer?.photo || "",
    stats: {
      points: editingPlayer?.stats.points?.toString() || "",
      kills: editingPlayer?.stats.kills?.toString() || "",
      blocks: editingPlayer?.stats.blocks?.toString() || "",
      aces: editingPlayer?.stats.aces?.toString() || "",
      digs: editingPlayer?.stats.digs?.toString() || "",
      assists: editingPlayer?.stats.assists?.toString() || "",
    },
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [photoPreview, setPhotoPreview] = useState<string>(editingPlayer?.photo || "")
  const [isEditingPhoto, setIsEditingPhoto] = useState(false)
  const [tempPhotoUrl, setTempPhotoUrl] = useState<string>("")
  const [newTeam, setNewTeam] = useState("")

  // Posiciones actualizadas
  const positions = ["Armador", "Opuesto", "Central", "Punta Receptora", "Libero"]

  // Equipos predefinidos eliminados - solo campo personalizado
  const commonTeams: string[] = []

  const countries = [
    "Argentina",
    "Brasil",
    "Chile",
    "Colombia",
    "México",
    "Perú",
    "Venezuela",
    "Ecuador",
    "Uruguay",
    "Paraguay",
  ]

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("stats.")) {
      const statField = field.replace("stats.", "")
      setFormData((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          [statField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleAddTeam = (teamName: string) => {
    if (teamName && !formData.teams.includes(teamName)) {
      setFormData((prev) => ({
        ...prev,
        teams: [...prev.teams, teamName],
      }))
    }
  }

  const handleRemoveTeam = (teamToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      teams: prev.teams.filter((team) => team !== teamToRemove),
    }))
  }

  const handleAddNewTeam = () => {
    if (newTeam.trim()) {
      handleAddTeam(newTeam.trim())
      setNewTeam("")
    }
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setTempPhotoUrl(result)
        setIsEditingPhoto(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhotoSave = (editedImageUrl: string) => {
    setPhotoPreview(editedImageUrl)
    setFormData((prev) => ({ ...prev, photo: editedImageUrl }))
    setIsEditingPhoto(false)
    setTempPhotoUrl("")
  }

  const handlePhotoCancelEdit = () => {
    setIsEditingPhoto(false)
    setTempPhotoUrl("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generar datos de rendimiento mock
    const mockPerformance = [
      {
        month: "Ene",
        points: Math.floor(Math.random() * 30) + 10,
        kills: Math.floor(Math.random() * 25) + 5,
        blocks: Math.floor(Math.random() * 10) + 1,
      },
      {
        month: "Feb",
        points: Math.floor(Math.random() * 30) + 10,
        kills: Math.floor(Math.random() * 25) + 5,
        blocks: Math.floor(Math.random() * 10) + 1,
      },
      {
        month: "Mar",
        points: Math.floor(Math.random() * 30) + 10,
        kills: Math.floor(Math.random() * 25) + 5,
        blocks: Math.floor(Math.random() * 10) + 1,
      },
      {
        month: "Abr",
        points: Math.floor(Math.random() * 30) + 10,
        kills: Math.floor(Math.random() * 25) + 5,
        blocks: Math.floor(Math.random() * 10) + 1,
      },
      {
        month: "May",
        points: Math.floor(Math.random() * 30) + 10,
        kills: Math.floor(Math.random() * 25) + 5,
        blocks: Math.floor(Math.random() * 10) + 1,
      },
      {
        month: "Jun",
        points: Math.floor(Math.random() * 30) + 10,
        kills: Math.floor(Math.random() * 25) + 5,
        blocks: Math.floor(Math.random() * 10) + 1,
      },
    ]

    const newPlayer: Omit<Player, "id"> = {
      name: formData.name,
      position: formData.position,
      teams: formData.teams,
      photo: formData.photo || "/placeholder.svg?height=300&width=250",
      age: Number.parseInt(formData.age),
      height: formData.height,
      weight: formData.weight,
      nationality: formData.nationality,
      stats: {
        points: Number.parseInt(formData.stats.points) || 0,
        kills: Number.parseInt(formData.stats.kills) || 0,
        blocks: Number.parseInt(formData.stats.blocks) || 0,
        aces: Number.parseInt(formData.stats.aces) || 0,
        digs: Number.parseInt(formData.stats.digs) || 0,
        assists: Number.parseInt(formData.stats.assists) || 0,
      },
      performance: editingPlayer?.performance || mockPerformance,
    }

    onSubmit(newPlayer)
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const isStep1Valid = formData.name && formData.position && formData.teams.length > 0
  const isStep2Valid = formData.age && formData.height && formData.weight && formData.nationality
  const isStep3Valid = true // Las estadísticas son opcionales

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {editingPlayer ? "Editar Atleta" : "Registrar Nueva Atleta"}
          </DialogTitle>
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-1 mx-2 ${currentStep > step ? "bg-blue-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Paso 1: Información Básica */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Información Básica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Ej: Ana García"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="position">Posición *</Label>
                    <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar posición" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((position) => (
                          <SelectItem key={position} value={position}>
                            {position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Sección de Equipos - Solo campo personalizado */}
                <div>
                  <Label>Equipos/Clubes *</Label>
                  <p className="text-sm text-gray-600 mb-2">La atleta puede pertenecer a múltiples equipos</p>

                  {/* Equipos seleccionados */}
                  {formData.teams.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.teams.map((team) => (
                        <Badge key={team} variant="secondary" className="flex items-center gap-1">
                          {team}
                          <button
                            type="button"
                            onClick={() => handleRemoveTeam(team)}
                            className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Solo agregar equipo personalizado */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Escribir nombre del equipo/club..."
                        value={newTeam}
                        onChange={(e) => setNewTeam(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddNewTeam()
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={handleAddNewTeam} disabled={!newTeam.trim()}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Ejemplos: "Club Deportivo Local", "Selección Regional", "Academia Volleyball"
                    </p>
                  </div>

                  {formData.teams.length === 0 && (
                    <p className="text-sm text-red-600 mt-1">Debe agregar al menos un equipo</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="photo">Foto de la Atleta</Label>
                  <div className="mt-2">
                    <input type="file" id="photo" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    <label
                      htmlFor="photo"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      {photoPreview ? (
                        <img
                          src={photoPreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click para subir</span> o arrastra la imagen
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG o JPEG</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Paso 2: Información Personal */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Edad *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      placeholder="Ej: 24"
                      min="15"
                      max="45"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="nationality">Nacionalidad *</Label>
                    <Select
                      value={formData.nationality}
                      onValueChange={(value) => handleInputChange("nationality", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar país" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height">Altura *</Label>
                    <Input
                      id="height"
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                      placeholder="Ej: 1.85m"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight">Peso *</Label>
                    <Input
                      id="weight"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      placeholder="Ej: 70kg"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Paso 3: Estadísticas */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Estadísticas de la Temporada
                </CardTitle>
                <p className="text-sm text-gray-600">Opcional - Puedes agregar las estadísticas más tarde</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="points">Puntos</Label>
                    <Input
                      id="points"
                      type="number"
                      value={formData.stats.points}
                      onChange={(e) => handleInputChange("stats.points", e.target.value)}
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="kills">Remates</Label>
                    <Input
                      id="kills"
                      type="number"
                      value={formData.stats.kills}
                      onChange={(e) => handleInputChange("stats.kills", e.target.value)}
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="blocks">Bloqueos</Label>
                    <Input
                      id="blocks"
                      type="number"
                      value={formData.stats.blocks}
                      onChange={(e) => handleInputChange("stats.blocks", e.target.value)}
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="aces">Saques</Label>
                    <Input
                      id="aces"
                      type="number"
                      value={formData.stats.aces}
                      onChange={(e) => handleInputChange("stats.aces", e.target.value)}
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="digs">Defensas</Label>
                    <Input
                      id="digs"
                      type="number"
                      value={formData.stats.digs}
                      onChange={(e) => handleInputChange("stats.digs", e.target.value)}
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="assists">Asistencias</Label>
                    <Input
                      id="assists"
                      type="number"
                      value={formData.stats.assists}
                      onChange={(e) => handleInputChange("stats.assists", e.target.value)}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botones de navegación */}
          <div className="flex justify-between pt-6">
            <div>
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Anterior
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={(currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid)}
                >
                  Siguiente
                </Button>
              ) : (
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingPlayer ? "Actualizar Atleta" : "Registrar Atleta"}
                </Button>
              )}
            </div>
          </div>
        </form>
        {/* Editor de fotos */}
        {isEditingPhoto && tempPhotoUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <PhotoEditor imageUrl={tempPhotoUrl} onSave={handlePhotoSave} onCancel={handlePhotoCancelEdit} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
