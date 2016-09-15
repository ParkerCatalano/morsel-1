import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import api from './api'

mongoose.connect('mongodb://localhost/morsel-dev')

const app = express()

app.use(morgan('dev'))

app.use('/api/actions', api)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  })
})

export default app
