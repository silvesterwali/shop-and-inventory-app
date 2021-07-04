/**
 * @copyright 2021
 *
 * - controller for dashboard item utilities purpose
 **/

const BranchUtils = require('../utilities/BranchUtils')
const ProductUtils = require('../utilities/productUtils')
const customersUtils = require('../utilities/customerUtils')
const userUtils = require('../utilities/userUtils')
/**
 *=====================================
 * index
 *
 * - get listing of resources
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @async
 **/
exports.index = async (req, res) => {
  try {
    const result = []
    // product items
    result[0] = {
      url: '/inventory/product',
      btnText: 'Go To Product',
      cardTitle: await ProductUtils.productCount(),
      cardSubTitle: 'Product',
      icon: 'mdi-cube-outline',
    }
    // brand items
    result[1] = {
      url: '/inventory/brand',
      btnText: 'Go To Branch',
      cardTitle: await BranchUtils.countBranches(),
      cardSubTitle: 'Brand',
      icon: 'mdi-apps',
    }
    // customer items
    result[2] = {
      url: '/inventory/customer',
      btnText: 'Go To Customer',
      cardTitle: await customersUtils.countCustomer(),
      cardSubTitle: 'Customer',
      icon: 'mdi-account-group',
    }
    // user utils
    result[3] = {
      url: '/admin/users',
      btnText: 'Go To Users',
      cardTitle: await userUtils.countUser(),
      cardSubTitle: 'Users',
      icon: 'mdi-account-group',
    }

    return res.json(result)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
