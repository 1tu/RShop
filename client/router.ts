import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export interface RouterItem {
  path: string;
  component: any;
  title: string;
}

export const routes: RouterItem[] = [
  { path: '/Shop', component: require(`./components/RShop/List`).RShopList, title: 'Shop' },
  { path: '/City', component: require(`./components/RCity/List`).RCityList, title: 'City' },
  { path: '/Order', component: require(`./components/ROrder/List`).ROrderList, title: 'Order' },
  { path: '/Customer', component: require(`./components/RCustomer/List`).RCustomerList, title: 'Customer' },
  { path: '/Contact', component: require(`./components/RContact/List`).RContactList, title: 'Contact' },
  { path: '/FilteredPage', component: require(`./components/RFilteredPage/List`).RFilteredPageList, title: 'FilteredPage' },
  { path: '/Category', component: require(`./components/RCategory/List`).RCategoryList, title: 'Category' },
  { path: '/Product', component: require(`./components/RProduct/List`).RProductList, title: 'Product' },
  { path: '/Manufacture', component: require(`./components/RManufacture/List`).RManufactureList, title: 'Manufacture' },
  { path: '/PreManufacture', component: require(`./components/RPreManufacture/List`).RPreManufactureList, title: 'PreManufacture' },
  { path: '/SeoMeta', component: require(`./components/RSeoMeta/List`).RSeoMetaList, title: 'SeoMeta' },
  { path: '/SeoTemplate', component: require(`./components/RSeoTemplate/List`).RSeoTemplateList, title: 'SeoTemplate' },
  { path: '/Remind', component: require(`./components/RRemind/List`).RRemindList, title: 'Remind' },
  { path: '/Rejection', component: require(`./components/RRejection/List`).RRejectionList, title: 'Rejection' },
  { path: '/Payment', component: require(`./components/RPayment/List`).RPaymentList, title: 'Payment' },
  { path: '/PaymentService', component: require(`./components/RPaymentService/List`).RPaymentServiceList, title: 'Payment service' },
  { path: '/Delivery', component: require(`./components/RDelivery/List`).RDeliveryList, title: 'Delivery' },
  { path: '/DeliveryService', component: require(`./components/RDeliveryService/List`).RDeliveryServiceList, title: 'Delivery service' },
  { path: '/User', component: require(`./components/RUser/List`).RUserList, title: 'User' },

  // { path: '/role', title: 'Role' },
  // { path: '/permission', title: 'Permission' },
  // { path: '/image', title: 'Image', icon: 'image' },
];

const advencedRoutes = [
  { path: '/Shop/:id', component: require(`./components/RShop`).RShop },
  { path: '/Shop/:id/edit', component: require(`./components/RShop/Edit`).RShopEdit },
  { path: '/City/:id', component: require(`./components/RCity`).RCity },
  { path: '/City/:id/edit', component: require(`./components/RCity/Edit`).RCityEdit },
  { path: '/Order/:id', component: require(`./components/ROrder`).ROrder },
  { path: '/Order/:id/edit', component: require(`./components/ROrder/Edit`).ROrderEdit },
  { path: '/Customer/:id', component: require(`./components/RCustomer`).RCustomer },
  { path: '/Customer/:id/edit', component: require(`./components/RCustomer/Edit`).RCustomerEdit },
  { path: '/Contact/:id', component: require(`./components/RContact`).RContact },
  { path: '/Contact/:id/edit', component: require(`./components/RContact/Edit`).RContactEdit },
  { path: '/FilteredPage/:id', component: require(`./components/RFilteredPage`).RFilteredPage },
  { path: '/FilteredPage/:id/edit', component: require(`./components/RFilteredPage/Edit`).RFilteredPageEdit },
  { path: '/Category/:id', component: require(`./components/RCategory`).RCategory },
  { path: '/Category/:id/edit', component: require(`./components/RCategory/Edit`).RCategoryEdit },
  { path: '/Product/:id', component: require(`./components/RProduct`).RProduct },
  { path: '/Product/:id/edit', component: require(`./components/RProduct/Edit`).RProductEdit },
  { path: '/Manufacture/:id', component: require(`./components/RManufacture`).RManufacture },
  { path: '/Manufacture/:id/edit', component: require(`./components/RManufacture/Edit`).RManufactureEdit },
  { path: '/PreManufacture/:id', component: require(`./components/RPreManufacture`).RPreManufacture },
  { path: '/PreManufacture/:id/edit', component: require(`./components/RPreManufacture/Edit`).RPreManufactureEdit },
  { path: '/SeoMeta/:id', component: require(`./components/RSeoMeta`).RSeoMeta },
  { path: '/SeoMeta/:id/edit', component: require(`./components/RSeoMeta/Edit`).RSeoMetaEdit },
  { path: '/SeoTemplate/:id', component: require(`./components/RSeoTemplate`).RSeoTemplate },
  { path: '/SeoTemplate/:id/edit', component: require(`./components/RSeoTemplate/Edit`).RSeoTemplateEdit },

  { path: '/Remind/:id', component: require(`./components/RRemind`).RRemind },
  { path: '/Remind/:id/edit', component: require(`./components/RRemind/Edit`).RRemindEdit },
  { path: '/Rejection/:id', component: require(`./components/RRejection`).RRejection },
  { path: '/Rejection/:id/edit', component: require(`./components/RRejection/Edit`).RRejectionEdit },
  { path: '/Payment/:id', component: require(`./components/RPayment`).RPayment },
  { path: '/Payment/:id/edit', component: require(`./components/RPayment/Edit`).RPaymentEdit },
  { path: '/PaymentService/:id', component: require(`./components/RPaymentService`).RPaymentService },
  { path: '/PaymentService/:id/edit', component: require(`./components/RPaymentService/Edit`).RPaymentServiceEdit },
  { path: '/Delivery/:id', component: require(`./components/RDelivery`).RDelivery },
  { path: '/Delivery/:id/edit', component: require(`./components/RDelivery/Edit`).RDeliveryEdit },
  { path: '/DeliveryService/:id', component: require(`./components/RDeliveryService`).RDeliveryService },
  { path: '/DeliveryService/:id/edit', component: require(`./components/RDeliveryService/Edit`).RDeliveryServiceEdit },
  { path: '/User/:id', component: require(`./components/RUser`).RUser },
  { path: '/User/:id/edit', component: require(`./components/RUser/Edit`).RUserEdit },

];

export const router = new VueRouter({
  routes: routes.map(route => ({
    path: route.path,
    component: route.component
  })).concat(advencedRoutes)
});
