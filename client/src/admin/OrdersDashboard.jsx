import { useEffect, useState } from 'react'
import './OrdersDashboard.css'

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await fetch('http://localhost:3000/api/orders')

        if (!response.ok) {
          throw new Error('Could not load orders.')
        }

        const data = await response.json()

        setOrders(
          data.map((order) => ({
            ...order,
            order_total: Number(order.order_total),
          })),
        )
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [])

  return (
    <section className="orders-section" id="orders">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ADMIN</p>
          <h2>Orders</h2>
        </div>
        <p className="menu-note">{orders.length} orders</p>
      </div>

      {isLoading && <p role="status">Loading orders...</p>}
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && orders.length === 0 && <p>No orders yet.</p>}

      {!isLoading && !error && orders.length > 0 && (
        <div className="orders-table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td>#{order.order_id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.status}</td>
                  <td>{order.payment_status}</td>
                  <td>${order.order_total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}