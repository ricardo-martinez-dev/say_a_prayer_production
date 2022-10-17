import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Bible from "../Bible";

it("should display heding in the document", async () => {
  render(<Bible />);
  const heading = screen.getByRole("heading");
  expect(heading).toBeInTheDocument();
});
