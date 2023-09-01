#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')
const { fileURLToPath } = require('node:url')
const prompts = require('prompts')
const { red, reset } = require('kolorist')

async function init() {
  let response
  try {
    response = await prompts(
      {
        type: 'text',
        name: 'projectName',
        message: reset('Project name:'),
        initial: 'vue-app'
      },
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      }
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    return
  }

  const targetDir = response.projectName.trim().replace(/\/+$/g, '')
  const rootDir = path.join(process.cwd(), targetDir)

  const templateDir = path.resolve(__dirname, 'vue-app')

  copyDir(templateDir, rootDir)

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8')
  )
  pkg.name = targetDir
  fs.writeFileSync(
    path.join(rootDir, 'package.json'),
    JSON.stringify(pkg, null, 2) + '\n'
  )
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)

    if (fs.statSync(srcFile).isDirectory()) {
      copyDir(srcFile, destFile)
    } else {
      fs.copyFileSync(srcFile, destFile)
    }
  }
}

init()
