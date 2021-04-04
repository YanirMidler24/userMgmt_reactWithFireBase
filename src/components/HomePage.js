import React, { useEffect, useState } from "react";
import {
  Jumbotron,
  Container,
  Button,
  Form,
  Col,
  InputGroup,
  Table,
  FormControl,
} from "react-bootstrap";
import { useAuthAPI } from "../contextAPI/AuthAPI";
import { useDataAPI } from "../contextAPI/dataAPI";
export default function HomePage() {
  const { currentUser, setLoginFlagAPI, loginFlagAPI } = useAuthAPI();
  const [tasks, setTasks] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoTasks, setTodoTask] = useState("");
  const [done, setDone] = useState("");
  const [flag, setFlag] = useState("");

  useEffect(() => {
    setLoginFlagAPI(false);
  }, [loginFlagAPI == true]);

  const {
    search,
    addTaskToUser,
    getUserDataFromDB,
    TodosFromDB,
    doneTask,
  } = useDataAPI();

  useEffect(async () => {
    await doneTask(currentUser.email, done);
    let arr = tasks.filter((x) => x.title != done);
    setTasks(arr);
    setTodoTask("");
    setTodoTitle("");
    setDone(false);
    setFlag(true);
  }, [done != ""]);

  useEffect(() => {
    getUserDataFromDB(currentUser.email);
    setFlag(false);
  }, [flag == true]);

  useEffect(() => {
    addTask();
    getUserDataFromDB(currentUser.email);
  }, []);

  useEffect(async () => {
    getUserDataFromDB(currentUser.email);
  }, [done]);

  useEffect(() => {
    getUserDataFromDB(currentUser.email);
  }, [tasks]);

  const addTask = async () => {
    let arr = [...tasks];
    let json = { title: todoTitle, task: todoTasks };
    arr.push(json);
    setTasks(arr);
    await addTaskToUser(currentUser.email, arr);
    await getUserDataFromDB(currentUser.email);
    setTodoTask("");
    setTodoTitle("");
  };

  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1> {sessionStorage["email"]} Welcome to my website! </h1>
          <h3>Add a Todo task for later...</h3>
          <Form action="../getData.php" method="post">
            <Form.Row className="align-items-center">
              <Col sm={3} className="my-1">
                <Form.Label htmlFor="inlineFormInputName" srOnly></Form.Label>
                <Form.Control
                  id="inlineFormInputName"
                  onChange={(e) => setTodoTitle(e.target.value)}
                  placeholder="Todo Title"
                  name="title"
                />
              </Col>
              <Col sm={3} className="my-1">
                <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                  Todo Task
                </Form.Label>
                <InputGroup>
                  <FormControl
                    id="inlineFormInputGroupUsername"
                    placeholder="Todo Task"
                    onChange={(e) => setTodoTask(e.target.value)}
                  />
                </InputGroup>
              </Col>

              <Col className="my-1">
                <Button onClick={addTask}>Submit</Button>
              </Col>
            </Form.Row>
          </Form>

          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Task</th>
                <th>Done ? </th>
              </tr>
            </thead>
            {TodosFromDB &&
              TodosFromDB.map((task) => {
                if (task.title.includes(search) || search == null) {
                  return (
                    <>
                      <tbody>
                        <tr>
                          <td>{task.title}</td>
                          <td>{task.task}</td>
                          <td>
                            {
                              <input
                                type="checkbox"
                                onChange={(e) =>
                                  e.target.checked === true
                                    ? setDone(task.title)
                                    : ""
                                }
                              />
                            }
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                }
              })}
          </Table>
        </Container>
      </Jumbotron>
    </div>
  );
}
