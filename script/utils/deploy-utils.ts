import { exec as execCallback } from 'child_process'
import * as util from 'util'

import { getSubgraphName, prepare } from './prepareNetwork'

const exec = util.promisify(execCallback)

// Creating subgraphs is only available from hosted-service dashboard
// yarn graph create $network_name-v2 --node https://api.thegraph.com/deploy/ --access-token $SUBGRAPH_DEPLOY_KEY"
export const build = async (network, subgraphType) => {
  console.log(`Building subgraph for ${network}`)
  console.log(`\n Copying constants & templates for ${network} \n`)
  await prepare(network, subgraphType)
  console.log(`\n Generating manifest for ${network} ${subgraphType} subgraph \n`)
  await exec(
    `cross-env mustache config/${network}/config.json ${subgraphType}-subgraph.template.yaml > ${subgraphType}-subgraph.yaml`
  )
  await exec(`graph codegen ${subgraphType}-subgraph.yaml`)
}

export function getLocalDeploymentParams(): {
  node: string
  ipfs: string
  deployKey: string
} {
  return {
    node: 'http://localhost:8020',
    ipfs: 'http://localhost:5001',
    deployKey: '',
  }
}

export const deploy = async (subgraphType) => {
  /*
  try {
    await exec('git diff-index --quiet HEAD -- && git diff --quiet || (exit 1)')
  } catch (e) {
    console.log('Error: You have uncommitted changes. Please commit your changes and try again.')
    process.exit(1)
  }
  */

  try {
    await exec('git diff-index --quiet HEAD -- && git diff --quiet || (exit 1)')
  } catch (e) {
    console.log('Warning: You have uncommitted changes. Continuing with deployment...')
  }

  const { stdout: gitHash } = await exec('git rev-parse --short HEAD')
  const gitHashString = gitHash.toString().trim()
  const subgraphName = getSubgraphName(subgraphType)
  const { node, ipfs } = getLocalDeploymentParams()

  try {
    const createCmd = `graph create --node ${node} ${subgraphName}`
    console.log(`Creating subgraph: ${createCmd}`)
    
    try {
      await exec(createCmd)
      console.log('Subgraph created successfully.')
    } catch (createError) {
      console.log('Subgraph might already exist, continuing with deployment...')
    }

    const deployCmd = `graph deploy --node ${node} --ipfs ${ipfs} --version-label ${gitHashString} ${subgraphName} ${subgraphType}-subgraph.yaml`
    console.log(`Deploying subgraph: ${deployCmd}`)
    
    const { stdout, stderr } = await exec(deployCmd)
    
    console.log(stdout)
    console.log('Subgraph deployed successfully.')
    console.log(`GraphQL endpoint: http://localhost:8000/subgraphs/name/${subgraphName}`)
    console.log(`GraphiQL interface: http://localhost:8000/subgraphs/name/${subgraphName}/graphql`)
    
  } catch (e) {
    console.log(e.stdout)
    console.log('Error: Failed to deploy subgraph. Please try again.')
    process.exit(1)
  }
}
