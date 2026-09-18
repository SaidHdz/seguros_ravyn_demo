# Ravyn Seguros Demo

Landing Page interactiva basada en el patron de diseno Bento Grid, orientada a la captacion de clientes potenciales (leads) para agentes de seguros en Estados Unidos.

## 1. Descripcion General

Ravyn Seguros Demo es un prototipo comercial "llave en mano" disenado para demostrar alta conversion, tiempos de carga minimos y captura automatizada de prospectos mediante webhooks. El diseno visual balancea autoridad y confianza institucional con contrastes entre tonalidades oscuras (#0F172A) y claras (#F8FAFC).

## 2. Stack Tecnologico

- **Core Framework:** Astro 5 (Static Site Generation / Islands Architecture)
- **Estilos:** Tailwind CSS (Tokens corporativos y Bento Grid)
- **Interactividad:** React (Formulario de captura y estados asincronos)
- **Iconografia:** Lucide Icons (SVG vectoriales consistentes, cero emojis)
- **Integracion:** Webhook HTTP (compatible con n8n / Make / Zapier)
- **Despliegue:** Vercel

## 3. Requisitos Previos

- Node.js version 18.x o superior (probado en v24.x)
- npm version 9.x o superior

## 4. Instalacion y Ejecucion Local

1. Clonar o posicionarse en el directorio del proyecto:
   ```bash
   cd seguros_ravyn
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno (opcional para integracion n8n):
   Crear un archivo `.env` basado en `.env.example`:
   ```bash
   PUBLIC_N8N_WEBHOOK_URL=https://tu-instancia-n8n.com/webhook/seguros-lead
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Compilar para produccion:
   ```bash
   npm run build
   ```

6. Previsualizar compilacion:
   ```bash
   npm run preview
   ```
