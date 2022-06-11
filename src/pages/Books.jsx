
import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios"
import "../styles/books.css"
function Books() {

  const [filter, setFilter ]= useState("");
  const [result, setResult] = useState([]);
  const [selectedCategory, setselectedCategory] = useState("")
  const [apiKey, setApiKey] = useState("AIzaSyBcd2dek9-5LPhIii3Y1mjr867aFfz2-gI");

  function handleChange(event){
    const book = event.target.value
    setFilter(book);

  }

  

  useEffect(()=>{
    const f = filter || "books";
    console.log(f)
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+f+"&key="+apiKey+"&maxResults=20")
    .then(data => {
      setResult(data?.data?.items)
    }) 
  },[filter])
  // console.log("hey im result" )
  // console.log(result)


  const filterByCategory = (result) => {
    // Avoid filter for empty string
    if (!selectedCategory) {
      return result;
    }

    const filteredBooks = result?.filter(
      (book) => book?.book?.volumeInfo?.categories.indexOf(selectedCategory) !== -1 
    ) 
    // console.log(filteredBooks+ "Xckfdlllllllllllllllllllllshaouxfhq43ui fqq4h")
    // console.log("hey im result after filtering" )
    // console.log(filteredBooks)
    
    return filteredBooks;
   
  };
 
  const handleCategoryChange = (event) => {
    console.log(event.target.value+ "from handle");
    setselectedCategory(event.target.value);
  };
console.log(result+ "ressssssssssssssssssssssssssssssssssssss")
  useEffect(() => {
    var results = filterByCategory(result);
    console.log(result+"filtered**********************************")
    setFilter(results);
  }, [selectedCategory]);


  return (
    <div>
      <form >
         <div >
          <input 
            type="text" onChange={handleChange}
            className="input-control"
            placeholder=" ابحث عن كتابك من خلال اسمه او  ISBN"
            autoComplete="off" >
          </input>
          <select className="filter1" value="اللغة">
            <option value="volvo">en</option>
            <option value="saab">ar</option>
          </select >
          <select className="filter2" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="Young Adult Fiction">Young Adult Fiction</option>
            <option value="Juvenile Fiction">Juvenile Fiction</option>
            <option value="Fiction">Fiction</option>
            <option value="Computers">Computers</option>
          </select>
        </div>
      </form>
      { result?.map(book =>(  
        <div className="searched-img" key={book.id}>
          {/* <h1>{book?.volumeInfo?.language == }</h1> */}
            <img  src= {book?.volumeInfo?.imageLinks?.thumbnail}  alt={book?.title}/> 
        </div>
       ))
      };
    </div> 
  ); 
}
export default Books;
