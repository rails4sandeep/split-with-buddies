### Simple Nodejs Alternative to Splitwise

Use this for kitty split, trip split, sports teams split and other use cases where you need to split expenses among a group of people.

### How it works

### Add expenses as a new entry to `expenses.json` file

* The `id` is the next incremental number
* `applies` refers to the user id in the people.json file
```json
    {
  "id": 1,
  "expense": "Court Fee",
  "by": 1,
  "amount": 45,
  "date": "2020-01-01",
  "applies": [1,2,3]
},

```

### Add people to the `people.json` file

```json
{"id":"0","name":"Sandeep Kumar","fund":91.75}
```

* `id` is the next incremental number
* `fund` is the initial fund that the person has

### Usage

* Clone the repository
* `npm install`
* `node index.js`

* An updated version of people.json will be created with the updated fund for each person. 
* An updated version of current.json will be created with the last expense that was processed.
* Before the updated versions are generated, the previous versions are backed up to the archives directory

### Suggestions

Send all your bugs, suggestions and feedback to `Sandeep Kumar <rails4sandeep@gmail.com`

### Future Updates

* This becoming a backend for a vuejs or a RoR web app