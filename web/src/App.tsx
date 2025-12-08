import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <>
      <Toaster richColors position="top-center" />

      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Button onClick={() => toast.success("Shadcn + Sonner working!")}>
          Test Notifications 🎉
        </Button>
      </div>
    </>
  );
}