import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Verse from "../verse";

test("should display verse", async () => {
  render(<Verse />);
  const verseElement = await screen.findByTestId("test-verse");
  expect(verseElement).toBeInTheDocument();
});
