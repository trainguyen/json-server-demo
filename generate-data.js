const { random, fake } = require('faker');
const faker=require('faker');
const fs=require('fs');

console.log(faker.datatype.number());

const randomCategoryList = (n) =>{
    if(n<=0) return [];

    const categoryList=[];

    Array.from(new Array(n)).forEach(()=>{
        const category={
            id:faker.datatype.uuid(),
            name:faker.commerce.department(),
            createdAt:Date.now(),
            updatedAt:Date.now(),
        };

        categoryList.push(category);
    });
    return categoryList;
};

const randomProductList=(categoryList,memberOfProducts)=>{
    if(memberOfProducts<=0) return[];

    const productList=[];

    for(const category of categoryList){
        Array.from(new Array(memberOfProducts)).forEach(()=>{
            const product={
                categoryId:category.id,
                id:faker.datatype.number(),
                name:faker.commerce.productName(),
                color:faker.commerce.color(),
                price:Number.parseFloat(faker.commerce.price()),
                description:faker.commerce.productDescription,
                createdAt:Date.now(),
                updatedAt:Date.now(),
                thumbnailUrl:faker.image.imageUrl(400,400),
            };

            productList.push(product);
        });
    }
    return productList;
};
 
(()=>{
    const categoryList=randomCategoryList(5);
    const productList=randomProductList(categoryList,5);

    const db={
        categories: categoryList,
        products:productList,
        profile:{
            name:"Trai",
        },
    };

    fs.writeFile('db.json',JSON.stringify(db),()=>{
        console.log("Generage data succesfully !");
    })
})();