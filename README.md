# 🏐 VolleyStats - Portal Deportivo de Volleyball

Una aplicación web completa para la gestión y análisis de equipos de volleyball femenino, con inteligencia artificial integrada para entrenamiento personalizado.

## 🌟 Características Principales

### 📊 Gestión de Atletas
- **Registro completo** de jugadoras con información personal y estadísticas
- **Editor de fotos** integrado con herramientas de rotación, zoom y recorte
- **Estadísticas detalladas** por jugadora con métricas avanzadas
- **Análisis de rendimiento** con gráficas interactivas
- **Gestión por posiciones** (Armadora, Opuesta, Central, Receptora, Libero)

### 🤖 Entrenador Virtual con IA
- **Chatbot especializado** en volleyball powered by Google Gemini
- **Biblioteca de ejercicios visuales** con más de 8 ejercicios detallados
- **Recomendaciones personalizadas** según posición y nivel
- **Planes de entrenamiento** adaptados a cada jugadora
- **Corrección técnica** y consejos tácticos en tiempo real

### 📈 Dashboard del Equipo
- **Métricas generales** del equipo con visualizaciones interactivas
- **Comparación de rendimiento** entre jugadoras
- **Análisis por posiciones** con estadísticas específicas
- **Rankings internos** (top anotadoras, rematadoras, bloqueadoras)
- **Análisis FODA** automático del equipo


## 🚀 Tecnologías Utilizadas

### Frontend
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Estilos utilitarios y diseño responsivo
- **shadcn/ui** - Componentes UI modernos y accesibles
- **Recharts** - Visualizaciones de datos interactivas
- **Lucide React** - Iconografía consistente

### Backend & IA
- **Vercel AI SDK** - Integración con modelos de IA
- **Google Gemini** - Modelo de lenguaje avanzado

### Características Técnicas
- **Responsive Design** - Optimizado para desktop, tablet y móvil
- **Server Components** - Renderizado optimizado del lado del servidor
- **Real-time Streaming** - Respuestas de IA en tiempo real
- **Type Safety** - Tipado completo en TypeScript
- **Modern UI/UX** - Interfaz intuitiva y profesional

## 📋 Requisitos Previos

- **Node.js** 18+ 
- **npm** o **pnpm**

## ⚙️ Instalación

### 1. Clonar el Repositorio
\`\`\`bash
git clone <url-del-repositorio>
cd volleyball-frontend
\`\`\`

### 2. Instalar Dependencias
\`\`\`bash
npm install
# o
pnpm install
\`\`\`

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

\`\`\`env
# Google Gemini API Key
GOOGLE_GENERATIVE_AI_API_KEY=tu_api_key_aqui
\`\`\`

#### Obtener API Key de Google Gemini:
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Get API Key"
4. Crea un nuevo proyecto o selecciona uno existente
5. Copia tu API key (comienza con "AIza...")
6. Pégala en el archivo `.env.local`

### 4. Ejecutar la Aplicación
\`\`\`bash
npm run dev
# o
pnpm dev
\`\`\`

La aplicación estará disponible en `http://localhost:3000`

## 🎯 Guía de Uso

### Gestión de Atletas

#### Agregar Nueva Atleta
1. Haz clic en "Agregar Atleta"
2. Completa el formulario en 3 pasos:
   - **Información Básica**: Nombre, posición, equipo, foto
   - **Información Personal**: Edad, altura, peso, nacionalidad
   - **Estadísticas**: Puntos, remates, bloqueos, etc. (opcional)
3. Usa el editor de fotos para ajustar la imagen
4. Guarda la información

#### Editar Atleta Existente
- **Editar perfil**: Botón "Editar" en la tarjeta de la jugadora
- **Editar estadísticas**: Botón "Stats" para métricas detalladas
- **Ver detalles**: Clic en la tarjeta para modal completo

### Dashboard del Equipo

#### Métricas Disponibles
- **Estadísticas Generales**: Jugadoras, puntos totales, promedios
- **Distribución por Posiciones**: Gráfica circular interactiva
- **Comparación de Rendimiento**: Gráficas de barras y áreas
- **Rankings**: Top 5 en diferentes categorías
- **Análisis FODA**: Fortalezas y áreas de mejora automáticas






