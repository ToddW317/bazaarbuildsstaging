const fs = require('fs')
const path = require('path')

const encountersDir = path.join(__dirname, 'public', 'encounters')
const files = fs.readdirSync(encountersDir)
  .filter(file => /\.(webp|jpeg|jpg|png)$/i.test(file))
  .map(file => {
    // Remove hyphens and convert to lowercase
    return file.toLowerCase()
      .replace(/-/g, '')
  })

files.forEach(file => {
  console.log(`  '${file}',`)
})
