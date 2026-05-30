# Krowdly Frontend

Krowdly is a modern event management platform where users can discover, join, and manage events through an intuitive and responsive user interface. The application supports public and private events, event invitations, participant management, reviews, ratings, and secure JWT-based authentication.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Homepage

* Featured Event Section
* Upcoming Events Slider
* Event Categories
* Call To Action Section
* Responsive Navigation Bar
* Footer Navigation

### Event Discovery

* Browse Events
* Search Events by Title
* Search Events by Organizer
* Event Filtering

  * Public Free
  * Public Paid
  * Private Free
  * Private Paid

### Event Details

* Event Information
* Organizer Information
* Registration Fee Details
* Dynamic Action Buttons
* Reviews and Ratings

### Event Participation

#### Public Free

* Instant Join

#### Public Paid

* Pay & Join

#### Private Free

* Request to Join

#### Private Paid

* Request to Join
* Approval Required
* Payment After Approval

### Dashboard

* My Events
* Pending Invitations
* My Reviews
* Settings

### Event Management

* Create Events
* Update Events
* Delete Events
* Manage Participants
* Manage Join Requests
* Manage Invitations

### Reviews & Ratings

* Create Reviews
* Edit Reviews
* Delete Reviews
* Event Ratings

### Ban System

* Platform Ban
* Event Owner Ban

When an event owner bans a participant, that participant cannot join any future events created by the same owner but can still join events created by other users.

---

## Tech Stack

### Framework

* Next.js 16
* React 19
* TypeScript

### Styling

* Tailwind CSS
* Tailwind Merge
* TailwindCSS Animate
* Class Variance Authority
* CLSX

### UI Components

* Base UI

### Icons

* Lucide React

### Animation

* Motion

### Validation

* Zod

### Authentication

* JSON Web Token
* JWT Decode

### Notifications

* Sonner

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd krowdly-frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

Run lint:

```bash
npm run lint
```

---

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run clean
```

---

## Project Structure

```text
src/
├── app/
├── components/
├── services/
├── hooks/
├── lib/
├── types/
├── providers/
├── constants/
└── utils/
```

---

## UI/UX Highlights

* Fully Responsive Design
* Mobile Friendly
* Tablet Friendly
* Desktop Optimized
* Reusable Components
* Clean Layout
* Modern User Experience
* Consistent Design System

---

## Core User Flow

### Public Free Event

Join → Registered

### Public Paid Event

Pay → Registered

### Private Free Event

Request → Approval → Registered

### Private Paid Event

Request → Approval → Payment → Registered

---

## Frontend Dependencies

### Production Dependencies

* @base-ui/react
* class-variance-authority
* clsx
* jsonwebtoken
* jwt-decode
* lucide-react
* motion
* next
* react
* react-dom
* sonner
* tailwind-merge
* tailwindcss-animate
* zod

### Development Dependencies

* TypeScript
* ESLint
* ESLint Config Next
* Tailwind CSS
* PostCSS
* Autoprefixer
* @types/react
* @types/react-dom
* @types/node

---

## Author

Joy Sarkar

## License

This project was developed as part of the Krowdly Event Management Platform.
