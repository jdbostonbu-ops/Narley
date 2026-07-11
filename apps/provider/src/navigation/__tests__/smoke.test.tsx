import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";

it("destructured query works", () => {
  const result = render(<Text>hello</Text>);
  console.log("RESULT KEYS:", Object.keys(result));
  expect(result.getByText("hello")).toBeTruthy();
});

it("screen query works", () => {
  render(<Text>world</Text>);
  expect(screen.getByText("world")).toBeTruthy();
});
