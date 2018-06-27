const mongojs = require('mongojs')
const get = require('simple-get')
const pump = require('pump')
const each = require('stream-each')
const ndjson = require('ndjson')

// make sure to have mongodb running
const db = mongojs('localhost:27017/npm', ['modulesIndexed', 'modules'])

db.modulesIndexed.ensureIndex({modified: 1})

db.modulesIndexed.find({}).sort({seq: -1}).limit(1, function (err, docs) {
  if (err) throw err
  sync(docs.length ? docs[0].seq + 1 : 0, function (err) {
    if (err) throw err
    console.log('done!')
  })
})

function sync (since, cb) {
  console.log('syncing since', since)
  const npm = `https://skimdb.npmjs.com/registry/_changes?feed=continuous&include_docs=true&since=${since}`
  get(npm, function (err, res) {
    if (err) return cb(err)
    each(pump(res, ndjson.parse()), ondata, cb)

    function ondata (data, cb) {
      if (!data.doc.time) return cb()

      const doc = {
        _id: data.id,
        seq: data.seq,
        version: data.doc['dist-tags'].latest ,
        modified: data.doc.time.modified
      }

      db.modulesIndexed.save(doc, function (err) {
        db.modules.save(doc, cb)
      })
    }
  })
}
