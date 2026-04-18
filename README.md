# Proyecto Iglesia Baustista Reformada Nido de Gracia 🙏

Sitio web moderno para una iglesia construido con Astro, presentando información sobre la comunidad, pastores, diáconos, predicas, creencias y un formulario de contacto.

## 📋 Características

- **Diseño Moderno y Responsivo**: Interfaz adaptable a todos los dispositivos
- **Secciones Principales**:
  - 🏠 Página de inicio con información general
  - 👨‍💼 Sección de Pastores
  - 🤝 Sección de Diáconos
  - ✝️ Creencias y confesión de fe
  - 📧 Formulario de contacto funcional
  - 🔒 Política de Privacidad (cumplimiento Ley 1581 de 2012 - Colombia)
- **Mapa de Ubicación**: Integración de mapa para localizar la iglesia
- **Sistema de Notificaciones**: Alertas visuales con SweetAlert2 y Toastify
- **Envío de Correos**: Funcionalidad de contacto mediante Resend (serverless function en Vercel)
- **Validación de Formularios**: Validación en cliente y servidor con Zod
- **Analítica de Rendimiento**: Integración con Vercel Speed Insights
- **Suite de Tests**: Pruebas automatizadas con Vitest y jsdom

## 🚀 Tecnologías Utilizadas

- [Astro 5.x](https://astro.build/) - Framework web moderno
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Resend](https://resend.com/) - Servicio de email (serverless en Vercel)
- [Zod](https://zod.dev/) - Validación de esquemas en cliente y servidor
- [SweetAlert2](https://sweetalert2.github.io/) - Alertas personalizadas
- [Toastify JS](https://apvarun.github.io/toastify-js/) - Notificaciones toast
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights) - Analítica de rendimiento
- [Vitest](https://vitest.dev/) - Framework de testing
- [@vercel/node](https://vercel.com/docs/functions/runtimes/node-js) - Funciones serverless

## 📁 Estructura del Proyecto

```
/
├── api/
│   └── sendEmail.ts          # Serverless function para Vercel (envío con Resend)
├── public/
│   ├── fonts/                # Fuentes del sitio
│   ├── img/                  # Imágenes públicas (iglesia.webp, logo.png, etc.)
│   ├── confesion.pdf         # Documento de confesión de fe
│   ├── predica.svg
│   └── sitemap.xml           # Mapa del sitio
├── src/
│   ├── assets/
│   │   ├── img/              # Imágenes optimizadas (avif, webp, jpg, png)
│   │   └── svg/              # Componentes SVG de Astro (íconos reutilizables)
│   │       ├── BibliaSVG.astro
│   │       ├── CerrarSVG.astro
│   │       ├── Correo.astro
│   │       ├── DownloadSVG.astro
│   │       ├── FlechaSVG.astro
│   │       ├── LogoSVG.astro
│   │       ├── ManosSVG.astro
│   │       ├── MenuSVG.astro
│   │       ├── OracionSVG.astro
│   │       └── Ubicacion.astro
│   ├── components/           # Componentes reutilizables
│   │   ├── Banner/
│   │   ├── Categorias/
│   │   ├── Description/      # Incluye sub-componente Elemento.astro
│   │   ├── LocationInfo/
│   │   ├── MapaIglesia.astro
│   │   └── Portada/
│   ├── layouts/              # Layouts de página (Layout global con SEO, Header, Footer)
│   ├── pages/                # Páginas del sitio
│   │   ├── index.astro       # Página principal
│   │   ├── pastores.astro
│   │   ├── diaconos.astro
│   │   ├── predicas.astro    # En desarrollo (contenido comentado)
│   │   ├── creencias.astro
│   │   ├── contacto.astro
│   │   ├── privacidad.astro  # Política de privacidad
│   │   └── 404.astro
│   ├── schema/
│   │   └── input.schema.ts   # Esquemas de validación Zod para el formulario
│   ├── sections/             # Secciones globales del sitio
│   │   ├── Header/
│   │   └── Footer/
│   ├── services/
│   │   └── email.service.ts  # Servicio cliente para llamar a la API de email
│   ├── styles/               # Estilos globales y por página
│   ├── tests/                # Suite de tests con Vitest
│   │   ├── requestSendEmail.test.ts
│   │   └── test-setup.ts
│   ├── utils/                # Utilidades y lógica del cliente
│   │   ├── constants.ts      # Datos de predicaciones
│   │   ├── input-validation.ts  # Validación de formulario en cliente
│   │   ├── mobile-menu.ts    # Toggle del menú móvil
│   │   ├── pagination.ts     # Sistema de paginación y modal YouTube
│   │   ├── requestSendEmail.ts  # Manejo del submit del formulario de contacto
│   │   └── select-nav.ts     # Resalta el enlace activo en navegación
│   └── types.d.ts            # Definiciones de tipos TypeScript
├── astro.config.mjs          # Configuración de Astro
├── vitest.config.ts          # Configuración de Vitest (jsdom)
├── package.json
└── tsconfig.json
```

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd Proyecto\ iglesia\ Astro
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
RESEND_API_KEY=tu_api_key_de_resend
EMAIL_FROM=remitente@tudominio.com
EMAIL_TO=destinatario@tudominio.com
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

## 📜 Comandos Disponibles

| Comando                | Acción                                      |
|:-----------------------|:--------------------------------------------|
| `npm run dev`          | Inicia el servidor de desarrollo           |
| `npm run build`        | Construye el sitio para producción         |
| `npm run preview`      | Vista previa del sitio construido          |
| `npm run astro`        | Ejecuta comandos CLI de Astro             |
| `npm run test`         | Ejecuta la suite de tests con Vitest      |
| `npm run test:coverage`| Ejecuta tests y genera reporte de cobertura|

## 🌐 Páginas del Sitio

- **/** - Página principal con información general
- **/pastores** - Información sobre los pastores
- **/diaconos** - Información sobre los diáconos
- **/creencias** - Creencias y doctrina de la iglesia
- **/contacto** - Formulario de contacto con consentimiento de datos
- **/privacidad** - Política de privacidad (Ley 1581 de 2012 - Colombia)
- **/predicas** - Sección de prédicas (en desarrollo)
- **/404** - Página de error personalizada

## 🏗️ Arquitectura del Formulario de Contacto

El formulario de contacto sigue un flujo de tres capas:

1. **Cliente** (`src/utils/requestSendEmail.ts`): maneja el submit, valida el consentimiento y llama al servicio.
2. **Servicio** (`src/services/email.service.ts`): realiza el `fetch POST` a la API y maneja errores HTTP (incluyendo rate limiting 429).
3. **API Serverless** (`api/sendEmail.ts`): valida el cuerpo con Zod y envía el correo mediante Resend a `pastores@nidodegracia.org`.

## 🧪 Tests

El proyecto incluye tests automatizados ubicados en `src/tests/`:

```bash
npm run test           # Ejecutar tests
npm run test:coverage  # Ver cobertura
```

Los tests usan **Vitest** con entorno **jsdom** para simular el DOM del navegador.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es para uso de la comunidad eclesiástica.

## 📞 Contacto

Para más información, visita la sección de contacto en el sitio web.

---

Desarrollado con ❤️ usando Astro
