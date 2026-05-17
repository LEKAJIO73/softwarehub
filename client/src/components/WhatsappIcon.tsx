import { MessageCircle } from "lucide-react";

interface Props {
  className?: string;
  size?: number;
}

export default function WhatsappIcon({ className, size }: Props) {
  return <MessageCircle className={className} size={size} strokeWidth={2.2} />;
}
