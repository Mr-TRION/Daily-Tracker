import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Form, Button, Image, Divider, Icon, Message } from "semantic-ui-react";
import { todoUpdate } from "../../utils/listActions";

function EditTodo({ user, listId, todo, todoId, setTodo }) {
  const [errorMsg, setErrorMsg] = useState(null);

  const [loading, setLoading] = useState(false);

  const [newText, setNewText] = useState({
    text: todo.text,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewText((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Form
        error={errorMsg !== null}
        loading={loading}
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await todoUpdate(listId, todo, newText, setLoading, setErrorMsg);
        }}
      >
        <Message
          onDismiss={() => setErrorMsg(false)}
          error
          content={errorMsg}
          attached
          header="Oops!"
        />

        <Form.Group>
          <Form.TextArea
            placeholder=""
            name="text"
            value={newText.text}
            onChange={handleChange}
            rows={2}
            width={16}
          />
        </Form.Group>

        <Divider hidden />

        <Button
          circular
          disabled={newText.text === "" || loading}
          content={<strong>Update</strong>}
          style={{ backgroundColor: "#1DA1F2", color: "white" }}
          icon="send"
          type="submit"
          loading={loading}
        />
      </Form>
    </>
  );
}

export default EditTodo;
