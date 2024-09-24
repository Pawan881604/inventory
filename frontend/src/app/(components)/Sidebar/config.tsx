import { paths } from "@/paths";
export interface PageData {
  key: string;
  title: string;
  href: string;
  icon: string;
}
export interface PageDataGroup {
  label: string;
  icon: string;
  title: string;
  href: string;
  page_data?: PageData[];
}
export interface MenuListProps {
  key: string;
  pages: PageDataGroup[];
}
export const navItems: MenuListProps[] = [
  {
    key: "CRM",
    pages: [
      {
        title: "Purchases",
        label: "Purchases",
        icon: 'ShoppingCart',
        href: '',
        page_data: [
          {
            key: "purchase",
            title: "Purchase",
            href: paths.crm.purchases.purchases,
            icon: "ShoppingCart",
          },
          {
            key: "purchase_orders",
            title: "Purchase orders",
            href: paths.crm.purchases.purchase_orders,
            icon: "ShoppingBag",
          },
          {
            key: "debit_notes",
            title: "Debit notes",
            href: paths.crm.purchases.debit_notes,
            icon: "NotebookText",
          },
        ],
      },
      {
        title: "Vendor",
        label: "Vendor",
        icon: 'ShoppingCart',
        href: paths.crm.vendor,
      },

    ],
  },
];
