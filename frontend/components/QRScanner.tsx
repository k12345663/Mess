'use client';
import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerProps {
    onScan: (data: string) => void;
    onError?: (error: string) => void;
    onClose: () => void;
}

export default function QRScanner({ onScan, onError, onClose }: QRScannerProps) {
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const startScanner = async () => {
            try {
                const scanner = new Html5Qrcode('qr-reader');
                scannerRef.current = scanner;

                await scanner.start(
                    { facingMode: 'environment' },
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                    },
                    (decodedText) => {
                        // QR code successfully scanned
                        onScan(decodedText);
                        stopScanner();
                    },
                    (errorMessage) => {
                        // Scanning error - this is called frequently when no QR is in view
                        // Only show persistent errors
                    }
                );
                setIsScanning(true);
            } catch (err: any) {
                const errorMsg = err?.message || 'Failed to start camera';
                setError(errorMsg);
                onError?.(errorMsg);
            }
        };

        startScanner();

        return () => {
            stopScanner();
        };
    }, []);

    const stopScanner = async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.stop();
                scannerRef.current = null;
            } catch (e) {
                console.log('Scanner already stopped');
            }
        }
        setIsScanning(false);
    };

    const handleClose = async () => {
        await stopScanner();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden animate-scaleIn">
                {/* Header */}
                <div className="p-6 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Scan QR Code</h3>
                            <p className="text-sm text-gray-500 mt-1">Point camera at student's QR code</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Scanner Area */}
                <div className="px-6 pb-6">
                    <div className="relative rounded-2xl overflow-hidden bg-gray-900">
                        {/* QR Reader */}
                        <div id="qr-reader" className="w-full" style={{ minHeight: '300px' }} />

                        {/* Scanning overlay */}
                        {isScanning && (
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                <div className="w-64 h-64 border-2 border-white/50 rounded-2xl relative">
                                    {/* Corner markers */}
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-red-500 rounded-tl-lg" />
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-red-500 rounded-tr-lg" />
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-red-500 rounded-bl-lg" />
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-red-500 rounded-br-lg" />

                                    {/* Scanning line animation */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"
                                        style={{ animation: 'scanLine 2s ease-in-out infinite' }} />
                                </div>
                            </div>
                        )}

                        {/* Error state */}
                        {error && (
                            <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center text-center p-6">
                                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <p className="text-white font-medium mb-2">Camera Access Required</p>
                                <p className="text-gray-400 text-sm">{error}</p>
                            </div>
                        )}
                    </div>

                    {/* Status indicator */}
                    {isScanning && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Camera active - Ready to scan
                        </div>
                    )}
                </div>

                {/* Cancel button */}
                <div className="px-6 pb-6">
                    <button
                        onClick={handleClose}
                        className="w-full btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes scanLine {
                    0%, 100% { top: 0; }
                    50% { top: calc(100% - 4px); }
                }
            `}</style>
        </div>
    );
}
