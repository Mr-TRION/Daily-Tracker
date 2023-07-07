import React, { useState, useRef } from "react";
import { Form, Button, Image, Divider, Message, Icon } from "semantic-ui-react";
import { submitNewList } from "../../utils/listActions";

function CreateList({ user, setLists }) {
  const [newList, setNewList] = useState({ text: "", url: "" });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const [error, setError] = useState(null);
  const [highlighted, setHighlighted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewList((prev) => ({ ...prev, [name]: value }));
    console.log(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await submitNewList(newList.text, setLists, setNewList, setError);

    setLoading(false);
  };

  return (
    <>
      <Form error={error !== null} onSubmit={handleSubmit}>
        <Message
          error
          onDismiss={() => setError(null)}
          content={error}
          header="Oops!"
        />

        <Form.Group>
          <Form.TextArea
            placeholder="ADD NEW SECTION ? Type here..."
            name="text"
            value={newList.text}
            onChange={handleChange}
            rows={2}
            width={16}
          />
        </Form.Group>

        <Button
          circular
          id="add-btn"
          disabled={newList.text === "" || loading}
          content={<strong>Add</strong>}
          style={{ backgroundColor: "#1DA1F2", color: "white" }}
          icon="send"
          loading={loading}
        />
      </Form>
      <Divider />
    </>
  );
}

export default CreateList;
