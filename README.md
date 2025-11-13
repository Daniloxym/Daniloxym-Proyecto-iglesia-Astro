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
- **Mapa de Ubicación**: Integración de mapa para localizar la iglesia
- **Sistema de Notificaciones**: Alertas visuales con SweetAlert2 y Toastify
- **Envío de Correos**: Funcionalidad de contacto mediante Nodemailer y Resend

## 🚀 Tecnologías Utilizadas

- [Astro 5.5.4](https://astro.build/) - Framework web moderno
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Nodemailer](https://nodemailer.com/) - Envío de correos
- [Resend](https://resend.com/) - Servicio de email
- [SweetAlert2](https://sweetalert2.github.io/) - Alertas personalizadas
- [Toastify JS](https://apvarun.github.io/toastify-js/) - Notificaciones toast

## 📁 Estructura del Proyecto

```
/
├── api/
│   └── sendEmail.ts          # API para envío de correos
├── public/
│   ├── fonts/                # Fuentes del sitio
│   ├── img/                  # Imágenes
│   ├── confesion.pdf         # Documento de confesión de fe
│   └── sitemap.xml           # Mapa del sitio
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── Banner/
│   │   ├── Categorias/
│   │   ├── Description/
│   │   ├── LocationInfo/
│   │   ├── MapaIglesia.astro
│   │   └── Portada/
│   ├── layouts/              # Layouts de página
│   ├── pages/                # Páginas del sitio
│   │   ├── index.astro       # Página principal
│   │   ├── pastores.astro
│   │   ├── diaconos.astro
│   │   ├── predicas.astro
│   │   ├── creencias.astro
│   │   ├── contacto.astro
│   │   └── 404.astro
│   ├── sections/             # Secciones del sitio
│   ├── styles/               # Estilos globales
│   ├── utils/                # Utilidades
│   └── types.d.ts            # Definiciones de tipos
├── astro.config.mjs          # Configuración de Astro
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

3. **Configurar variables de entorno** (si es necesario)
Crea un archivo `.env` para las credenciales de email

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

## 📜 Comandos Disponibles

| Comando           | Acción                                      |
|:------------------|:--------------------------------------------|
| `npm run dev`     | Inicia el servidor de desarrollo           |
| `npm run build`   | Construye el sitio para producción         |
| `npm run preview` | Vista previa del sitio construido          |
| `npm run astro`   | Ejecuta comandos CLI de Astro             |

## 🌐 Páginas del Sitio

- **/** - Página principal con información general
- **/pastores** - Información sobre los pastores
- **/diaconos** - Información sobre los diáconos
- **/creencias** - Creencias y doctrina de la iglesia
- **/contacto** - Formulario de contacto
- **/404** - Página de error personalizada

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
