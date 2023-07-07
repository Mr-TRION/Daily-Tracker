import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { postTodo } from "../../utils/listActions";

function TodoInputField({ listId, user, setTodo }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Form
      reply
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await postTodo(listId, user, text, setTodo, setText);

        setLoading(false);
      }}
    >
      <Form.Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add Todo"
        action={{
          color: "blue",
          icon: "edit",
          loading: loading,
          disabled: text === "" || loading,
        }}
      />
    </Form>
  );
}

export default TodoInputField;
