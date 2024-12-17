import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewProduct from "../src/app/[locale]/user/product/new-product/page";
import "@testing-library/jest-dom";

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "mockedObjectURL");
});

jest.mock("../src/app/[locale]/Modal.tsx", () => ({
  __esModule: true,
  default: ({
    action,
    action2,
  }: {
    action: () => void;
    action2: () => void;
  }) => (
    <div data-testid="modal">
      <button onClick={action}>Confirm</button>
      <button onClick={action2}>Cancel</button>
    </div>
  ),
}));

jest.mock(
  "../src/app/[locale]/user/product/new-product/component/FileUploader.tsx",
  () => ({
    __esModule: true,
    default: ({
      onFilesSelected,
    }: {
      onFilesSelected: (files: File[]) => void;
    }) => (
      <input
        type="file"
        data-testid="file-uploader"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            onFilesSelected(Array.from(e.target.files));
          }
        }}
      />
    ),
  })
);

describe("NewProduct Component", () => {
  it("renders the component", () => {
    render(<NewProduct />);
    expect(screen.getByText("Add New Product")).toBeInTheDocument();
  });

  // it("validates name input", () => {
  //   render(<NewProduct />);
  //   const nameInput = screen.getByLabelText("Name:");
  //   fireEvent.blur(nameInput);
  //   expect(nameInput).toHaveStyle("border-color: red");
  //   fireEvent.change(nameInput, { target: { value: "Product Name" } });
  //   fireEvent.blur(nameInput);
  //   expect(nameInput).not.toHaveStyle("border-color: red");
  // });

  // it("adds a new spec and deletes it", () => {
  //   render(NewProduct());
  //   const addSpecButton = screen.getByText("+");
  //   fireEvent.click(addSpecButton);

  //   const specInputs = screen.getAllByRole("textbox");
  //   expect(specInputs).toHaveLength(1);

  //   const deleteSpecButton = screen.getByText("x");
  //   fireEvent.click(deleteSpecButton);
  //   expect(screen.queryAllByRole("textbox")).toHaveLength(0);
  // });

  // it("displays validation errors for empty required fields on submission", async () => {
  //   render(<NewProduct />);
  //   const submitButton = screen.getByText("Add Product");
  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(screen.queryByTestId("modal")).toBeNull();
  //     expect(screen.getByText("Invalid Input")).toBeInTheDocument();
  //   });
  // });

  // it("opens and closes the confirmation modal", async () => {
  //   render(<NewProduct />);
  //   const submitButton = screen.getByText("Add Product");
  //   fireEvent.click(submitButton);

  //   await waitFor(() =>
  //     expect(screen.getByTestId("modal")).toBeInTheDocument()
  //   );

  //   const cancelButton = screen.getByText("Cancel");
  //   fireEvent.click(cancelButton);

  //   expect(screen.queryByTestId("modal")).toBeNull();
  // });

  // it("uploads an image and displays it", () => {
  //   render(<NewProduct />);
  //   const fileUploader = screen.getByTestId("file-uploader");

  //   const file = new File(["image-content"], "../public/2.jpg", {
  //     type: "image/png",
  //   });
  //   fireEvent.change(fileUploader, { target: { files: [file] } });

  //   const uploadedImage = screen.getByAltText("image.png");
  //   expect(uploadedImage).toBeInTheDocument();
  // });

  // it("submits the form when all fields are valid", async () => {
  //   global.fetch = jest.fn(() =>
  //     Promise.resolve({
  //       json: () => Promise.resolve({ code: 200, message: "Success" }),
  //     })
  //   ) as jest.Mock;

  //   render(<NewProduct />);

  //   // Fill out all required fields
  //   fireEvent.change(screen.getByLabelText("Name:"), {
  //     target: { value: "Test Product" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Description:"), {
  //     target: { value: "Test Description" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Price:"), {
  //     target: { value: "100" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Stock:"), {
  //     target: { value: "10" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Category:"), {
  //     target: { value: "Category A" },
  //   });
  //   fireEvent.change(screen.getByLabelText("SubCategory:"), {
  //     target: { value: "SubCategory B" },
  //   });

  //   // Simulate file upload
  //   const fileUploader = screen.getByTestId("file-uploader");
  //   const file = new File(["image-content"], "image.png", {
  //     type: "image/png",
  //   });
  //   fireEvent.change(fileUploader, { target: { files: [file] } });

  //   // Add and fill specs
  //   fireEvent.click(screen.getByText("+"));
  //   fireEvent.change(screen.getAllByRole("textbox")[0], {
  //     target: { value: "Spec 1" },
  //   });

  //   // Submit the form
  //   const submitButton = screen.getByText("Add Product");
  //   fireEvent.click(submitButton);

  //   // Confirm modal
  //   await waitFor(() =>
  //     expect(screen.getByTestId("modal")).toBeInTheDocument()
  //   );
  //   fireEvent.click(screen.getByText("Confirm"));

  //   await waitFor(() => {
  //     expect(global.fetch).toHaveBeenCalledWith(
  //       "/api/product",
  //       expect.objectContaining({
  //         method: "post",
  //         body: expect.any(String),
  //       })
  //     );
  //   });
  // });
});
