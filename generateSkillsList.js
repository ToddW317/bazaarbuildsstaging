const fs = require('fs')
const path = require('path')

const itemsDir = path.join(__dirname, 'public', 'items')
const files = fs.readdirSync(itemsDir)
  .filter(file => /\.(jpeg|jpg|png)$/i.test(file))

files.forEach(file => {
  console.log(`  '${file}',`)
})
