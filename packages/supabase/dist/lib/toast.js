import toast from "react-hot-toast";
const defaultStyle = {
    padding: "0.75rem",
    minWidth: "200px",
};
export const moduleToast = {
    success: (message, options) => toast.success(message, {
        position: options?.position || "top-right",
        duration: options?.duration || 5000,
        className: "bg-background text-foreground border rounded-md border-success",
        style: defaultStyle,
        iconTheme: {
            primary: "#22c55e",
            secondary: "#ffffff",
        },
    }),
    error: (message, options) => toast.error(message, {
        position: options?.position || "top-right",
        duration: options?.duration || 5000,
        className: "bg-background text-foreground border rounded-md border-destructive",
        style: defaultStyle,
        iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
        },
    }),
};
