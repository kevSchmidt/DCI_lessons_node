## How to deploy Node.js app on to server

#### Install

We need to install "now" globally:
`npm install -g now`
We install "vercel" globally:
`npm install -g vercel`

#### Adding vercel.json

````{
    "version": 2,
    "builds": [{ "src": "index.js", "use": "@now/node-server" }],
}```
````

#### In package.json

"script": "start": "node index.js"
