This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## **Environment Variables**

To configure the environment variables, create a `.env.local` file in the root of your project. This file will hold the following variables:

- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID.
- `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret.
- `NEXTAUTH_SECRET`: A random string used to secure your sessions.

### Example `.env.local` File

```plaintext
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-random-secret



## **Overview**
This is a simple Next.js project demonstrating user authentication using Google Sign-In via `next-auth`. It includes:
- A **Login Page** to authenticate users using Google OAuth.
- A **Products Page** that lists products fetched from a public API and is protected from unauthenticated access.
- A **Home Page** that serves as the entry point and provides navigation to the login page.

## **Features**
1. **Google Authentication**:
   - Users can log in using their Google accounts via `next-auth`.
   - Protected routes redirect unauthenticated users to the login page.

2. **Dynamic Navigation**:
   - Home page with navigation to the login page.
   - Products page dynamically fetches data and supports pagination.

3. **Protected Routes**:
   - The `/products` page is accessible only to authenticated users.
   - Unauthenticated users are redirected to the `/login` page with a contextual message.

4. **Responsive Design**:
   - Centered content and clean UI with consistent styling.

---

## **Tech Stack**
- **Framework**: [Next.js](https://nextjs.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: Inline CSS with basic hover effects
- **API Integration**: [Fake Store API](https://fakestoreapi.com/)
```
