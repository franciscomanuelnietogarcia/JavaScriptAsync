import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table, Badge } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';
import './Await.css'


class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [],
      newUser: {
        name: "",
        username: "",
        email: "",
        phone: "",
      },
      editingUserId: null,
    };
  }


  async findAllUsers() {
    try {
      const response = await axios.get("https://hacked-server-json.glitch.me/users");
      const data = response.data;
      this.setState({ users: data });
    } catch (error) {
      // Обработка ошибок, если запрос не удался
      console.error("Error fetching users:", error);
    }
  }
  


  async addUser() {
    try {
      const response = await axios.post("https://hacked-server-json.glitch.me/users", this.state.newUser);
      if (response.data != null) {
        // Обновить состояние, чтобы добавить нового пользователя к текущему списку
        this.setState((prevState) => ({
          users: [...prevState.users, response.data],
          newUser: {
            id: "",
            name: "",
            username: "",
            email: "",
            phone: "",
          },
        }));
        Swal.fire(
          '¡Éxito!',
          'El usuario se ha añadido correctamente.',
          'success'
        );
      }
    } catch (error) {
      // Обработка ошибок, если запрос не удался
      console.error("Error adding user:", error);
    }
  }
  

  
  startEditing(userId) {
    const userToEdit = this.state.users.find((user) => user.id === userId);
    if (userToEdit) {
      this.setState({
        editingUserId: userId,
        newUser: { ...userToEdit },
      });
    }
  }
  
  async saveUser(userId) {
    try {
      // Найти пользователя для редактирования
      const editedUser = this.state.users.find((user) => user.id === userId);
      if (editedUser) {
        // Отправить PUT-запрос на сервер для сохранения изменений
        const response = await axios.put(`https://hacked-server-json.glitch.me/users/${userId}`, this.state.newUser);
        if (response.data != null) {
          // Обновить состояние, завершить редактирование и обновить данные пользователя
          this.setState((prevState) => ({
            users: prevState.users.map((user) =>
              user.id === userId ? { ...user, ...response.data } : user
            ),
            editingUserId: null,
            newUser: {
              name: "",
              username: "",
              email: "",
              phone: "",
            },
          }));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El usuario se ha modificado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    } catch (error) {
      // Обработка ошибок, если запрос не удался
      console.error("Error saving user:", error);
    }
  }
  
  

  async deleteUser(id) {
    const confirmationResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo.',
      cancelButtonText: 'Cancelar',
    });
  
    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.delete(`https://hacked-server-json.glitch.me/users/${id}`);
        if (response.data != null) {
          Swal.fire(
            '¡Eliminado!',
            'El usuario ha sido eliminado de la base de datos.',
            'success'
          );
          // Обновить состояние
          this.setState({
            users: this.state.users.filter((user) => user.id !== id),
          });
        }
      } catch (error) {
        // Если удаление не удалось, вы можете обработать ошибку здесь
        console.error('Error deleting user:', error);
        Swal.fire('¡Error!', 'No se pudo eliminar el usuario.', 'error');
      }
    }
  }
  

  render() {
    return (
      <div >
        <Container className="mt-4">
          <h2>
          Ejemplo CRUD con <Badge bg="dark">async/await</Badge>
          </h2>
          <ButtonGroup aria-label="User Actions" className="d-flex justify-content-center mt-4">
            <Button variant="success" onClick={() => this.findAllUsers()}>
            Obtener una lista de metedom: Get
            </Button>{" "}
          </ButtonGroup>
          <h2  className="mt-4">Lista de los usuarios</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                  {this.state.editingUserId === user.id ? (
                    <input
                      type="text"
                      value={this.state.newUser.name}
                      onChange={(e) =>
                        this.setState({
                          newUser: {
                            ...this.state.newUser,
                            name: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    user.name
                  )}
                </td>
                  <td>
                  {this.state.editingUserId === user.id ? (
                    <input
                      type="text"
                      value={this.state.newUser.username}
                      onChange={(e) =>
                        this.setState({
                          newUser: {
                            ...this.state.newUser,
                            username: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    user.username
                  )}
                </td>
                  <td>
                  {this.state.editingUserId === user.id ? (
                    <input
                      type="text"
                      value={this.state.newUser.email}
                      onChange={(e) =>
                        this.setState({
                          newUser: {
                            ...this.state.newUser,
                            email: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    user.email
                  )}
                </td>
                  <td>
                  {this.state.editingUserId === user.id ? (
                    <input
                      type="text"
                      value={this.state.newUser.phone}
                      onChange={(e) =>
                        this.setState({
                          newUser: {
                            ...this.state.newUser,
                            phone: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    user.phone
                  )}
                </td>
                <td>
                  {this.state.editingUserId === user.id ? (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => this.saveUser(user.id)}
                    >
                      Guardar
                    </Button>
                  ) : (
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => this.startEditing(user.id)}
                    >
                      Modificar
                    </Button>
                  )}{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => this.deleteUser(user.id)}
                  >
                    Eliminar
                  </Button>{" "}
                </td>
                </tr>
              ))}
            </tbody>
            <tr>
                <td> ID</td>
                <td>
                  <input
                    type="text"
                    value={this.state.newUser.name}
                    onChange={(e) =>
                      this.setState({
                        newUser: {
                          ...this.state.newUser,
                          name: e.target.value,
                        },
                      })
                    }
                    style={{ width: '100%', padding: '8px' }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.newUser.username}
                    onChange={(e) =>
                      this.setState({
                        newUser: {
                          ...this.state.newUser,
                          username: e.target.value,
                        },
                      })
                    }
                    style={{ width: '100%', padding: '8px' }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.newUser.email}
                    onChange={(e) =>
                      this.setState({
                        newUser: {
                          ...this.state.newUser,
                          email: e.target.value,
                        },
                      })
                    }
                    style={{ width: '100%', padding: '8px' }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.newUser.phone}
                    onChange={(e) =>
                      this.setState({
                        newUser: {
                          ...this.state.newUser,
                          phone: e.target.value,
                        },
                      })
                    }
                    style={{ width: '100%', padding: '8px' }}
                  />
                </td>
                <td>
                  <Button variant="outline-success" onClick={() => this.addUser()}
                    style={{ width: '100%', padding: '8px' }}>
                    Añadir
                    </Button>{' '}
                </td>
              </tr>
          </Table>
        </Container>
      </div>
    );
  }
}

export default UserList;
