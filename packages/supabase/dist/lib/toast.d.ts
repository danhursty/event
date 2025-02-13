import { ToastPosition } from "react-hot-toast";
interface ToastOptions {
    position?: ToastPosition;
    duration?: number;
}
export declare const moduleToast: {
    success: (message: string, options?: ToastOptions) => string;
    error: (message: string, options?: ToastOptions) => string;
};
export {};
