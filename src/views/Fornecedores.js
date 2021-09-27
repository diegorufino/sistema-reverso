import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  Button,
  UncontrolledAlert,
} from "reactstrap";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { maskPhone } from "../utils/Mask";

const API_BASE_URL = "https://sistema-reverso.herokuapp.com";
// const API_BASE_URL = "http://localhost:3000";

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [statusMsg, setStatusMsg] = useState("");
  const [mensagem, setMensagem] = useState("");

  let history = useHistory();

  const closeMsgSuccess = () => {
    setStatusMsg("");
  };

  const handleClick = () => {
    history.push("/admin/novo-fornecedor");
  };

  const handleEdit = (id_fornecedor) => {
    history.push(`/admin/novo-fornecedor/${id_fornecedor}`);
  };

  const handleRemove = (id_fornecedor) => {
    axios
      .delete(`${API_BASE_URL}/fornecedores/${id_fornecedor}`)
      .then((response) => {
        if (response.status === 202) {
          setStatusMsg("success");
          setMensagem(response.data.mensagem);
          listarFornecedores();
        }
      })
      .catch((error) => {
        setStatusMsg("danger");
        setMensagem(error);
      });
  };

  const listarFornecedores = () => {
    axios
      .get(`${API_BASE_URL}/fornecedores`)
      .then((response) => {
        const listaDeFornecedores = response.data;
        setFornecedores(listaDeFornecedores.response.fornecedores);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  useEffect(() => {
    listarFornecedores();
    statusMsg !== "" && setTimeout(closeMsgSuccess, 9000);
  }, [statusMsg]);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            {statusMsg !== "" && (
              <UncontrolledAlert color={statusMsg} fade={false}>
                <span>
                  <b>{statusMsg === "success" ? "Sucesso " : "Erro "}</b>
                  {mensagem}
                </span>
              </UncontrolledAlert>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <div className="update ml-auto text-right">
                  <Button
                    className="btn-round"
                    color="primary"
                    type="button"
                    onClick={handleClick}
                  >
                    Novo
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Id</th>
                      <th>Nome Fantasia</th>
                      <th>E-mail</th>
                      <th>Telefone</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {fornecedores.map((e) => (
                      <tr key={e.id_fornecedor}>
                        <td>{e.id_fornecedor}</td>
                        <td>{e.cidade}</td>
                        <td>{e.email}</td>
                        <td>{maskPhone(e.telefone)}</td>
                        <td className="text-right">
                          <Button
                            className="btn-round"
                            color="info"
                            type="submit"
                            value={e.id_fornecedor}
                            onClick={(event) => handleEdit(event.target.value)}
                          >
                            Editar
                          </Button>{" "}
                          <Button
                            className="btn-round"
                            color="danger"
                            type="button"
                            value={e.id_fornecedor}
                            onClick={(event) =>
                              handleRemove(event.target.value)
                            }
                          >
                            Excluir
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Fornecedores;
