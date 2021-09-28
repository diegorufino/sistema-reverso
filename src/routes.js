import Fornecedores from "views/Fornecedores.js";
import NovoFornecedor from "views/NovoFornecedor";

var routes = [
  {
    path: "/fornecedores",
    name: "Fornecedores",
    icon: "nc-icon nc-bank",
    component: Fornecedores,
    layout: "/admin",
    menu: true,
  },
  {
    path: "/novo-fornecedor/:id",
    name: "Editar Fornecedor",
    icon: "nc-icon nc-bank",
    component: NovoFornecedor,
    layout: "/admin",
    menu: false,
  },
  {
    path: "/novo-fornecedor",
    name: "Novo Fornecedor",
    icon: "nc-icon nc-bank",
    component: NovoFornecedor,
    layout: "/admin",
    menu: false,
  },
];
export default routes;
