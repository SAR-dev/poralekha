import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import usersRoute from './routes/users'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Welcome From Hono!')
})

app.route("/users", usersRoute);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
