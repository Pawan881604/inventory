interface Paths {
  crm: {
    purchases: {
      purchases: string;
      purchase_orders: string;
      debit_notes: string;
    };
    customer: string;
    vendor: string;
  };
}

export const paths: Paths = {
  crm: {
    purchases: {
      purchases: "/crm/list/purchase",
      purchase_orders: "/crm/list/purchase-order",
      debit_notes: "/crm/list/debit-notes",
    },
    customer: "/crm/customer",
    vendor: "/crm/vendor",
  },
};
