import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Request from "../Request";

test("should display request title", () => {
  render(<Request prayer={"hello test title"} isTitle={true} />);

  const elem = screen.getByText("hello test title");
  expect(elem).toBeInTheDocument();
});

test("should display request", () => {
  render(<Request prayer={"hello test request"} />);
  const elem = screen.getByText("hello test request");
  expect(elem).toBeInTheDocument();
});
