## This Project Create Setup with Monorepo using NPM and React-Leaflet for MAP
## Author : Oktavianus

# Project Structure

Frontend: React + Leaflet (in apps/frontend)

Backend: NestJS + WebSocket (in apps/backend)

Shared: Reusable TypeScript types and utilities (in packages/shared)

Build Tool: Turborepo

# Features
Real-time GPS tracking on map

WebSocket-based live updates

Shared code and types between backend & frontend

Support for 20 concurrent tracker simulations

"Last seen" status on map markers

## Backend Using Nestjs and socket io
using port 3001
Build
```sh
cd apps/backend
npm run build
```
Run
```sh
npm run start:dev
```

## Frontend using React Js and react-leaflet for Map

Run the following command:
using port 3000
```sh
cd apps/frontend
npm run dev
```

### Demo


https://github.com/user-attachments/assets/c63773f7-862c-4e65-8d1f-ac952c43f10a



