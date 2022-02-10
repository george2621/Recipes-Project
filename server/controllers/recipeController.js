require('../models/database');
const category = require('../models/category.js')
const recipe = require('../models/recipe.js')

exports.homepage = async (req, res) => {
    try {
        const limitedNumber = 5;
        const categories = await category.find({}).limit(limitedNumber);
        const latestRecipe = await recipe.find({}).sort({ _id: -1 }).limit(limitedNumber);
        const thai = await recipe.find({ category: 'Thai' }).limit(limitedNumber);
        const american = await recipe.find({ category: 'American' }).limit(limitedNumber);
        const chinese = await recipe.find({ category: 'Chinese' }).limit(limitedNumber);
        const food = { latestRecipe, thai, american, chinese }
        // await recipe.updateOne({ _id: '61f97b417f7ceae68edf32d6' }, { $set: { image: "Tom Daley's sweet & sour chicken.jpg" } });
        res.render('index', { title: 'Cooking Blog - Home', categories, food })
    } catch (error) {
        res.send({ message: error.message || 'error occur' })
    }
}



exports.exploreRecipe = async (req, res) => {
    try {
        let recipeId = req.params.id;
        const requiredRecipe = await recipe.findById(recipeId);
        res.render('recipe', { title: 'Cooking Blog - Recipe', requiredRecipe })
    } catch (error) {
        res.send({ message: error.message || 'error occur' })
    }
}

exports.exploreCategories = async (req, res) => {
    try {
        const categories = await category.find({});
        res.render('categories', { title: 'Cooking Blog - Categories', categories })
    } catch (error) {
        res.send({ message: error.message || 'error occur' })
    }
}


exports.exploreCategoriesById = async (req, res) => {
    try {
        let categoryId = req.params.id;
        const categoryById = await recipe.find({ category: categoryId });
        console.log(categoryById);
        res.render('categories', { title: 'Cooking Blog - category', categoryById })
    } catch (error) {
        res.send({ message: error.message || 'error occur' })
    }
}


exports.searchRecipe = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        const searchedRecipe = await recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } })
        console.log(searchedRecipe)
        res.render('search', { title: 'Cooking Blog - Search ', searchedRecipe })
    } catch (error) {
        res.status(500).send({ message: error.message || 'error occur' })
    }
}


exports.exploreLatestRecipes = async (req, res) => {
    const limited = 20;
    try {
        const exploreLatest = await recipe.find({}).sort({ _id: -1 }).limit(limited);
        res.render('explore-latest', { title: 'Cooking Blog - Explore Recipes ', exploreLatest })
    } catch (error) {
        res.status(500).send({ message: error.message || 'error occur' })
    }
}




// async function insertCategoryData() {

//     try {
//         await category.insertMany(
//             [
//                 {
//                     "name": "Thai",
//                     "image": "thai-food.jpg"
//                 },
//                 {
//                     "name": "American",
//                     "image": "american-food.jpg"
//                 },
//                 {
//                     "name": "Chinese",
//                     "image": "chinese-food.jpg"
//                 },
//                 {
//                     "name": "Mexican",
//                     "image": "mexican-food.jpg"
//                 },
//                 {
//                     "name": "Indian",
//                     "image": "indian-food.jpg"
//                 },
//                 {
//                     "name": "Spanish",
//                     "image": "spanish-food.jpg"
//                 }
//             ]
//         )

//     } catch (error) {
//         console.log("error", +error);
//     }
// }

// async function insertRecipeData() {

//     try {
//         await recipe.insertMany(
//             [
//                 {
//                     "name": "Easy veggie stir-fry",
//                     "description": `Recipe Description Goes Here`,
//                     "email": "recipeemail@raddy.co.uk",
//                     "ingredients": [
//                         "1 level teaspoon baking powder",
//                         "1 level teaspoon cayenne pepper",
//                         "1 level teaspoon hot smoked paprika",
//                     ],
//                     "category": "American",
//                     "image": "46425340.jpg"
//                 },
//                 {
//                     "name": "Stir-fried vegetables",
//                     "description": "Crush the garlic and finely slice the chilli and spring onion. Peel and finely slice the red onion Shred the mangetout, slice the mushrooms and water chestnuts, and mix with the shredded cabbage in a separate bowl Heat your wok until its really hot. Add a splash of oil - it should start to smoke - then the chilli and onion mix",
//                     "email": "hello@raddy.co.uk",
//                     "ingredients": [
//                         "1 clove of garlic",
//                         "1 fresh red chilli",
//                         "3 spring onions",
//                         "1 small red onion",
//                         "1 handful of mangetout",
//                         "a few shiitake mushrooms"
//                     ],

//                     "category": "Chinese",
//                     "image": "stir-fried-vegetables.jpg"
//                 },
//                 {
//                     "name": "Tom Daley's sweet & sour chicken",
//                     "description": "Drain the juices from the tinned fruit into a bowl, add the soy and fish sauces, then whisk in 1 Pull off the chicken skin, lay it flat in a large, cold frying pan, place on a low heat and leave for a few minute Meanwhile, slice the chicken into 3cm chunks and place in a bowl with 1 heaped teaspoon of five- spice, a pinch of",
//                     "email": "hellograddy.co.uk",
//                     "ingredients": [
//                         "1 x 227 g tin of pineapple in natural juice",
//                         "1 x 213 g tin of peaches in natural juice",
//                         "1 tablespoon low-salt soy sauce",
//                         "1 tablespoon fish sauce",
//                         "2 teaspoons cornflour",
//                         "2 x 120 g free-range chicken breasts, skin on"
//                     ],

//                     "category": "American",
//                     "image": "Amazing_Dressed_Beets_310-1024x683.jpg"

//                 }
//             ]
//         )

//     } catch (error) {
//         console.log("error", +error);
//     }
// }
// insertRecipeData();
// insertCategoryData();