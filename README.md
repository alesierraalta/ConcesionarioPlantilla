# 🚗 AutoPremium - Landing Page de Concesionario

Una landing page moderna y responsiva para un concesionario de vehículos con sistema de sorteos diarios integrado.

## ✨ Características

### 🎯 Funcionalidades Principales
- **Sorteos Diarios**: Sistema automatizado de rifas con premios variados
- **Transmisión en Vivo**: Los sorteos se transmiten por Instagram para total transparencia
- **Registro de Usuarios**: Sistema completo de registro y participación
- **Contador Regresivo**: Tiempo real hasta el próximo sorteo
- **Feed de Ganadores**: Muestra en tiempo real los últimos ganadores

### 🎨 Diseño y UX
- **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- **Modo Claro/Oscuro**: Toggle completo entre temas con transiciones suaves
- **Animaciones Fluidas**: Utilizando Framer Motion para micro-interacciones
- **Glassmorphismo**: Efectos modernos de vidrio y blur
- **Redes Sociales**: Integración prominente con Instagram, Facebook, YouTube

### 🛠 Tecnologías Utilizadas
- **Next.js 14**: Framework de React con App Router
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Framework de CSS utility-first
- **Framer Motion**: Librería de animaciones para React
- **Lucide Icons**: Iconografía moderna y consistente

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm, yarn, pnpm o bun

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd LANDING-CONSECIONARIO
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. **Abrir en el navegador**
Navega a [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   ├── register/      # Registro de usuarios
│   │   ├── raffle/        # Gestión de sorteos
│   │   └── stats/         # Estadísticas
│   ├── globals.css        # Estilos globales y tema oscuro
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes base reutilizables
│   ├── Hero.tsx          # Sección hero principal
│   ├── Header.tsx        # Navegación principal
│   ├── CountdownTimer.tsx # Contador regresivo
│   ├── WinnersFeed.tsx   # Feed de ganadores
│   ├── RegistrationModal.tsx # Modal de registro
│   ├── SocialMediaSection.tsx # Sección de redes sociales
│   └── ThemeToggle.tsx   # Toggle de tema claro/oscuro
└── lib/
    ├── database.ts       # Sistema de base de datos simulado
    └── utils.ts          # Utilidades y helpers
```

## 🎮 Funcionalidades Implementadas

### Sistema de Sorteos
- ✅ Creación automática de sorteos diarios
- ✅ Gestión de participantes y entradas
- ✅ API para sorteo de ganadores
- ✅ Historial de ganadores

### Registro de Usuarios
- ✅ Validación de formularios
- ✅ Almacenamiento local de datos
- ✅ Participación automática en sorteo del día

### Interfaz de Usuario
- ✅ Diseño responsivo completo
- ✅ Animaciones y micro-interacciones
- ✅ Modo oscuro/claro con persistencia
- ✅ Componentes reutilizables

### Integración Social
- ✅ Enlaces a redes sociales
- ✅ Énfasis en transmisiones de Instagram
- ✅ Botones de compartir y seguir

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
npm run type-check   # Verificación de tipos TypeScript
```

## 🎨 Personalización

### Colores del Tema
Los colores principales se pueden modificar en `tailwind.config.ts`:
- `primary`: Azul principal del brand
- `orange`: Naranja para CTAs y elementos de acción
- `green`: Verde para elementos de éxito

### Configuración de Sorteos
En `src/lib/database.ts` puedes modificar:
- Premios disponibles
- Horarios de sorteos
- Límites de participantes

## 📱 Responsive Design

- **Mobile First**: Diseñado primero para móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Componentes Adaptativos**: Todos los componentes se ajustan automáticamente

## 🌙 Modo Oscuro

- **Toggle Manual**: Botón flotante para cambiar tema
- **Persistencia**: Guarda la preferencia en localStorage
- **Detección Automática**: Respeta la preferencia del sistema
- **Transiciones Suaves**: Cambios animados entre temas

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm run build
# Conectar con Vercel CLI o GitHub
```

### Otros Proveedores
```bash
npm run build
npm run start
```

## 🤝 Contribución

1. Fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

**AutoPremium** - [@autopremium](https://instagram.com/autopremium)

Enlace del Proyecto: [https://github.com/tu-usuario/autopremium-landing](https://github.com/tu-usuario/autopremium-landing)

---

⭐ ¡No olvides dar una estrella al proyecto si te ha sido útil!