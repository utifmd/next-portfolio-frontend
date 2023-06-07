import '@fortawesome/fontawesome-svg-core/styles.css';
import 'lightbox.js-react/dist/index.css';
import './globals.css';
import React from "react";
import StateProvider from "@/store/StateProvider";

export const metadata = {
    title: 'Utif Milkedori | Portfolio',
    description: 'A little single page'
}
export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="text-gray-700 dark:text-gray-300 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <StateProvider>
                    {children}
                </StateProvider>
            </body>
        </html>
    )
}
