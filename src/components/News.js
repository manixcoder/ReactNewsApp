import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner'


export class News extends Component {

  constructor() {
    super()
    console.log('Hello I am a constructor form News')
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {

    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=648b4ec1cd3f4da7b46554e0f9259a6c&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading:false 
    });
  }
  handlePrevClick = async () => {
    console.log("Prev");

    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=648b4ec1cd3f4da7b46554e0f9259a6c&page=${this.state.page - 1} &pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
     // totalResults: parsedData.totalResults
     loading:false
    })

  }
  handleNextClick = async () => {
    console.log("Next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) ){
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=648b4ec1cd3f4da7b46554e0f9259a6c&page=${this.state.page + 1} &pageSize=${this.props.pageSize}`;
     
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading:false
      })
    }
  }
  render() {
    console.log("Render 2")
    return (
      <div className='container my-3'>
        <h1 className="text-center">News Monkey - top headline</h1>
      {this.state.loading && <Spiner/>}

        <div className='row'>
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />

            </div>
          })}
        </div>
        <div className="conatainer d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr; </button>
        </div>
      </div>
    )
  }
}

export default News
