import Dashboard from "views/Dashboard.js";
import Fornecedores from "views/Fornecedores.js";
import NovoFornecedor from "views/NovoFornecedor";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import UserPage from "views/User.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    menu: false,
  },
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

  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
    menu: false,
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
    menu: false,
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
    menu: false,
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
    menu: false,
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
    menu: false,
  },
];
export default routes;
