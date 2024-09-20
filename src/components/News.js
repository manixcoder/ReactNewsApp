import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  }
  capitalizeFirstLater = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props)
    console.log('Hello I am a constructor form News')
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `News Manish -${this.capitalizeFirstLater(this.props.category)}`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=648b4ec1cd3f4da7b46554e0f9259a6c&page=${this.state.page - 1} &pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  async componentDidMount() {

    this.updateNews();
  }
  handlePrevClick = async () => {
    console.log("Prev");

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=648b4ec1cd3f4da7b46554e0f9259a6c&page=${this.state.page - 1} &pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //  // totalResults: parsedData.totalResults
    //  loading:false
    // })
    this.setState({
      page: this.state.page - 1
    });
    this.updateNews();

  }
  handleNextClick = async () => {
    console.log("Next");
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) ){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=648b4ec1cd3f4da7b46554e0f9259a6c&page=${this.state.page - 1} &pageSize=${this.props.pageSize}`;

    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading:false
    //   })
    // }
    this.setState({
      page: this.state.page + 1
    });
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=648b4ec1cd3f4da7b46554e0f9259a6c&page=${this.state.page - 1} &pageSize=${this.props.pageSize}`;
    //this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };

  render() {
    console.log("Render 2")
    return (
      <>
        <h1 className="text-center" style={{ margin: '40px 0px' }}>News Monkey - Top {this.capitalizeFirstLater(this.props.category)} headline </h1>
        {this.state.loading && <Spiner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spiner />}
        >

          <div className='container my-3'>
            <div className='row'>
              {this.state.articles.map((element) => {
                return <div className='col-md-4' key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} auther={element.auther} publishedAt={element.publishedAt} source={element.source.name} />

                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="conatainer d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr; </button>
        </div> */}
      </>
    )
  }
}

export default News
