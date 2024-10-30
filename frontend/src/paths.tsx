interface Paths {
  crm: {
    purchases: {
      purchases: string;
      purchase_orders: string;
      debit_notes: string;
    };
    product_service: string;
    crm: string;
    vendor: string;
    customer: string;
    expense: string;
    users: string;
    order: {
      list: string;
      form: string;
    };
    purchase: {
      list: string;
      form: string;
    };
  };
  dashboard: {
    products: string;
    users: string;
    inventory: string;
  };
  streaming: {
    uploadVideo: string;
    users: string;
    inventory: string;
  };
}

export const paths: Paths = {
  crm: {
    purchases: {
      purchases: "/crm/list/purchase",
      purchase_orders: "/crm/list/purchase-order",
      debit_notes: "/crm/list/debit-notes",
    },
    order: {
      list: "/crm/orders",
      form: "/crm/orders/form",
    },
    purchase: {
      list: "/crm/purchase",
      form: "/crm/purchase/form",
    },
    product_service: "/crm/product",
    crm: "/crm",
    expense: "/crm/expense",
    customer: "/crm/customer",
    vendor: "/crm/vendor",
    users: "/crm/users",
  },
  dashboard: {
    products: "/products",
    users: "/users",
    inventory: "/inventory",
  },
  streaming: {
    uploadVideo: "/streaming/upload-video",
    users: "/streaming/users",
    inventory: "/streaming/inventory",
  },
};
