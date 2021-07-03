# models

this directory is contain all model for database

## User Schema Design

basic design of user schema

```js
  {
    _id:ObjectId
    email:String,
    password:String,
    rules:Array // user will apply the role ,
    password:String,
    verifiedEmail:Boolean,
    created_at:String
  }

```


### Rules property

Rules is define for authorization purpose. every user will have Rules and permission when they access the every endpoint

- _Super Admin_ the user with all ability access the main system
- _Admin_ with access the system with have limit from _Super Admin_

- _Sales Outlet_ sales role
- _costumer_ - level of user who will get access as costumer only


## Personal Structure

below is the personal structure of document

```js
{
  userId:ObjectID, // foreign key of user document
  fullName:String,  
  phone:String,  
  alternatePhone:String, 
  address:String, 
  alternateAddress:String,
  // define families refer to user
  families:[
      {
        _id:ObjectID,
        fullName:String,
        phoneNumber:String,
        statusFamily:String
    }
  ],
  // bank account of user 
  bankAtmCards:[
    {
      _id:ObjectID,
      provider:String,
      cardNumber:String
    }
  ]
}
```
## inventory schema design

below are the basic pre design of inventory system

### product schema

```js
  {
    _id:ObjectID,
    name:String,
    serial:String,
    wholeSale:Number,
    category:Array // apply product category
    retailPrice:Number,
    description:String, // product description
    stockQty:Number // define stock of product
    createdAt:Date 
    updatedAt:Date
  }

```

### product category

this optional for product schema

```js
{
  _id:ObjectID,
  name:String,
  createdAt:Date,
  updateAt:Date
}

```
### ref payment method

```js
  {
    _id:ObjectId,
    method_name:String,
    description:String
  }

```

### customer

```js
  {
    _id:ObjectId,
    serialNumber:String,
    isActive:false,
    fullName:String,
    email:String,
    phone:String,
    phoneAlternate:String,
    address:String,
    addressAlternate:String,
    createdBy:ObjectId
    createdAt:Date,
    updatedBy:ObjectId,
    updatedAt:Date
  }

```

### Brand

```js

  {
    title:String,
    summary:String,
    content:String
  }

```


### Sales Transaction

document to store sales transaction ***(SELLING)***

```js
  {
    _id:ObjectId,
    serialNumber:String, // apply serial for every transaction
    customerId:ObjectId, // user with role as costumer maybe not
    salesOutletId:ObjectId, // user with role sales
    transactionDateTime:Date,
    status:Number,
    productsInTransaction:[
      {
        _id:ObjectID,
        productId:ObjectId, // product document
        Qty:Number, 
        isCancel:Boolean
        description:String,
      }
    ],
    payments:[
      {
        _id:ObjectId,
        paymentMethodId:ObjectId,
        paymentAmount:Number,
        createdAt:Date
      }
    ],
    isValidTransaction:Boolean // if true that's mean product stock will be reduce
  }

```


### transaction in stock in product

```js
  {
    _id:ObjectId,
    serialNumber:String, // apply serial for every transaction
    customerId:ObjectId, // user with role as costumer maybe not
    :ObjectId, // user with role sales
    transactionDateTime:Date,
    productsInTransaction:[
      {
        _id:ObjectID,
        productId:ObjectId, // product document
        Qty:Number, 
        isCancel:Boolean
        description:String,
      }
    ],
    payments:[
      {
        _id:ObjectId,
        paymentMethodId:ObjectId,
        paymentAmount:Number,
        createdAt:Date
      }
    ],
    isValidTransaction:Boolean // if true that's mean product stock will be reduce
  }

```


### supplier

```js
  {
    name:String,
    address:String,
    phone:string,
    email:string,
    isActive:Boolean
  }
```


### Brach

```js
    {
      name:String,
      code:String,
      phone:String,
      address:String,
      isActive:Boolean
    }
```

### Feedback

```js
  {
    _id,
    title:String,
    url:String,
    content:String,
    status:String
  }

``