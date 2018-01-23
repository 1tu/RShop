import Vue, { Component } from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export interface RouterItem {
  path: string;
  component: any;
  title: string;
}

export const routes: RouterItem[] = [
  { path: '/shop', component: require(`./components/RShop/List`).RShopList, title: 'Shop list' },
  { path: '/city', component: require(`./components/RCity/List`).RCityList, title: 'City list' },
  { path: '/order', component: require(`./components/ROrder/List`).ROrderList, title: 'Order list' },
  { path: '/customer', component: require(`./components/RCustomer/List`).RCustomerList, title: 'Customer list' },
  { path: '/contact', component: require(`./components/RContact/List`).RContactList, title: 'Contact list' },
  { path: '/product', component: require(`./components/RProduct/List`).RProductList, title: 'Product list' },
  { path: '/manufacture', component: require(`./components/RManufacture/List`).RManufactureList, title: 'Manufacture list' },
  { path: '/remind', component: require(`./components/RRemind/List`).RRemindList, title: 'Remind list' },
  { path: '/rejection', component: require(`./components/RRejection/List`).RRejectionList, title: 'Rejection list' },
  { path: '/payment', component: require(`./components/RPayment/List`).RPaymentList, title: 'Payment list' },
  { path: '/paymentService', component: require(`./components/RPaymentService/List`).RPaymentServiceList, title: 'Payment service list' },
  { path: '/delivery', component: require(`./components/RDelivery/List`).RDeliveryList, title: 'Delivery list' },
  { path: '/deliveryService', component: require(`./components/RDeliveryService/List`).RDeliveryServiceList, title: 'Delivery service list' },
  { path: '/user', component: require(`./components/RUser/List`).RUserList, title: 'User list' },

  // { path: '/role', title: 'Role' },
  // { path: '/permission', title: 'Permission' },
  // { path: '/image', title: 'Image', icon: 'image' },
];

const advencedRoutes = [
  { path: '/shop/:id', component: require(`./components/RShop`).RShop },
  { path: '/shop/:id/edit', component: require(`./components/RShop/Edit`).RShopEdit },
  { path: '/city/:id', component: require(`./components/RCity`).RCity },
  { path: '/city/:id/edit', component: require(`./components/RCity/Edit`).RCityEdit },
  { path: '/order/:id', component: require(`./components/ROrder`).ROrder },
  { path: '/order/:id/edit', component: require(`./components/ROrder/Edit`).ROrderEdit },
  { path: '/customer/:id', component: require(`./components/RCustomer`).RCustomer },
  { path: '/customer/:id/edit', component: require(`./components/RCustomer/Edit`).RCustomerEdit },
  { path: '/contact/:id', component: require(`./components/RContact`).RContact },
  { path: '/contact/:id/edit', component: require(`./components/RContact/Edit`).RContactEdit },
  { path: '/product/:id', component: require(`./components/RProduct`).RProduct },
  { path: '/product/:id/edit', component: require(`./components/RProduct/Edit`).RProductEdit },
  { path: '/manufacture/:id', component: require(`./components/RManufacture`).RManufacture },
  { path: '/manufacture/:id/edit', component: require(`./components/RManufacture/Edit`).RManufactureEdit },
  { path: '/remind/:id', component: require(`./components/RRemind`).RRemind },
  { path: '/remind/:id/edit', component: require(`./components/RRemind/Edit`).RRemindEdit },
  { path: '/rejection/:id', component: require(`./components/RRejection`).RRejection },
  { path: '/rejection/:id/edit', component: require(`./components/RRejection/Edit`).RRejectionEdit },
  { path: '/payment/:id', component: require(`./components/RPayment`).RPayment },
  { path: '/payment/:id/edit', component: require(`./components/RPayment/Edit`).RPaymentEdit },
  { path: '/paymentService/:id', component: require(`./components/RPaymentService`).RPaymentService },
  { path: '/paymentService/:id/edit', component: require(`./components/RPaymentService/Edit`).RPaymentServiceEdit },
  { path: '/delivery/:id', component: require(`./components/RDelivery`).RDelivery },
  { path: '/delivery/:id/edit', component: require(`./components/RDelivery/Edit`).RDeliveryEdit },
  { path: '/deliveryService/:id', component: require(`./components/RDeliveryService`).RDeliveryService },
  { path: '/deliveryService/:id/edit', component: require(`./components/RDeliveryService/Edit`).RDeliveryServiceEdit },
  { path: '/user/:id', component: require(`./components/RUser`).RUser },
  { path: '/user/:id/edit', component: require(`./components/RUser/Edit`).RUserEdit },

];

export const router = new VueRouter({
  routes: routes.map(route => ({
    path: route.path,
    component: route.component
  })).concat(advencedRoutes)
});
