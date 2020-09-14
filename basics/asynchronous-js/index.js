console.log(
  "------------------------------------ NEW TERMINAL ------------------------------"
);

const fs = require("fs");
const superagent = require("superagent");

// ===== Read file with Promise ===

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Error 😒");
      resolve(data);
    });
  });
};

// ===== Write file Promise ===

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Error 😒");
      resolve("success");
    });
  });
};

// ===== Async function ===

const getDogPic = async () => {
  try {
    // store our breed-data from dog.txt
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // get url with our breed-data
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    // store our link into an array
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    // write our link into dog-img.txt
    await writeFilePro("dog-img.txt", imgs.join("\n"));
    console.log("Random dog image saved to file!");

    // error handler
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  return "2: Found 3 dogs 🐕 😘";
};

// ===== Async function call ===

(async () => {
  try {
    console.log("1: Start to look for dogs!");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Dog pics are ready!");

    // error handler
  } catch (err) {
    console.log("Error 💥");
  }
})();
