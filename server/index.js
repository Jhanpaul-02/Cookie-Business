const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/api/cookies', async (request, response) => {
  try {
    const result = await pool.query(
      'SELECT id, name, description, price, image, label FROM cookies ORDER BY id'
    )

    response.json(result.rows)
  } catch (error) {
    console.error('Error fetching cookies:', error)
    response.status(500).json({ error: 'Failed to fetch cookies' })
  }
})

app.get('/api/orders', async (request, response) => {
  try {
    const result = await pool.query(`
      SELECT
        orders.id AS order_id,
        orders.customer_name,
        orders.status,
        orders.payment_status,
        COALESCE(SUM(order_items.quantity * order_items.unit_price), 0) AS order_total,
        orders.created_at
      FROM orders
      LEFT JOIN order_items ON order_items.order_id = orders.id
      GROUP BY orders.id
      ORDER BY orders.created_at DESC
    `)

    response.json(result.rows)
  } catch (error) {
    console.error('Error fetching orders:', error)
    response.status(500).json({ error: 'Failed to fetch orders' })
  }
})

app.post('/api/cookies', async (request, response) => {
  const { name, description, price, image, label } = request.body

  if (!name || !description || price === undefined || price === '' || !image || !label) {
    return response.status(400).json({ error: 'All cookie fields are required.' })
  }

  const numericPrice = Number(price)

  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    return response.status(400).json({ error: 'Price must be a valid non-negative number.' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO cookies (name, description, price, image, label)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, description, price, image, label`,
      [name, description, numericPrice, image, label],
    )

    response.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating cookie:', error)
    response.status(500).json({ error: 'Failed to create cookie' })
  }
})

app.listen(port, () => {
  console.log(`Cookie API listening on port ${port}`)
})