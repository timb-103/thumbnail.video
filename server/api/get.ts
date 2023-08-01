import { getVideoThumbnail } from 'video-thumbnails'

export default defineEventHandler(async (event) => {
  const { url, seconds } = getQuery(event)

  // must have URL
  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Error getting thumbnail (no url provided).',
    })
  }

  try {
    // get the thumbnail using our video-thumbnails package
    const response = await getVideoThumbnail(String(url), Number(seconds) || 1)

    // return as an image buffer
    if (response.buffer) {
      setResponseHeader(event, 'content-type', 'image/png')
      setResponseHeader(event, 'content-length', response.buffer.length)
      return response.buffer
    }
  } catch (error) {
    console.log('Error getting thumbnail:', error)
  }

  // return an error
  throw createError({
    statusCode: 400,
    statusMessage: 'Error getting thumbnail.',
  })
})
