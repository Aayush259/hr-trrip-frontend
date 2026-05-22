# HR Trrip Frontend

Frontend for a travel document extraction app. Users can authenticate, upload an image or PDF travel document, receive extracted itinerary data over Socket.IO, revisit previous itineraries, and share a public itinerary link.

## Features

- Email/password login and signup screens with form validation and API error feedback
- Protected home route and public-only auth routes
- Persisted authentication state with access-token refresh handling
- Authenticated Socket.IO connection for travel document processing
- Image and PDF upload UI with a strict 2MB client-side limit
- Real-time booking status, completion, and rejection states
- Scrollable itinerary history in the sidebar
- Booking detail loading from route search params
- Public shared itinerary page at `/share/:bookingId`
- Share dialog with open and copy actions

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Redux Toolkit and React Redux
- Redux Persist
- Axios
- Socket.IO Client
- React Icons

## Getting Started

### Prerequisites

- Node.js and npm
- The HR Trrip backend running and reachable from the frontend

### Install

```bash
npm install
```

### Environment

Create or update `.env` in the project root:

```env
VITE_API_URL=http://localhost:3000
```

`VITE_API_URL` is used for both Axios requests and the Socket.IO client.

### Run Locally

```bash
npm run dev
```

Vite serves the app locally and prints the frontend URL in the terminal.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build the production bundle |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## App Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Authenticated | Upload documents, view current itinerary, open history sidebar |
| `/login` | Public only | Log in |
| `/signup` | Public only | Create an account |
| `/share/:bookingId` | Public | View a shared itinerary without the app sidebar |

The home page can also load a prior itinerary with a booking query param:

```text
/?bookingId=<booking-id>
```

## Core Flow

1. A user logs in or signs up.
2. The authenticated home page connects to Socket.IO with the current access token.
3. The user uploads an image or PDF document up to 2MB.
4. The frontend emits the document payload over the socket.
5. Booking status events update the loading UI.
6. The completed booking event fills the current itinerary view and updates sidebar history metadata.
7. A history item can be selected to fetch its full booking details.
8. A completed itinerary can be shared with a public `/share/:bookingId` link.

## Backend Contract Used

### HTTP Endpoints

The frontend currently calls:

| Method | Endpoint | Usage |
| --- | --- | --- |
| `POST` | `/api/users/register` | Signup |
| `POST` | `/api/users/login` | Login |
| `POST` | `/api/users/refresh-token` | Access-token refresh |
| `GET` | `/api/users/me` | Restore and verify persisted auth session |
| `GET` | `/api/bookings` | Fetch booking history metadata |
| `GET` | `/api/bookings/:id` | Fetch full booking details and shared itinerary data |

The shared itinerary route assumes `GET /api/bookings/:id` is available for public share-link reads in the backend.

### Socket Events

The upload payload is emitted as:

```ts
socket.emit("upload_travel_document", {
  fileBuffer,
  mimeType,
  filename,
});
```

The frontend listens for:

| Event | Usage |
| --- | --- |
| `travel_document_status` | Upload and processing progress |
| `travel_document_completed` | Completed booking data |
| `travel_document_error` | Failed or rejected document processing |

## State Notes

- Auth state is persisted to local storage through Redux Persist.
- The booking history slice stores list metadata only.
- Full extracted itinerary data lives in the current booking flow after a completion event or a booking detail fetch.
- Extracted itinerary content is rendered dynamically because document data can vary by upload.

## Project Structure

```text
src/
  app/
    api.ts                         Axios client and token refresh behavior
    features/                      Redux slices
    hooks/                         Auth, booking, and socket hooks
    routes.tsx                     Route definitions
    socket.ts                      Socket.IO client
    store.ts                       Redux store and persistence
  components/
    auth/                          Reusable auth UI
    booking/                       Itinerary result, loading, error, share UI
    navigation/                    Sidebar and booking history list
    upload/                        Home document upload UI
  layout/                          Root, protected, and public-only layouts
  pages/                           Route pages
```

## Verification

Before shipping changes, run:

```bash
npm run build
npm run lint
```
