# Iglesia Bautista Reformada Nido de Gracia 🙏

Sitio web oficial de la Iglesia Bautista Reformada Nido de Gracia, desarrollado con Astro. El proyecto presenta la visión de la congregación, su liderazgo, su base doctrinal, información de contacto y una política de privacidad para el formulario del sitio.

## ✨ Funcionalidades actuales

- Página de inicio con hero, descripción de la congregación, liderazgo, ubicación y sección del seminario.
- Página de liderazgo con información ampliada de pastores y diáconos.
- Página doctrinal con acceso a la Confesión Bautista de Londres de 1689 en PDF.
- Formulario de contacto con validación en cliente y servidor.
- Política de privacidad enlazada desde el formulario de contacto.
- Envío de correos mediante Resend a través de una función serverless.
- Metadatos SEO base y Vercel Speed Insights integrados en el layout principal.
- Animaciones de aparición al hacer scroll y slider principal con Swiper.
- Pruebas unitarias para la lógica de envío del formulario.

## 🧰 Tecnologías utilizadas

- [Astro 7](https://astro.build/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [Zod](https://zod.dev/)
- [Resend](https://resend.com/)
- [Swiper](https://swiperjs.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights)

## 📁 Estructura principal

```text
/
├── api/                      # Funciones serverless
│   └── sendEmail.ts          # Endpoint para procesar el formulario de contacto
├── public/                   # Archivos públicos estáticos
├── src/
│   ├── assets/               # Imágenes y SVGs del sitio
│   ├── components/           # Componentes reutilizables puntuales
│   ├── layouts/              # Layouts globales
│   ├── pages/                # Rutas del sitio
│   ├── schema/               # Esquemas de validación
│   ├── sections/             # Secciones de la interfaz
│   ├── services/             # Servicios de consumo/API
│   ├── styles/               # Estilos globales
│   ├── tests/                # Pruebas unitarias
│   └── utils/                # Utilidades del frontend
├── astro.config.mjs          # Configuración de Astro
├── package.json              # Scripts y dependencias
├── tsconfig.json             # Configuración de TypeScript
└── vitest.config.ts          # Configuración de pruebas
```

## 🛠️ Instalación

1. Clona el repositorio.
2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` con las variables necesarias para el formulario:

```env
RESEND_API_KEY=tu_api_key
EMAIL_FROM=remitente@dominio.com
EMAIL_TO=destinatario@dominio.com
```

4. Inicia el entorno de desarrollo:

```bash
npm run dev
```

## 📜 Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la build de producción |
| `npm run preview` | Previsualiza la build local |
| `npm run test` | Ejecuta las pruebas con Vitest |
| `npm run test:coverage` | Ejecuta las pruebas con cobertura |
| `npm run astro` | Ejecuta comandos de la CLI de Astro |

## 🌐 Rutas principales

- `/` — Inicio
- `/liderazgo` — Pastores y diáconos
- `/creencias` — Base doctrinal y descarga del PDF
- `/contacto` — Formulario de contacto
- `/privacidad` — Política de privacidad
- `/404` — Página de error personalizada

## ✅ Pruebas

Para ejecutar las pruebas unitarias del formulario de contacto:

```bash
npm run test
```

## 🚀 Despliegue

El proyecto está preparado para funcionar como sitio Astro con una función serverless en `api/sendEmail.ts`, por lo que debe desplegarse en una plataforma compatible con este flujo.

## 📄 Licencia

Proyecto desarrollado para la comunidad de la Iglesia Bautista Reformada Nido de Gracia.
