import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  Outlet,
  Link,
  useLocation
} from "react-router-dom";

const orders = [
  {
    id: "ORD-1001",
    customer: "Rahul Sharma",
    product: "Wireless Headphones",
    date: "16 Oct 2026",
    amount: 2499,
    status: "Processing"
  },
  {
    id: "ORD-1002",
    customer: "Priya Patel",
    product: "Smart Watch",
    date: "15 Oct 2026",
    amount: 3999,
    status: "Shipped"
  },
  {
    id: "ORD-1003",
    customer: "Amit Shah",
    product: "Laptop Backpack",
    date: "14 Oct 2026",
    amount: 1299,
    status: "Delivered"
  },
  {
    id: "ORD-1004",
    customer: "Neha Verma",
    product: "Bluetooth Speaker",
    date: "12 Oct 2026",
    amount: 1799,
    status: "Delivered"
  },
  {
    id: "ORD-1005",
    customer: "Karan Mehta",
    product: "Gaming Mouse",
    date: "11 Oct 2026",
    amount: 999,
    status: "Cancelled"
  }
];

const navigation = [
  {
    label: "Current Orders",
    path: "current",
    icon: "📦"
  },
  {
    label: "Order History",
    path: "history",
    icon: "🕘"
  },
  {
    label: "Cancelled Orders",
    path: "cancelled",
    icon: "✕"
  }
];

function StatusBadge({ status }) {
  const styles = {
    Processing: "bg-amber-100 text-amber-700",
    Shipped: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700"
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

function Header() {
  return (
    <header className="flex flex-col justify-between gap-4 border-b border-gray-200 bg-white px-5 py-5 sm:flex-row sm:items-center sm:px-8">
      <Link to="/" className="text-2xl font-bold tracking-tight text-indigo-700">
        Order<span className="text-gray-900">Desk</span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
          AD
        </div>
        <div>
          <p className="font-semibold text-gray-900">Admin</p>
          <p className="text-xs text-gray-500">Order Management</p>
        </div>
      </div>
    </header>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-indigo-600">
          OVERVIEW
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Order Dashboard
        </h1>
        <p className="mt-2 text-gray-500">
          Manage and track your customer orders in one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Current Orders",
            count: orders.filter(o =>
              ["Processing", "Shipped"].includes(o.status)
            ).length,
            icon: "📦",
            color: "bg-blue-50"
          },
          {
            title: "Order History",
            count: orders.filter(o => o.status === "Delivered").length,
            icon: "✅",
            color: "bg-green-50"
          },
          {
            title: "Cancelled Orders",
            count: orders.filter(o => o.status === "Cancelled").length,
            icon: "✕",
            color: "bg-red-50"
          }
        ].map(item => (
          <div
            key={item.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {item.title}
              </p>
              <span className={`rounded-xl p-3 ${item.color}`}>
                {item.icon}
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {item.count}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-bold text-gray-900">
          Manage Orders
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Choose a section to view and manage orders.
        </p>
        <Link
          to="/orders"
          className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          View All Orders →
        </Link>
      </div>
    </div>
  );
}

function OrdersLayout() {
  const location = useLocation();

  const currentSection =
    navigation.find(item =>
      location.pathname.endsWith("/" + item.path)
    )?.label || "Orders";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-indigo-600">
          ORDER MANAGEMENT
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Orders
        </h1>
        <p className="mt-2 text-gray-500">
          View current orders, completed purchases and cancellations.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Order Sections
          </h2>

          <nav className="space-y-2">
            {navigation.map(item => (
              <NavLink
                key={item.path}
                to={`/orders/${item.path}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
          <div className="mb-5 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {currentSection}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Orders / {currentSection}
            </p>
          </div>

          <Outlet />
        </section>
      </div>
    </div>
  );
}

function OrderTable({ items }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl bg-gray-50 px-4 py-12 text-center">
        <p className="text-3xl">📭</p>
        <h3 className="mt-3 font-semibold text-gray-800">
          No orders found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          There are no orders in this section.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 md:hidden">
        {items.map(order => (
          <div
            key={order.id}
            className="rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-indigo-700">{order.id}</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {order.product}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {order.customer}
                </p>
              </div>
              <StatusBadge status={order.status} />
            </div>
            <div className="mt-4 flex justify-between border-t border-gray-100 pt-3 text-sm">
              <span className="text-gray-500">{order.date}</span>
              <span className="font-bold text-gray-900">
                ₹{order.amount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
              <th className="px-3 py-4">Order ID</th>
              <th className="px-3 py-4">Product</th>
              <th className="px-3 py-4">Customer</th>
              <th className="px-3 py-4">Date</th>
              <th className="px-3 py-4">Amount</th>
              <th className="px-3 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(order => (
              <tr
                key={order.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-3 py-4 font-semibold text-indigo-700">
                  {order.id}
                </td>
                <td className="px-3 py-4 font-medium text-gray-800">
                  {order.product}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-gray-600">
                  {order.customer}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-gray-600">
                  {order.date}
                </td>
                <td className="whitespace-nowrap px-3 py-4 font-semibold text-gray-900">
                  ₹{order.amount.toLocaleString("en-IN")}
                </td>
                <td className="whitespace-nowrap px-3 py-4">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Showing {items.length} order(s)
      </p>
    </>
  );
}

function CurrentOrders() {
  const items = orders.filter(order =>
    ["Processing", "Shipped"].includes(order.status)
  );

  return <OrderTable items={items} />;
}

function OrderHistory() {
  const items = orders.filter(order => order.status === "Delivered");

  return <OrderTable items={items} />;
}

function CancelledOrders() {
  const items = orders.filter(order => order.status === "Cancelled");

  return <OrderTable items={items} />;
}

function NotFound() {
  return (
    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
      <h1 className="text-3xl font-bold text-gray-900">
        404 - Page Not Found
      </h1>
      <Link
        to="/"
        className="mt-5 inline-block rounded-lg bg-indigo-600 px-5 py-3 text-white"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/orders" element={<OrdersLayout />}>
              <Route
                index
                element={<Navigate to="current" replace />}
              />
              <Route path="current" element={<CurrentOrders />} />
              <Route path="history" element={<OrderHistory />} />
              <Route path="cancelled" element={<CancelledOrders />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="border-t border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500">
          E-commerce Order Management | React Router Practical
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
