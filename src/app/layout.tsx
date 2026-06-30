
import type { Metadata } from "next";
import { ClerkProvider} from '@clerk/nextjs'
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import {Toaster} from "@/components/ui/sonner"
export const metadata: Metadata = {
  title:{
    default:"Voice-AI",
    // this is for if we visit any page so it should be written like page | Voice-AI
    template:"%s | Voice-AI"
  },
  description: "Generated your Customized Voice",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <ClerkProvider>
      <TRPCReactProvider>

    <html
      lang="en"
      className={` h-full antialiased ` }
      >
      <body className={`min-h-full flex flex-col `}>{children}

        <Toaster/>
      </body>
    </html>
        </TRPCReactProvider>
      </ClerkProvider>
  );
}
