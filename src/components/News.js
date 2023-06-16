import React, { useEffect ,useState,} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

 const News=(props)=> {
    const[articles,setArticles]=useState([])        
    const[loading,setLoading]=useState(true)
    const[page,setPage]=useState(1)
    const[totalResults,setTotalResults]=useState(0)
    //document.title=`${(capitalizeFirstLetter(props.category)}-NewsMonkey`;


   // {/*static defaultProps = {
    //    country: 'in',
    //    pageSize:'8',
   //     category:'general',}
     // static propTypes = {
        //country: PropTypes.string,
       // pageSize:PropTypes.number,
        //category:PropTypes.string,
      //} */}
    
      const capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
   //{/* constructor(props){
       // super(props);
       // this.state={
        //    articles:[],
         //   loading:true,
          //  page:1,
           // totalResults:0 }}

    const updateNews =async()=>{
        props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e66eec49a90547f89a26ab39a713a4ab&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data =await fetch(url);
        let parsedData= await data.json();
        setArticles (parsedData.articles);
        setTotalResults(parsedData.totalResult);
        setLoading(false)
        //{/*this.setState({articles:parsedData.articles, 
         //totalResult:parsedData.totalResult,
          //     loading:false,})
         props.setProgress(0);  
  }
  useEffect (()=>{
        document.title=`${capitalizeFirstLetter(props.category)}-NewsMonkey`;
  updateNews()
    //eslint-disable-next-line
    },[])
   //const componentDidMount=async()=>{
        //let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e66eec49a90547f89a26ab39a713a4ab&page=${this.state.page}&pageSize=${props.pageSize}`;
        //this.setState({loading:true});
        //let data =await fetch(url);
        //let parsedData= await data.json();
        //console.log(parsedData);
        //this.setState({articles:parsedData.articles, 
       //  totalResult:parsedData.totalResult,
        //loading:false})

    

    //eslint-disable-next-line
    const handlePrevClick=async()=>{

      //console.log("Previous");
      //let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e66eec49a90547f89a26ab39a713a4ab&page=${this.state.page -1}&pageSize=${props.pageSize}`;
      //this.setState({loading:true});
      //let data =await fetch(url);
      //let parsedData= await data.json();
      //console.log(parsedData);
      //this.setState ({
       //   page: this.state.page-1,
        //  articles:parsedData.articles,
         // loading:false

      //})  
      setPage(page-1);
      updateNews()
    }
      //eslint-disable-next-line
    const handleNextClick=async()=>{
        //console.log("Next");
        //if (!(this.state.page +1 > Math.ceil(this.state.totalResult/props.pageSize))){
        //    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e66eec49a90547f89a26ab39a713a4ab&page=${this.state.page +1}&pageSize=${props.pageSize}`;
          //  this.setState({loading:true});
            //let data =await fetch(url);
            //let parsedData= await data.json();
            //console.log(parsedData);
            //this.setState ({
              //  page: this.state.page +  1,
                //articles:parsedData.articles,
                //loading:false
            //})      
        //}
        setPage(page+1); 
        updateNews();
}

const fetchMoreData = async() => {
      setPage(page+1);
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e66eec49a90547f89a26ab39a713a4ab&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1)
      let data = await fetch(url);
      let parsedData= await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
     // this.setState({
      //articles:articles.concat(parsedData.articles), 
      // totalResult:parsedData.totalResults, })
       
  }

  
return(
       <>
           <h2 className="text-center" style={{margin:'35px,0px', marginTop:'90px'}}> News Monkey-Top  {capitalizeFirstLetter(props.category)} Headlines</h2>
           {loading && <Spinner/>}
           <InfiniteScroll
            dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !==totalResults}
                loader={<Spinner/>}>
                <div className="container">
                    <div className="row">
                    {articles.map((element)=>{
                        return<div className="col-md-4" key={element.url}>
                        <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage}
                        newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                    })}
                    </div>
                </div>
            </InfiniteScroll>
            
           {/* <div className="container  d-flex justify-content-between" >
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button  disabled={this.state.page +1 > Math.ceil(this.state.totalResult/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

            </div>*/}
       </>
    )
  }

News.defaultProps = {
    country: 'in',
    pageSize:'8',
    category:'general',
  }
  News.propTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  } 

export default News;
