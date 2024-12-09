import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/[locale]/back/page";

describe("Home", () => {
  it("renders a heading", async () => {
    render(await Page());
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toBeInTheDocument();
  });
});
