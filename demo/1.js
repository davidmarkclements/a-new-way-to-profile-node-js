const mongojs = require('mongojs')
const fastify = require('fastify')
const { createHash } = require('crypto')

const db = mongojs('localhost:27017/npm')
const col = db.collection('modules')
const app = fastify()

// get 5 newest and 5 oldest, no index
app.get('/', function (req, reply) {
  col.find().sort({modified: -1}).limit(5, function (err, newest) {
    if (err) return reply.code(500).send(err)
    col.find().sort({modified: 1}).limit(5, function (err, oldest) {
      if (err) return reply.code(500).send(err)
      const magic = computeMagic(newest, oldest)
      reply.send({
        magic,
        newest,
        oldest
      })
    })
  })
})

function computeMagic (a, b) {
  const hash = createHash('sha512')
  for (var i = 0; i < 100; i++) {
    hash.update(JSON.stringify(a))
    hash.update(JSON.stringify(b))
  }
  return hash.digest('hex')
}

app.listen(3000)
