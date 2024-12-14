"use client";
export default function FileNameHint({
  hintPositionX,
  hintPositionY,
  selectedFileName,
}: {
  hintPositionX: number;
  hintPositionY: number;
  selectedFileName: string;
}) {
  return (
    <>
      <div
        id="hint"
        className={`fixed`}
        style={{
          left: `${hintPositionX + 10}px`,
          top: `${hintPositionY + 10}px`,
        }}
      >
        <p>{selectedFileName}</p>
      </div>
    </>
  );
}
