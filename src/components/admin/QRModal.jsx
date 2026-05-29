import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { IconDownload, IconPrinter, IconX } from "@tabler/icons-react";

export default function QRModal({ menuName, url, onClose }) {
	const canvasRef = useRef(null);

	function handleDownload() {
		const canvas = canvasRef.current?.querySelector("canvas");
		if (!canvas) return;

		const paddedCanvas = document.createElement("canvas");
		const padding = 32;
		paddedCanvas.width = canvas.width + padding * 2;
		paddedCanvas.height = canvas.height + padding * 2;

		const ctx = paddedCanvas.getContext("2d");
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);
		ctx.drawImage(canvas, padding, padding);

		const link = document.createElement("a");
		link.download = `qr-${menuName.toLowerCase().replace(/\s+/g, "-")}.png`;
		link.href = paddedCanvas.toDataURL("image/png");
		link.click();
	}

	function handlePrint() {
		const canvas = canvasRef.current?.querySelector("canvas");
		if (!canvas) return;

		const dataUrl = canvas.toDataURL("image/png");
		const printWindow = window.open("", "_blank");
		printWindow.document.write(`
			<html>
				<head>
					<title>QR - ${menuName}</title>
					<style>
						body {
							margin: 0;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							min-height: 100vh;
							font-family: sans-serif;
							gap: 16px;
						}
						img { display: block; }
						p { color: #374151; font-size: 14px; margin: 0; }
					</style>
				</head>
				<body>
					<img src="${dataUrl}" />
					<p>${menuName}</p>
					<p style="color: #6b7280; font-size: 12px;">${url}</p>
					<script>window.onload = () => { window.print(); window.close(); }</script>
				</body>
			</html>
		`);
		printWindow.document.close();
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="w-full max-w-sm rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.15)]"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="mb-6 flex items-start justify-between gap-3">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
							Código QR
						</p>
						<h3 className="mt-1 text-xl font-semibold text-gray-950">
							{menuName}
						</h3>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/5 text-gray-600 transition hover:bg-black/10"
						aria-label="Cerrar"
					>
						<IconX size={16} stroke={2} />
					</button>
				</div>

				{/* QR */}
				<div
					ref={canvasRef}
					className="flex items-center justify-center rounded-[1.25rem] border border-black/5 bg-gray-50 p-6"
				>
					<QRCodeCanvas
						value={url}
						size={200}
						bgColor="#f9fafb"
						fgColor="#030712"
					/>
				</div>

				{/* URL */}
				<p className="mt-3 break-all text-center text-xs text-gray-400">
					{url}
				</p>

				{/* Actions */}
				<div className="mt-6 grid grid-cols-2 gap-2">
					<button
						type="button"
						onClick={handleDownload}
						className="inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-gray-950 transition hover:bg-black/3"
					>
						<IconDownload size={16} stroke={1.8} />
						Descargar
					</button>
					<button
						type="button"
						onClick={handlePrint}
						className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
					>
						<IconPrinter size={16} stroke={1.8} />
						Imprimir
					</button>
				</div>
			</div>
		</div>
	);
}
