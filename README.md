# Financial Dashboard

A personal financial dashboard built with Next.js, React, Shadcn UI, Radix UI, and Tailwind CSS to help you track and categorize your income and expenses.

## Features

- **Dashboard Overview**: View your total income, expenses, and balance at a glance
- **Category Breakdown**: Visualize your income and expenses by category with interactive pie charts
- **Monthly Trends**: Track your financial progress over time with a monthly bar chart
- **Recent Transactions**: See your most recent transactions in a clean, sortable table
- **Add Transactions**: Easily add new income or expense transactions with a simple form

## Tech Stack

- **Next.js**: React framework with App Router for server-side rendering and routing
- **React**: UI library for building component-based interfaces
- **Shadcn UI**: High-quality UI components built with Radix UI and Tailwind CSS
- **Radix UI**: Unstyled, accessible UI components for building high-quality design systems
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Recharts**: Composable charting library built on React components

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/financial-dashboard.git
   cd financial-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## Project Structure

```
financial-dashboard/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx          # Dashboard page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── dashboard/        # Dashboard-specific components
│   │   │   ├── summary-card.tsx
│   │   │   ├── recent-transactions.tsx
│   │   │   ├── category-breakdown.tsx
│   │   │   ├── monthly-trend.tsx
│   │   │   └── add-transaction-form.tsx
│   │   └── ui/               # Shadcn UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── table.tsx
│   │       └── tabs.tsx
│   └── lib/
│       ├── mock-data.ts      # Mock data for demonstration
│       ├── types.ts          # TypeScript types
│       └── utils.ts          # Utility functions
```

## Future Enhancements

- User authentication and accounts
- Data persistence with a database
- Transaction filtering and search
- Budget planning and tracking
- Expense forecasting
- Mobile app with React Native

## License

This project is licensed under the MIT License - see the LICENSE file for details.
