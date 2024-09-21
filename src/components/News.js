import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
    apiKey:process.env.REACT_APP_NEWSAPI
  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    apiKey:PropTypes.string,
  }
  capitalizeFirstLater = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props)
    //console.log('Hello I am a constructor form News')
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      state: 0,
      apiKey:process.env.REACT_APP_NEWSAPI
    }
    document.title = `News Manish -${this.capitalizeFirstLater(this.props.category)}`;
   // console.log(this.props.apiKey);
  }

  async updateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    //console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }
  handlePrevClick = async () => {
    //console.log("Prev");
    this.setState({
      page: this.state.page - 1
    });
    this.updateNews();

  }
  handleNextClick = async () => {
    //console.log("Next");
    this.setState({
      page: this.state.page + 1
    });
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1} &pageSize=${this.props.pageSize}`;
    //this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };

  render() {
   // console.log("Render 2")
    return (
      <>
        <h1 className="text-center" style={{ margin: '40px 0px' }}>News Monkey - Top {this.capitalizeFirstLater(this.props.category)} headline </h1>
        {this.state.loading && <Spiner />}

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
