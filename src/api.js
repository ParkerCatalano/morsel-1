import { Router } from 'express'
import { encode, decode } from './lib'
import Url from './url'

const api = Router()

api.get('/shorten', (req, res, next) => {
  const { query } = req
  
  if (!query.url) {
    const err = new Error('url is required')
    err.status = 400
    return next(err)
  }

  Url.findOne({ long_url: query.url }, (err, doc) => {
    if (err) return next(err)
    
    if (doc) {
      return res.send(encode(doc._id))
    }

    const record = new Url({
      long_url: query.url
    })

    record.save((err) => {
      if (err) return next(err)
      res.send(encode(record._id))
    })
  })
})

api.get('/lookup/:id', (req, res, next) => {
  Url.findOne({ _id: decode(req.params.id) }, (err, doc) => {
    if (err) return next(err)
    if (!doc) return next()

    res.send(doc.long_url)
  })
})

export default api
