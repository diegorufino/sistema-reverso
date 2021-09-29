import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  UncontrolledAlert,
} from "reactstrap";

import cnpj from "@react-br-forms/cpf-cnpj-mask";
import InputMask from "react-input-mask";
import styled from "styled-components";

const API_BASE_URL = "https://sistema-reverso.herokuapp.com";
// const API_BASE_URL = "http://localhost:3000";

const InputMaskCnpjCpf = styled(cnpj)`
  padding: 10px 0 10px 10px;
  height: unset;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #66615b;
  line-height: normal;
  font-size: 14px;
`;

const InputMaskTel = styled(InputMask)`
  padding: 10px 0 10px 10px;
  height: unset;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #66615b;
  line-height: normal;
  font-size: 14px;
`;

const NovoFornecedor = () => {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [atividadeEconomica, setAtividadeEconomica] = useState("");
  const [cnpj, setcnpj] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [mensagem, setMensagem] = useState("");
  // const [cep, setCep] = useState("");

  const removeCharacters = (str) => {
    let text = str;
    text = text.replace(/[" "]/g, "");
    text = text.replace(/[^0-9 ]/g, "");
    return text;
  };

  let { id } = useParams();

  const fornecedor = (id) => {
    axios
      .get(`${API_BASE_URL}/fornecedores/${id}`)
      .then((response) => {
        setRazaoSocial(response.data.fornecedor.razao_social);
        setNomeFantasia(response.data.fornecedor.nome_fantasia);
        setcnpj(response.data.fornecedor.cnpj);
        setEndereco(response.data.fornecedor.endereco);
        setCidade(response.data.fornecedor.cidade);
        setUf(response.data.fornecedor.uf);
        setEmail(response.data.fornecedor.email);
        setTelefone(response.data.fornecedor.telefone);
        setAtividadeEconomica(response.data.fornecedor.atividade_economica);
      })
      .catch((erro) => {
        setMensagem(erro);
      });
  };

  const closeMsgSuccess = () => {
    setStatusMsg("");
  };

  const save = (fornecedor) => {
    axios
      .post(`${API_BASE_URL}/fornecedores`, fornecedor, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        response.status === 201 && setStatusMsg("success");
        setMensagem(response.data.mensagem);
      })
      .catch((error) => {
        setStatusMsg("danger");
        console.log(error);
      });
  };

  const edit = (fornecedor, id) => {
    axios
      .patch(`${API_BASE_URL}/fornecedores/${id}`, fornecedor, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        response.status === 202 && setStatusMsg("success");
        setMensagem(response.data.mensagem);
      })
      .catch((error) => {
        setStatusMsg("danger");
        setMensagem(error);
      });
  };

  const onSubmit = () => {
    const fornecedor = {
      razao_social: razaoSocial,
      nome_fantasia: nomeFantasia,
      cnpj: cnpj,
      endereco: endereco,
      cidade: cidade,
      uf: uf,
      email: email,
      telefone: telefone,
      atividade_economica: atividadeEconomica,
      id_fornecedor: id > 0 ? id : 0,
    };

    try {
      id > 0 ? edit(fornecedor, id) : save(fornecedor);
      // limpaCampos()
    } catch (erro) {
      console.log("Error", erro);
    }
  };

  useEffect(() => {
    id > 0 && fornecedor(id);
    statusMsg !== "" && setTimeout(closeMsgSuccess, 9000);
  }, [id, statusMsg]);

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
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Novo Fornecedor</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Razão Social</label>
                        <Input
                          value={razaoSocial}
                          placeholder="Company"
                          type="text"
                          onChange={(e) => setRazaoSocial(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Nome Fantasia</label>
                        <Input
                          value={nomeFantasia}
                          placeholder="Company"
                          type="text"
                          onChange={(e) => setNomeFantasia(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>CNPJ/CPF</label>
                        <InputMaskCnpjCpf
                          placeholder="Digite um CPF ou CNPJ"
                          type="text"
                          value={cnpj}
                          onChange={(event, type) => {
                            setcnpj(removeCharacters(event.target.value));
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Atividade Economica</label>
                        <Input
                          value={atividadeEconomica}
                          placeholder="Atividade Economica"
                          type="text"
                          onChange={(e) =>
                            setAtividadeEconomica(e.target.value)
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label>Telefone</label>
                        <InputMaskTel
                          value={telefone}
                          placeholder="(99) 9 9999-9999"
                          type="text"
                          onChange={(e) =>
                            setTelefone(removeCharacters(e.target.value))
                          }
                          mask="(99) 9 9999-9999"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">E-mail</label>
                        <Input
                          value={email}
                          placeholder="E-mail"
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Cidade</label>
                        <Input
                          value={cidade}
                          placeholder="Cidade"
                          type="text"
                          onChange={(e) => setCidade(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>UF</label>
                        <Input
                          value={uf}
                          placeholder="UF"
                          type="text"
                          onChange={(e) => setUf(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Endereço</label>
                        <Input
                          value={endereco}
                          placeholder="Rua, Avenida, Travessa..."
                          type="text"
                          onChange={(e) => setEndereco(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="button"
                        onClick={onSubmit}
                      >
                        salvar
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NovoFornecedor;
