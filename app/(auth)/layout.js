export default function AuthLayout({ children }) {
      return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-background dark:to-muted px-4">
                  <div className="w-full max-w-md">
                        {children}
                  </div>
            </div>
      );
}
