# 🗳️ Sistema de Votos Electrónicos - Frontend

Frontend del proyecto **Sistema de Votos Electrónicos**, desarrollado con **React**. Está enfocado para la Universidad Mayor de San Andrés (UMSA), permitiendo a estudiantes y docentes autenticarse y emitir.
---

## 🛠️ Tecnologías y librerías utilizadas

- **React**
- **Axios** – Para la comunicación HTTP con el backend.
- **React Router DOM** – Para el manejo de rutas y navegación.
- **Librería de dashboards en React** – Para visualizar estadísticas como la cantidad de votos por partido y el ranking de carreras.
- **Bootstrap / CSS personalizado** – Para estilos y diseño responsivo (si aplica).

---


## ⚙️ Funcionalidades implementadas

- Autenticación para estudiantes, docentes y administradores mediante su correo institucional (@umsa.bo).
- Pantalla de login y validación de usuarios.
- Votación por partidos con interfaz sencilla y clara.
- Visualización de dashboard:
  - Gráfica con cantidad de votos por partido.
  - Ranking de carreras con más votos (Top 3).
- Gestión de usuarios y entidades (si está habilitado el panel administrador):
  - Estudiantes  
  - Docentes  
  - Partidos  
  - Candidatos  
  - Votos

---

## 🔗 Conexión con el backend

La conexión al backend se realiza mediante **Axios**, configurado en el archivo `api.js`. Todos los endpoints del backend son consumidos desde los componentes y páginas correspondientes utilizando esta configuración.

## IMAGENES

### VISTA DESDE ADMINISTRADOR
<img width="1280" alt="Captura de Pantalla 2025-07-07 a la(s) 17 45 43" src="https://github.com/user-attachments/assets/e4625a01-def8-453c-b160-f644ed1997cf" />
<img width="1280" alt="Captura de Pantalla 2025-07-07 a la(s) 17 46 03" src="https://github.com/user-attachments/assets/02f265e9-d44b-496c-bbd1-0e24b615dc61" />

<img width="1278" alt="Captura de Pantalla 2025-07-07 a la(s) 17 42 42" src="https://github.com/user-attachments/assets/7178af8d-7a66-487b-a54a-5b24aec8fb90" />
<img width="1280" alt="Captura de Pantalla 2025-07-07 a la(s) 17 43 22" src="https://github.com/user-attachments/assets/97fc9b2c-37e7-4697-b751-8ee969580449" />
<img width="1280" alt="Captura de Pantalla 2025-07-07 a la(s) 17 43 45" src="https://github.com/user-attachments/assets/c82363be-eb67-41ed-b9a2-ecd5273e75fd" />
<img width="1280" alt="Captura de Pantalla 2025-07-07 a la(s) 17 45 08" src="https://github.com/user-attachments/assets/665f2a9a-41a7-4c8e-9dfe-5889fb94ff2d" />
<img width="1280" alt="Captura de Pantalla 2025-07-07 a la(s) 17 46 24" src="https://github.com/user-attachments/assets/c42f0ced-1db8-473a-969e-66fd17d2b3e0" />

### VISTA DESDE ESTUDIANTE O DOCENTE

<img width="1280" alt="Captura de Pantalla 2025-07-07 a la(s) 17 48 31" src="https://github.com/user-attachments/assets/98b33e06-bc3d-484a-b1ba-d4676bca31ac" />
<img width="1280" alt="Captura de Pantalla 2025-07-07 a la(s) 17 48 52" src="https://github.com/user-attachments/assets/25111f73-d25f-4af0-8679-968617596fba" />
<img width="1280" alt="Captura de Pantalla 2025-07-07 a la(s) 17 49 45" src="https://github.com/user-attachments/assets/3c17a021-c97d-47f9-9b06-ccb92271bf30" />
