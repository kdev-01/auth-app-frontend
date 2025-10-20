# 🏀 FDPEN Frontend

Frontend oficial de la **Federación Deportiva Provincial Estudiantil de Napo** - Sistema de gestión integral de torneos deportivos estudiantiles.

## 🛠 Tecnologías

### Core
- **⚛️ React 19.1.0** - Biblioteca de UI
- **⚡ Vite 6.3.5** - Build tool y dev server
- **🎨 TailwindCSS 4.1.7** - Framework CSS utility-first
- **📦 pnpm** - Gestor de paquetes

### Estado y Datos
- **🔄 @tanstack/react-query** - Manejo de estado del servidor
- **📝 React Hook Form** - Manejo de formularios
- **✅ Zod** - Validación de esquemas

### UI y UX
- **🎯 React Router DOM* - Enrutamiento
- **🔔 Sonner** - Notificaciones toast
- **🎨 React Icons** - Iconografía
- **📡 Axios* - Cliente HTTP

### Desarrollo
- **🔧 Biome** - Linter y formatter
- **⚡ SWC** - Compilador JavaScript/TypeScript

## 📁 Estructura del Proyecto

```
src/
├── assets/                     # Recursos estáticos
├── globals/                    # Elementos compartidos entre módulos
│   ├── components/             # Sistema de componentes global (Atomic Design)
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── index.ts            # barrel exports para imports limpios
│   ├── contexts/               # Contextos React
│   ├── hooks/                  # Hooks globales reutilizables
│   ├── services/               # apiClient
│   └── utils/                  # Helpers/utilidades
│
├── modules/                    # Módulos por dominio (Screaming Architecture)
│   ├── user/
│   │   ├── components/         # Components locales
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   ├── organisms/
│   │   │   └── templates/
│   │   ├── data/               # Mock data
│   │   ├── hooks/              # Hooks específicos del módulo
│   │   ├── services/           # API calls del módulo
│   │   ├── utils/              # Helpers locales
│   │   ├── pages/
└── main.jsx
```

### Organización y prácticas aplicadas

- **🏗️ Screaming Architecture:** Organización por funcionalidad
- **🧩 Atomic Design:** Componentes jerárquicos (atoms → molecules → organisms)
- **🔄 Single Responsibility:** Cada componente tiene una responsabilidad específica
- **🎯 Custom Hooks:** Lógica reutilizable encapsulada

## 🚀 Configuración Local

### Prerrequisitos

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd <Proyecto>
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Ejecutar en desarrollo**
```bash
pnpm run dev
```

## ⚙️ Configuración de VSCode

### Extensions Recomendadas

```json
{
  "recommendations": [
    "biomejs.biome",
    "bradlc.vscode-tailwindcss",
  ]
}
```

### Configuración (.vscode/settings.json)

```json
{
	"editor.defaultFormatter": "biomejs.biome",
	"editor.formatOnSave": true,
	"editor.codeActionsOnSave": {
		"source.organizeImports.biome": "always",
		"source.fixAll.biome": "always"
	},
	"[javascript]": {
		"editor.defaultFormatter": "biomejs.biome"
	}
}
```
