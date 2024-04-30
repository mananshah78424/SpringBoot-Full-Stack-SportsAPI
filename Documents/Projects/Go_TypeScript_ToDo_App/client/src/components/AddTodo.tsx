import { useState } from 'react';
import { Modal, Group, Button, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ENDPOINT, Todo } from "../App";
import { KeyedMutator } from 'swr';


function AddTodo({mutate}:{mutate:KeyedMutator<Todo[]>}) {
    const [open, setOpen] = useState(false);
    async function createTodo(values: { title: string; body: string }) {
        const updated = await fetch(`${ENDPOINT}/api/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }).then((r) => r.json());
    
        mutate(updated);
        form.reset();
        setOpen(false);
      }
    
    const form = useForm({
        initialValues: {
            title: "",
            body: "",
        },
    });

    return (
        <>
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                title="Create Todo"
            >
                <form onSubmit={form.onSubmit(createTodo)}>
                <TextInput
            required
            mb={12}
            label="Todo"
            placeholder="What do you want to do?"
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mb={12}
            label="Body"
            placeholder="Tell me more..."
            {...form.getInputProps("body")}
          />
                    <Button type='submit'>Create Todo</Button>
                </form>
            </Modal>
            <Group>
            <Button fullWidth mb={12} onClick={() => { setOpen(true); console.log("hello"); }}>
                ADD TODO
            </Button>

            </Group>
        </>
    );
}

export default AddTodo;

