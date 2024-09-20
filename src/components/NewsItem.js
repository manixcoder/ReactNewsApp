import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, auther, publishedAt ,source} = this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                <span className="position-absolute top-0 start-100 translate-middle badge round-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
                                {source}
                                
                            </span>
                    <img src={!imageUrl ? "https://techcrunch.com/wp-content/uploads/2024/05/Minecraft-keyart.jpg?resize=1200,720" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}
                            
                        </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">by {auther ? auther : "Unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
