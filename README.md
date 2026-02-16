# 📋 Todo App - React Native (Expo)

Application mobile de gestion de tâches développée avec React Native et Expo.

## 🚀 Lancement rapide

```bash
# Installer les dépendances
npm install

# Lancer l'application
npm start
```

Puis scanner le QR code avec **Expo Go** (iOS/Android) ou taper :
- `i` → Simulateur iOS
- `a` → Émulateur Android
- `w` → Navigateur web

## 🧪 Tests

```bash
npm test
```

## 🛠️ Stack technique

- **React Native** + **Expo** (SDK 54)
- **TypeScript**
- **React Query** (@tanstack/react-query) - Gestion d'état serveur
- **Jest** - Tests unitaires

## 📁 Architecture

```
src/
├── types/          # Types TypeScript
├── services/       # Appels API (fetch)
├── hooks/          # Hooks React Query (logique métier)
├── components/     # Composants UI réutilisables
├── screens/        # Écrans de l'application
└── __tests__/      # Tests unitaires
```

## ✨ Fonctionnalités

- ✅ Lister les todos
- ➕ Ajouter une todo
- ✏️ Éditer une todo (tap sur le texte)
- 🗑️ Supprimer une todo
- ☑️ Marquer comme terminée

## 🔄 Gestion de l'état

L'API [dummyjson.com/todos](https://dummyjson.com/todos) étant "fake" (ne persiste pas les données), l'application utilise des **optimistic updates** :

1. L'UI se met à jour **instantanément** (avant la réponse API)
2. L'état est géré **côté client** via le cache React Query
3. Les modifications sont visuellement immédiates pour une UX fluide

## 📝 API utilisée

| Action | Endpoint |
|--------|----------|
| Liste | `GET /todos` |
| Créer | `POST /todos/add` |
| Modifier | `PUT /todos/:id` |
| Supprimer | `DELETE /todos/:id` |
