import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  title: "something",
  author: "someone",
  url: "somewhere",
  likes: 0,
  user: { name: "root" },
};
const user = {
  name: "root",
};

test("the component displaying a blog renders the blogs title and author, but does not render its url or number of likes by default.", () => {
  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("something");

  expect(component.container).toHaveTextContent("someone");

  expect(component.container).not.toHaveTextContent("somewhere");

  expect(component.container).not.toHaveTextContent(0);
});

test(" url and number of likes are shown when the button controlling the shown details has been clicked", async () => {
  const component = render(<Blog blog={blog} user={user} />);

  const button = component.getByText("view");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent("somewhere");
  expect(component.container).toHaveTextContent(0);
});

test("like button is clicked twice, the event handler the component received as props is called twice", async () => {
  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} />
  );

  const button = component.getByText("view");
  fireEvent.click(button);

  const buttonLikes = component.getByText("like");
  fireEvent.click(buttonLikes);
  fireEvent.click(buttonLikes);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
