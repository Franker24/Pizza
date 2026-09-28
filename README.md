# 🍕 La Pizzeatería — Pizzería Artesanal & Gourmet

<div align="center">
  <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=85&w=1200&auto=format&fit=crop" alt="La Pizzeatería Banner" width="100%" style="border-radius: 16px; margin-bottom: 20px;" />

  [![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Vercel Ready](https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
</div>

<br />

**La Pizzeatería** es una plataforma web gastronómica moderna, interactiva y cinematográfica para una pizzería artesanal líder en Buenos Aires. Combina la calidez del horno a leña tradicional con una experiencia digital de última generación: asistente de maridaje impulsado por Inteligencia Artificial (Google Gemini 2.0), sistema de carrito y checkout en tiempo real, gestor de reservas online, mapas interactivos de sucursales y un menú dinámico de alta fidelidad visual.

---

## ✨ Características Principales

- 🍕 **Carta Gourmet Interactiva**: Explorá pizzas artesanales elaboradas con masa madre de 72 horas de fermentación natural y horneadas a 450°C. Filtros por categoría, nivel de picante, alérgenos y personalización de ingredientes.
- 🤖 **Asistente de Maridaje con IA (Google Gemini 2.0)**: Recomendación inteligente de bebidas, empanadas o postres ideales según la pizza seleccionada.
- 📍 **Gestión de Sucursales**:
  - **Recoleta**: Paraná 1249 *(Salón & Take Away)* — Tel directos para pedidos.
  - **Barrio Norte**: Uriburu 1305 *(Salón & Take Away)*.
  - **Palermo**: *(Exclusivo Delivery & Take Away)*.
  - *Sección de Contacto & Sucursales con mapas interactivos de Google Maps y GPS directo.*
- 🛒 **Carrito & Checkout Digital**: Selección de modalidad (Delivery / Take Away / Consumo en Salón), elección de sucursal, método de pago (Mercado Pago, Efectivo, Tarjetas, MODO/QR, Transferencia) y dirección con validación en vivo.
- ⏱️ **Rastreador de Pedidos en Tiempo Real**: Modal dinámico para seguir el estado de tu pedido (*Recibido ➔ En Horno ➔ En Camino ➔ Entregado*).
- 📅 **Reservas de Mesa Online**: Sistema interactivo para reservar mesa seleccionando horario, cantidad de comensales y sucursal.
- 🎨 **Diseño Ultra-Premium & Dark Mode**: Estética cuidada con micro-animaciones en GSAP / Motion, botones Uiverse.io adaptados y diseño responsive 100% optimizado para móviles.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend Core**: React 19, TypeScript, Vite 8
- **Estilos & Diseño**: Tailwind CSS v4, Vanilla CSS custom, Lucide Icons, React Icons (FA6 & Simple Icons)
- **Animaciones & Micro-Interacciones**: Framer Motion / Motion, GSAP, Tailwind Animate
- **Inteligencia Artificial**: `@google/genai` (API de Gemini 2.0)
- **Enrutamiento & Estado**: React Router DOM v7
- **Despliegue & Hosting**: Preparado para Vercel & GitHub Pages / Actions

---

## 📁 Estructura del Proyecto

```text
pizzeria/
├── public/                  # Assets públicos e íconos de marca
├── src/
│   ├── components/          # Componentes modulares de UI
│   │   ├── BestSellersSection.tsx       # Sección de pizzas más vendidas
│   │   ├── CartDrawer.tsx               # Carrito lateral interactivo
│   │   ├── CheckoutModal.tsx            # Modal de finalización de compra
│   │   ├── FloatingWhatsApp.tsx         # Botón flotante de contacto WhatsApp
│   │   ├── Footer.tsx                   # Pie de página moderno con sucursales y medios de pago
│   │   ├── Hero.tsx                     # Banner principal dinámico
│   │   ├── Navbar.tsx                   # Navegación con contador de carrito y acceso rápido
│   │   ├── OrderTrackerModal.tsx        # Seguimiento en tiempo real
│   │   ├── PairingAssistantModal.tsx    # Asistente IA Gemini
│   │   ├── PizzaScrollExperience.tsx    # Galería interactiva 360° / scroll
│   │   ├── TableReservationModal.tsx    # Modal de reservas de mesa
│   │   └── ...
│   ├── data/
│   │   └── menuData.ts      # Catálogo completo de menú, precios e ingredientes
│   ├── pages/
│   │   ├── HomePage.tsx     # Página principal de inicio
│   │   ├── MenuPage.tsx     # Carta interactiva
│   │   └── ContactPage.tsx  # Sucursales, formulario y mapas Google Maps
│   ├── types.ts             # Interfaces TypeScript globales
│   ├── index.css            # Estilos globales y utilidades custom
│   ├── App.tsx              # Configuración de rutas y modales globales
│   └── main.tsx             # Punto de entrada de la aplicación
├── .env.example             # Ejemplo de variables de entorno
├── vercel.json              # Configuración de reescritura de rutas para Vercel SPA
├── package.json             # Dependencias y scripts del proyecto
└── README.md                # Documentación del proyecto
```

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
- **Node.js** 18.0 o superior
- **pnpm** (o npm / yarn / bun)

### Pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Franker24/Pizza.git
   cd pizzeria
   ```

2. **Instalar dependencias**:
   ```bash
   pnpm install
   ```

3. **Configurar Variables de Entorno**:
   Copiá el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   *Agregá tu clave de API de Google Gemini en `VITE_GEMINI_API_KEY` (opcional si deseas habilitar la IA de maridaje).*

4. **Iniciar el servidor de desarrollo**:
   ```bash
   pnpm dev
   ```
   La aplicación se abrirá en `http://localhost:3000`.
