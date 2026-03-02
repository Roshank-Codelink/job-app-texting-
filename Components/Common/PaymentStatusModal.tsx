"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { VerifyPaymentApi } from "@/api_config/EmployerInfoApi/payment";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/Components/ui/dialog";
import {
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { toast } from "react-toastify";
import { useEmployerLogo } from "@/Providers/EmployerLogoProvider";

type Status = "loading" | "success" | "error" | "cancelled";

export default function PaymentStatusModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { setIsPaid } = useEmployerLogo();

  const sessionId = searchParams.get("session_id");
  const paymentStatus = searchParams.get("payment_status");

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("loading");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (sessionId) {
      setIsOpen(true);
      setStatus("loading");
      verifyPayment(sessionId);
    } else if (paymentStatus === "cancel") {
      setIsOpen(true);
      setStatus("cancelled");
      toast.info("Payment was cancelled.", { toastId: "payment-cancel" });
      clearParams();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, paymentStatus]);

  const verifyPayment = async (id: string) => {
    if (isVerifying) return;

    setIsVerifying(true);
    try {
      const response = await VerifyPaymentApi(id);

      if (response?.statusCode === 200) {
        setStatus("success");
        setIsPaid(true);
        toast.success("Payment successful.", {
          toastId: "payment-success",
        });
      } else {
        setStatus("error");
        toast.error(response?.data?.message || "Verification failed.", {
          toastId: "payment-error",
        });
      }
    } catch (error) {
      setStatus("error");
      toast.error("Something went wrong while verifying payment.", {
        toastId: "payment-error",
      });
    } finally {
      setIsVerifying(false);
      clearParams();
    }
  };

  const clearParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("session_id");
    params.delete("payment_status");

    const query = params.toString() ? `?${params}` : "";
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <Loader2 className="w-8 h-8 animate-spin text-(--job-post-button-bg-from)" />
            <div>
              <h2 className="text-base font-semibold">Verifying</h2>
              <p className="text-xs text-muted-foreground">
                Please wait a moment…
              </p>
            </div>
          </>
        );

      case "success":
        return (
          <>
            <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Success</h2>
              <p className="text-xs text-muted-foreground">
                Your account is upgraded
              </p>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full h-10 rounded-lg text-sm font-medium bg-(--job-post-button-bg-from) hover:bg-(--job-post-button-hover)"
            >
              Get Started
            </Button>
          </>
        );

      case "error":
        return (
          <>
            <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Failed</h2>
              <p className="text-xs text-muted-foreground">
                Verification failed
              </p>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="w-full h-10 rounded-lg text-sm"
            >
              Close
            </Button>
          </>
        );

      case "cancelled":
        return (
          <>
            <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Cancelled</h2>
              <p className="text-xs text-muted-foreground">
                Payment process stopped
              </p>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="w-full h-10 rounded-lg text-sm"
            >
              Go Back
            </Button>
          </>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[320px] p-6 rounded-xl shadow-lg">
        <DialogTitle className="sr-only">Payment Status</DialogTitle>
        <DialogDescription className="sr-only">
          Status of your recent payment transaction
        </DialogDescription>

        <div className="flex flex-col items-center text-center gap-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
