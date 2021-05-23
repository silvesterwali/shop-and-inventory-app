/**
 * for handled useragent and take control the client activity on app
 *
 *
 */
const ObjectId = require('mongodb').ObjectID
const db = require('../db').db

/**
 * save last login user
 *
 * @param {Object} user
 * @param {Object} useragent
 * @return boolean
 */
const saveUseragent = async (user, useragent) => {
  try {
    const userId = new ObjectId(user._id)
    const { browser, version, os, platform, geoIp, source } = useragent

    // TODO : how to update the sub document if property already exists
    await db.collection('usersLoginTracking').update(
      { userId },
      {
        $push: {
          activities: {
            browser,
            version,
            os,
            platform,
            geoIp,
            source,
            date: new Date(),
          },
        },
      },
      { upsert: true }
    )
    return true
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  saveUseragent,
}
