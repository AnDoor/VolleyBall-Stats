"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface NavbarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export function Navbar({ searchTerm, onSearchChange }: NavbarProps) {
  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm shadow-2xl border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">VolleyStats</h1>
              <p className="text-xs text-gray-400">Portal Deportivo</p>
            </div>
          </div>

          {/* Buscador */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar atletas, posiciones, equipos..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Navegación */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-indigo-400 font-medium transition-colors">
              Atletas
            </a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 font-medium transition-colors">
              Equipos
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
