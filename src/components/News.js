import React, { Component } from 'react'
import NewsItem from './NewsItem.js'
import Spinner from './Spinner.js'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  static defaultPros = {
    country: 'us',
    pageSize: 8,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  constructor(props) {
    super(props)
    // console.log('Hello i am a constructor from news component')
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    }
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`
  }

  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    this.props.setProgress(30)
    let parsedData = await data.json()
    this.props.setProgress(70)
    // console.log(parsedData)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      page: this.state.page,
      loading: false,
    })
    this.props.setProgress(100)
  }
  async componentDidMount() {
    this.updateNews()
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2f5bf75ca97f4ab192a8bf247075328d&page=1&pageSize=${this.props.pageSize}`
    // this.setState({ loading: true })
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // console.log(parsedData)
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // })
  }

  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNews()

  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   this.props.country
  //   // }&category=${
  //   //   this.props.category
  //   // }&apiKey=2f5bf75ca97f4ab192a8bf247075328d&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${this.props.pageSize}`
  //   // this.setState({ loading: true })
  //   // let data = await fetch(url)
  //   // let parsedData = await data.json()
  //   // console.log(parsedData)
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false,
  //   // })
  // }
  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   console.log('Inside Next btn : ' + this.state.page)
  //   this.updateNews()
  //   // if (
  //   //   !(
  //   //     this.state.page + 1 >
  //   //     Math.ceil(this.state.totalResults / this.props.pageSize)
  //   //   )
  //   // ) {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //     this.props.country
  //   //   }&category=${
  //   //     this.props.category
  //   //   }&apiKey=2f5bf75ca97f4ab192a8bf247075328d&page=${
  //   //     this.state.page + 1
  //   //   }&pageSize=${this.props.pageSize}`
  //   //   this.setState({ loading: true })
  //   //   let data = await fetch(url)
  //   //   let parsedData = await data.json()
  //   //   console.log(parsedData)
  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parsedData.articles,
  //   //     loading: false,
  //   //   })
  //   // }
  // }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.props.apikey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    // console.log(parsedData)
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: this.state.page,
      loading: false,
    })
  }

  render() {
    return (
      <>
        <h1 style={{ margin: '35px 0px' }} className="text-center">
          DujanaNews - Top {this.capitalizeFirstLetter(this.props.category)}{' '}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ' '}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ' '
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      auther={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    )
  }
}

export default News
