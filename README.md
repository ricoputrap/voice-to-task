This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Matoer is inspired by S.A.R.A (https://hotelservices.online/), a staff messaging system for managing day-to-day operations in hotels. Hotel staff can create new tasks and communicate with each other to coordinate guest requests, maintenance issues, and service delivery across multiple departments.

S.A.R.A require manual data entry through a form for creating a new request, which can be time-consuming and inefficient during busy hotel operations.

Matoer enhances the existing workflow by introducing voice-to-task conversion using AI. Staff can simply speak their requests naturally (e.g., "Room 405 needs extra pillows by 8 PM") and the system automatically transcribes the audio and extracts structured task details such as room number, category, title, assignee, and due time. This streamlines task creation, reduces manual entry errors, and improves overall efficiency in managing hotel operations.

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
