/**
 * for handled useragent and take control the client activity on app
 *
 *
 */

const ObjectId = require('mongodb').ObjectID
const db = require('../db').db
const { currentDateFormat } = require('./timeFormatUtils')

/**
 * save last login user
 *
 * @param {Object} user
 * @param {Object} useragent
 * @return boolean
 */
const saveUseragent = async (user, useragent, isActive) => {
  try {
    const userId = new ObjectId(user._id)
    const { browser, version, isMobile, isDesktop, os, platform, source } =
      useragent

    const activities = {
      _id: new ObjectId(),
      isActive,
      browser,
      version,
      isMobile,
      isDesktop,
      os,
      platform,
      source,
      date: await currentDateFormat(),
    }

    // TODO : how to update the sub document if property already exists
    await db.collection('usersLoginTracking').updateOne(
      { userId },
      {
        $push: {
          activities,
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
