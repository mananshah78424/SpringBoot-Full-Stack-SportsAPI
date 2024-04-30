
import './App.css'
import useSWR from 'swr'
//This hook is typically used for data fetching in React applications.
import AddTodo from "./components/AddTodo"
import { Box, List, MantineProvider, ThemeIcon } from '@mantine/core'
import { CheckCircleFillIcon } from "@primer/octicons-react";

export const ENDPOINT="http://localhost:4000"
export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}
const fetcher=(URL:string)=>fetch(`${ENDPOINT}/${URL}`).then((r)=>r.json());
//This is a function named fetcher that takes a URL string as input and fetches data from the specified endpoint.
function App() {
  const {data,mutate} = useSWR<Todo[]>("api/todos", fetcher);
  //The <Todo[]> part after useSWR is a generic type parameter. It specifies the type of data that useSWR will fetch and manage. 
  //In this case, it indicates that useSWR will handle an array of Todo objects (Todo[]).
  //mutate: This is a function provided by useSWR that can be used to trigger a re-fetch of the data. 
  //It's useful for updating the data after certain actions, like adding or editing a todo item.
  async function markTodoAdDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH",
    }).then((r) => r.json());

    mutate(updated);
  }
  console.log(data);
  
  return <MantineProvider>
 <Box
      
    >
      <List spacing="xs" size="sm" mb={12} center>
        {data?.map((todo) => {
          console.log(todo.done);
          
          return (
            <List.Item
              onClick={() => markTodoAdDone(todo.id)}
              key={`todo_list__${todo.id}`}
              icon={
                todo.done ? (
                  <ThemeIcon color="green" size={24} radius="xl">
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                ) : (
                  <ThemeIcon color="red" size={24} radius="xl">
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                )
              }
            >
              {todo.title}
            </List.Item>
          );
        })}
      </List>

      <AddTodo mutate={mutate} />
    </Box>
  </MantineProvider>
}

export default App
