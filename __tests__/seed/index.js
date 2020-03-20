import { populateUsers } from './users'

async function populateTestDatabase() {
 await populateUsers()
}

export default populateTestDatabase