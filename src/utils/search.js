import Fuse from 'fuse.js'

// Mock documentation data - In a real application, this would be fetched from the documentation sources
const documentationData = {
  segment: {
    sources: "To set up a new source in Segment:\n1. Go to Connections > Sources\n2. Click 'Add Source'\n3. Select your source type\n4. Configure the source settings\n5. Save and verify the connection",
    profiles: "User profiles in Segment are automatically created when you send identify calls with user traits.",
  },
  mparticle: {
    profiles: "To create a user profile in mParticle:\n1. Use the identify API call\n2. Include user identifiers\n3. Add user attributes\n4. Submit the profile data",
  },
  lytics: {
    audiences: "To build an audience segment in Lytics:\n1. Navigate to Audiences\n2. Click 'Create New Audience'\n3. Define segment criteria\n4. Test your segment\n5. Activate the audience",
  },
  zeotap: {
    integration: "To integrate data with Zeotap:\n1. Access the Integration Hub\n2. Select data source type\n3. Configure connection settings\n4. Map data fields\n5. Test the integration",
  },
}

const fuseOptions = {
  includeScore: true,
  threshold: 0.6,
  keys: ['content', 'tags'],
}

// Prepare the search index
const searchData = []
Object.entries(documentationData).forEach(([platform, sections]) => {
  Object.entries(sections).forEach(([topic, content]) => {
    searchData.push({
      content,
      tags: [platform, topic],
    })
  })
})

const fuse = new Fuse(searchData, fuseOptions)

export async function searchDocumentation(query) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Check if the question is CDP-related
  const cdpKeywords = ['segment', 'mparticle', 'lytics', 'zeotap', 'cdp', 'customer data platform']
  const hasRelevantKeywords = cdpKeywords.some(keyword => 
    query.toLowerCase().includes(keyword.toLowerCase())
  )

  if (!hasRelevantKeywords) {
    return "I can only answer questions related to CDPs (Segment, mParticle, Lytics, and Zeotap). Please ask a CDP-related question."
  }

  const results = fuse.search(query)

  if (results.length === 0) {
    return "I couldn't find specific information about that. Please try rephrasing your question or ask about a different topic."
  }

  return results[0].item.content
}