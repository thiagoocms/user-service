import express, { Application } from "express"
import routes from "./routes"

const app: Application = express()

app.use(express.json())
app.use(routes)

const PORT = 5000

app.listen(PORT, () => {
  console.log("======================================")
  console.log(`Server is running on PORT ${PORT}`)
  console.log("======================================")
})