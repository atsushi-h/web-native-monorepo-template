import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateSpecs } from 'hono-openapi'
import yaml from 'js-yaml'
import { createApp } from '../src/app'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function generateOpenAPISpec() {
  try {
    console.log('Generating OpenAPI specification...')

    // Read package.json to get version
    const packageJsonPath = path.join(__dirname, '..', 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    const apiVersion = packageJson.version || '1.0.0'

    // Create app instance
    const app = createApp()

    // OpenAPI configuration
    const openAPIConfig = {
      documentation: {
        openapi: '3.1.0',
        info: {
          title: 'Todo API',
          version: apiVersion,
          description: 'A simple Todo API built with Hono and Cloudflare Workers',
        },
        tags: [
          {
            name: 'todos',
            description: 'Todo operations',
          },
          {
            name: 'health',
            description: 'Health check operations',
          },
          {
            name: 'env',
            description: 'Environment operations',
          },
        ],
      },
    }

    // Generate OpenAPI JSON specification
    const spec = await generateSpecs(app, openAPIConfig)

    // Convert to YAML
    const yamlSpec = yaml.dump(spec, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
      sortKeys: false,
    })

    // Write to file
    const outputPath = path.join(__dirname, 'generated', 'openapi.yaml')
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, yamlSpec, 'utf-8')

    console.log(`✅ OpenAPI specification generated successfully!`)
    console.log(`📄 Output: ${outputPath}`)

    // Also write JSON version
    const jsonOutputPath = path.join(__dirname, 'generated', 'openapi.json')
    fs.writeFileSync(jsonOutputPath, JSON.stringify(spec, null, 2), 'utf-8')
    console.log(`📄 JSON Output: ${jsonOutputPath}`)
  } catch (error) {
    console.error('❌ Error generating OpenAPI specification:', error)
    process.exit(1)
  }
}

// Run the generator
generateOpenAPISpec()
