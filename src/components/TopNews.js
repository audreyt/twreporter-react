import React, { Component, PropTypes } from 'react'
import Slider from 'react-slick'
if (process.env.BROWSER) {
    require("./TopNews.css");
}

export default class TopNews extends Component {
    constructor(props, context) {
        super(props, context)
    }
    handleResize() {
        var currentHeight = window.innerHeight;
        var currentWidth = window.innerWidth;
        var fixedHeight = currentWidth * 0.75;
        if (fixedHeight > currentHeight) {  // Make sure the users are able to get the title of the stories
            fixedHeight = currentHeight - 100;
        }
        var wrapper = document.getElementsByClassName('topnewsimage-wrap')
        for (var i = 0; i < wrapper.length; i++) {
            wrapper[i].style.height = fixedHeight + 'px'
        }
        var dots = document.getElementsByClassName('ul#slick-dots')
        for (var i = 0; i < dots.length; i++) {
            dots[i].style.top = fixedHeight + 'px'
        }
        var slider = document.getElementsByClassName('slick-slider')
        var sliderHeight = fixedHeight + 100
        for (var i = 0; i < slider.length; i++) {
            slider[i].style.height = sliderHeight + 'px'
        }
        var carouselItem = document.getElementsByClassName('carousel-item')
        for (var i = 0; i < carouselItem.length; i++) {
            carouselItem[i].style.top = '-' + carouselItem[i].style.height+ 'px'
        }
        var categoryContainer = document.getElementsByClassName('topnews_categorycontainer')
        for (var i = 0; i < categoryContainer.length; i++) {
            categoryContainer[i].style.top = '-' + fixedHeight + 'px'
        }
    }
    componentDidMount() {
        // this.handleResize()
        // window.addEventListener('resize', this.handleResize);
    }
    render() {
        const { topnews } = this.props
        let cat_display = "台灣"
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            autoplay: false,
            autoplaySpeed: 3500,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            lazyLoad: false
        };
	return topnews && topnews.length ? (
	    <Slider {...settings}>
		{topnews.map((a) => {
		    return (
			<a
			    key={a.id}
			    href={a.story_link || "https://www.twreporter.org/a/" + a.slug}
			    className="topnewsimage-wrap"
			    style={{
				backgroundImage: 'url(' + a.preview_image + ')',
			    }}
			>
			    <div className="topnews_categorycontainer">
				<div className="topnews_category">{cat_display.substring(0,1)}</div>
				<div className="topnews_category">{cat_display.substring(2,1)}</div>
			    </div>
			    <div className="carousel-item">
				<div className="carousel-published">
				    {(new Date(a.lastPublish * 1000)).toISOString().substring(0,10)}
				</div>
				<div className="carousel-itemtitle">{a.title}</div>
				<div className="carousel-excerpt">{a.excerpt}</div>
			    </div>
			</a>
		    );
		})}
	    </Slider>
	) : null;
    }
}

export { TopNews };

