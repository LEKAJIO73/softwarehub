import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import ChatBubble from "./ChatBubble";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="md:pl-64 pt-16 md:pt-0">{children}</main>
      <ChatBubble />
    </div>
  );
}
