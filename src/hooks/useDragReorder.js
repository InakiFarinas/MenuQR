import { useCallback, useEffect, useRef, useState } from "react";

export default function useDragReorder(onMove) {
	const [draggedId, setDraggedId] = useState(null);
	const [overId, setOverId] = useState(null);
	const pointerIdRef = useRef(null);
	const draggingRef = useRef(null);
	const overIdRef = useRef(null);
	const onMoveRef = useRef(onMove);

	useEffect(() => {
		draggingRef.current = draggedId;
	}, [draggedId]);

	useEffect(() => {
		overIdRef.current = overId;
	}, [overId]);

	useEffect(() => {
		onMoveRef.current = onMove;
	}, [onMove]);

	const clearDragState = useCallback(() => {
		setDraggedId(null);
		setOverId(null);
		pointerIdRef.current = null;
	}, []);

	const findDropTargetId = useCallback((clientX, clientY) => {
		const element = document.elementFromPoint(clientX, clientY);
		const dropTarget = element?.closest?.("[data-drop-id]");

		return dropTarget?.getAttribute("data-drop-id") || null;
	}, []);

	const handlePointerMove = useCallback(
		(event) => {
			if (!draggingRef.current) return;
			if (pointerIdRef.current !== event.pointerId) return;

			event.preventDefault();

			const nextOverId = findDropTargetId(event.clientX, event.clientY);
			if (nextOverId && nextOverId !== draggingRef.current) {
				setOverId(nextOverId);
			} else {
				setOverId(null);
			}
		},
		[findDropTargetId],
	);

	const handlePointerUp = useCallback(
		(event) => {
			if (pointerIdRef.current !== event.pointerId) return;

			const sourceId = draggingRef.current;
			const targetId = overIdRef.current;

			if (sourceId && targetId && sourceId !== targetId) {
				onMoveRef.current(sourceId, targetId);
			}

			clearDragState();
		},
		[clearDragState],
	);

	useEffect(() => {
		window.addEventListener("pointermove", handlePointerMove, {
			passive: false,
		});
		window.addEventListener("pointerup", handlePointerUp);
		window.addEventListener("pointercancel", clearDragState);

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerup", handlePointerUp);
			window.removeEventListener("pointercancel", clearDragState);
		};
	}, [clearDragState, handlePointerMove, handlePointerUp]);

	const handlePointerDown = useCallback(
		(itemId) => (event) => {
			if (event.button != null && event.button !== 0) return;

			event.preventDefault();

			pointerIdRef.current = event.pointerId;
			setDraggedId(itemId);
			setOverId(null);

			if (event.currentTarget?.setPointerCapture) {
				try {
					event.currentTarget.setPointerCapture(event.pointerId);
				} catch {
					// noop: some touch browsers reject capture on passive sequences
				}
			}
		},
		[],
	);

	return {
		draggedId,
		overId,
		isDragging: (itemId) => draggedId === itemId,
		isDropTarget: (itemId) => overId === itemId,
		getDragHandleProps: (itemId) => ({
			onPointerDown: handlePointerDown(itemId),
			onClick: (event) => {
				event.stopPropagation();
			},
			style: { touchAction: "none", cursor: "grab" },
			title: "Arrastrar para reordenar",
			"aria-label": "Arrastrar para reordenar",
		}),
		getDropTargetProps: (itemId) => ({
			"data-drop-id": itemId,
			onDragOver: (event) => event.preventDefault(),
		}),
	};
}
