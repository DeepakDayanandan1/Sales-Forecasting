import './globals.css'

export const metadata = {
  title: 'Sales Forecasting',
  description: 'Predict item outlet sales',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}


