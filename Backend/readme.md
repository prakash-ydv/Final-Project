# Readme for Backend

### Test Route 

To check is server running or not
```
http://localhost:3000/
----------------------------

{
    status : running
}
```

### Create User

```
POST
http://localhost:3000/user/create
----------------------------------

body
{
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required : true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },

  ```

### Login Route

```
GET

http://localhost:3000/user/login
---------------------------------
body
{
  phone : Number,
  password : String
}
```
### Report Poroblem
make sure add encrypt="multipart/form-data" in form

```

<form method="POST" action="/report" enctype="multipart/form-data">

POST
http://loaclhost:3000/report

body
{
  issueTitle : String,
  issueDepartment : String,
  issueDesc : String,
  issueCoordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    },
  image : file
}

```