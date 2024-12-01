"use client";
import { useEffect } from "react";
import "./page.css";
export default function Page() {
  useEffect(() => {
    const dashboard: HTMLElement = document.getElementById("dashboard")!;
    let draggedElement: HTMLElement | null = null;

    // Event listeners for drag and drop
    dashboard.addEventListener("dragstart", (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        draggedElement = target;
        target.classList.add("dragging");
      }
    });

    dashboard.addEventListener("dragend", (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        draggedElement = target;
        target.classList.remove("dragging");
      }
    });

    dashboard.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(dashboard, e.clientY);
      if (afterElement == null) {
        dashboard.appendChild(draggedElement!);
      } else {
        dashboard.insertBefore(draggedElement!, afterElement);
      }
    });

    // Utility function to find the element to insert after
    function getDragAfterElement(
      container: HTMLElement,
      y: number
    ): HTMLElement | null {
      const draggableElements = Array.from(
        container.querySelectorAll<HTMLElement>(".chunk:not(.dragging)")
      );

      return draggableElements.reduce<{
        offset: number;
        element: HTMLElement | null;
      }>(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY, element: null }
      ).element;
    }
  }, []);
  return (
    <>
      <h2>Dashboard</h2>
      <div id="dashboard">
        <div className="chunk" draggable="true" data-id="1">
          Chunk 1
        </div>
        <div className="chunk" draggable="true" data-id="2">
          Chunk 2
        </div>
        <div className="chunk" draggable="true" data-id="3">
          Chunk 3
        </div>
        <div className="chunk" draggable="true" data-id="4">
          Chunk 4
        </div>
      </div>
    </>
  );
}
